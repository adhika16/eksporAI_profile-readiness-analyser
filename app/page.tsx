'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import FileUpload from './components/FileUpload';
import GitHubInput from './components/GitHubInput';
import LoadingState from './components/LoadingState';
import { AnalysisResult, LoadingState as LoadingStateType, ApiError } from './types/analysis';

export default function Home() {
  const router = useRouter();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [pdfError, setPdfError] = useState('');
  const [githubError, setGithubError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingState, setLoadingState] = useState<LoadingStateType>({
    step: 'uploading',
    progress: 0,
    message: 'Starting analysis...'
  });

  const handleFileSelect = useCallback((file: File | null) => {
    setPdfFile(file);
    setPdfError('');
  }, []);

  const handleGithubChange = useCallback((value: string) => {
    setGithubUrl(value);
    setGithubError('');
  }, []);

  const validateForm = (): boolean => {
    let isValid = true;

    if (!pdfFile) {
      setPdfError('Please upload your LinkedIn PDF');
      isValid = false;
    }

    if (!githubUrl.trim()) {
      setGithubError('Please enter your GitHub URL');
      isValid = false;
    } else if (!/^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/?$/.test(githubUrl)) {
      setGithubError('Please enter a valid GitHub URL (e.g., https://github.com/username)');
      isValid = false;
    }

    return isValid;
  };

  const updateLoadingState = useCallback((step: LoadingStateType['step'], progress: number, message: string) => {
    setLoadingState({ step, progress, message });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('linkedinPdf', pdfFile!);
    formData.append('githubUrl', githubUrl);

    try {
      // Simulate loading steps
      updateLoadingState('uploading', 10, 'Uploading PDF...');
      await new Promise(resolve => setTimeout(resolve, 500));

      updateLoadingState('extracting', 25, 'Extracting LinkedIn data...');
      await new Promise(resolve => setTimeout(resolve, 800));

      updateLoadingState('github', 40, 'Fetching GitHub profile...');
      await new Promise(resolve => setTimeout(resolve, 800));

      updateLoadingState('analyzing', 70, 'Analyzing with AI...');
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      updateLoadingState('generating', 90, 'Generating your report...');
      await new Promise(resolve => setTimeout(resolve, 500));

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.details || errorData.error || 'Analysis failed');
      }

      const result: AnalysisResult = await response.json();

      // Store result in sessionStorage for results page
      sessionStorage.setItem('analysisResult', JSON.stringify(result));

      updateLoadingState('complete', 100, 'Complete!');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Navigate to results page
      router.push('/results');

    } catch (error) {
      console.error('Analysis error:', error);
      alert(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <LoadingState state={loadingState} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            EksporAI Coach
          </h1>
          <p className="text-lg text-slate-600 max-w-lg mx-auto">
            AI-powered analysis to help Indonesian digital talent compete in the global market
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <FileUpload 
              onFileSelect={handleFileSelect}
              selectedFile={pdfFile}
              error={pdfError}
            />

            {/* GitHub Input */}
            <GitHubInput
              value={githubUrl}
              onChange={handleGithubChange}
              error={githubError}
            />

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Analyze My Profile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="text-sm font-semibold text-slate-700 mb-1">Export Readiness Score</h3>
            <p className="text-xs text-slate-500">Weighted analysis across 5 key categories</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
            <div className="text-2xl mb-2">✍️</div>
            <h3 className="text-sm font-semibold text-slate-700 mb-1">Optimized Content</h3>
            <p className="text-xs text-slate-500">AI-generated LinkedIn About & proposals</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="text-sm font-semibold text-slate-700 mb-1">Action Plan</h3>
            <p className="text-xs text-slate-500">30-day roadmap to improve your profile</p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-center text-xs text-slate-400">
          🔒 We only analyze data you voluntarily upload. No profile data is stored permanently.
        </p>
      </div>
    </div>
  );
}
