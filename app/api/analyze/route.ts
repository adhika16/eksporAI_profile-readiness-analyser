import { NextRequest, NextResponse } from 'next/server';
import { extractPdfText, validatePdfFile } from '@/app/lib/pdfParser';
import { fetchGitHubData, validateGitHubUrl } from '@/app/lib/githubApi';
import { analyzeProfiles } from '@/app/lib/openai';
import { AnalysisResult, ApiError } from '@/app/types/analysis';

// Rate limiting map (simple in-memory store for hackathon)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // requests per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return ip;
}

function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return { allowed: true };
  }
  
  if (now > record.resetTime) {
    // Reset window
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return { allowed: true };
  }
  
  if (record.count >= RATE_LIMIT) {
    return { allowed: false, resetTime: record.resetTime };
  }
  
  record.count++;
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(clientIp);
    
    if (!rateCheck.allowed) {
      const resetDate = new Date(rateCheck.resetTime!);
      const errorResponse: ApiError = {
        error: 'Rate limit exceeded',
        code: 'RATE_LIMIT',
        details: `You have reached the analysis limit. Please try again after ${resetDate.toLocaleTimeString()}.`
      };
      return NextResponse.json(errorResponse, { status: 429 });
    }

    // Parse form data
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      const errorResponse: ApiError = {
        error: 'Invalid form data',
        code: 'INVALID_FORM'
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const pdfFile = formData.get('linkedinPdf') as File | null;
    const githubUrl = formData.get('githubUrl') as string | null;

    // Validation
    if (!pdfFile || !githubUrl) {
      const errorResponse: ApiError = {
        error: 'Missing required fields',
        code: 'MISSING_FIELDS',
        details: 'Please provide both a LinkedIn PDF and GitHub URL.'
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Validate PDF
    const pdfValidation = validatePdfFile(pdfFile);
    if (!pdfValidation.valid) {
      const errorResponse: ApiError = {
        error: pdfValidation.error!,
        code: 'INVALID_PDF'
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Validate GitHub URL
    if (!validateGitHubUrl(githubUrl)) {
      const errorResponse: ApiError = {
        error: 'Invalid GitHub URL format',
        code: 'INVALID_GITHUB_URL',
        details: 'Please provide a valid GitHub profile URL (e.g., https://github.com/username)'
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Step 1: Extract LinkedIn data from PDF
    let linkedinText: string;
    try {
      linkedinText = await extractPdfText(pdfFile);
    } catch (error) {
      console.error('PDF extraction error:', error);
      const errorResponse: ApiError = {
        error: 'Failed to read PDF file',
        code: 'PDF_READ_ERROR',
        details: 'Please ensure the file is a valid LinkedIn PDF export and try again.'
      };
      return NextResponse.json(errorResponse, { status: 422 });
    }

    // Basic validation that PDF contains LinkedIn data
    if (!linkedinText.toLowerCase().includes('linkedin') && linkedinText.length < 100) {
      const errorResponse: ApiError = {
        error: 'Invalid LinkedIn PDF',
        code: 'INVALID_LINKEDIN_PDF',
        details: 'The PDF does not appear to contain LinkedIn profile data. Please export your profile from LinkedIn and try again.'
      };
      return NextResponse.json(errorResponse, { status: 422 });
    }

    // Step 2: Fetch GitHub data
    let githubData;
    try {
      githubData = await fetchGitHubData(githubUrl);
    } catch (error) {
      console.error('GitHub fetch error:', error);
      const errorResponse: ApiError = {
        error: 'Failed to fetch GitHub profile',
        code: 'GITHUB_API_ERROR',
        details: error instanceof Error ? error.message : 'Please check the GitHub URL and try again.'
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    // Step 3: Analyze with AI
    let analysisResult: AnalysisResult;
    try {
      analysisResult = await analyzeProfiles(linkedinText, githubData);
    } catch (error) {
      console.error('Analysis error:', error);
      const errorResponse: ApiError = {
        error: 'Analysis failed',
        code: 'ANALYSIS_ERROR',
        details: 'Unable to complete the analysis. Please try again later.'
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    // Success response
    return NextResponse.json(analysisResult, { status: 200 });

  } catch (error) {
    console.error('Unexpected error:', error);
    const errorResponse: ApiError = {
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
      details: 'An unexpected error occurred. Please try again later.'
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}


