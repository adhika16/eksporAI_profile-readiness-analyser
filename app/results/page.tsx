'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnalysisResult } from '../types/analysis';
import OverallScore from '../components/OverallScore';
import CategoryScoresList from '../components/ScoreCard';
import StrengthsList from '../components/StrengthsList';
import WeaknessesList from '../components/WeaknessesList';
import OptimizedAbout from '../components/OptimizedAbout';
import Roadmap from '../components/Roadmap';
import ProposalTemplates from '../components/ProposalTemplates';
import RateRecommendation from '../components/RateRecommendation';
import ShareResults from '../components/ShareResults';
import BackButton from '../components/BackButton';

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve result from sessionStorage
    const storedResult = sessionStorage.getItem('analysisResult');
    
    if (storedResult) {
      try {
        const parsedResult: AnalysisResult = JSON.parse(storedResult);
        setResult(parsedResult);
      } catch (error) {
        console.error('Failed to parse result:', error);
        router.push('/');
      }
    } else {
      // No result found, redirect to home
      router.push('/');
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <BackButton />
        </div>

        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Your Export Readiness Report
          </h1>
          <p className="text-lg text-slate-600">
            Comprehensive analysis of your profile and personalized recommendations
          </p>
        </div>

        {/* Main Score Section */}
        <div className="mb-8">
          <OverallScore score={result.overall_score} />
        </div>

        {/* Category Scores */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Category Breakdown</h2>
          <CategoryScoresList scores={result.category_scores} />
        </div>

        {/* Two Column Layout: Strengths & Weaknesses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <StrengthsList strengths={result.strengths} />
          <WeaknessesList weaknesses={result.weaknesses} />
        </div>

        {/* Rate Recommendation */}
        <div className="mb-8 max-w-md mx-auto">
          <RateRecommendation rate={result.recommended_rate} />
        </div>

        {/* Optimized About Section */}
        <div className="mb-8">
          <OptimizedAbout content={result.optimized_about} />
        </div>

        {/* Proposal Templates */}
        <div className="mb-8">
          <ProposalTemplates proposals={result.proposals} />
        </div>

        {/* 30-Day Roadmap */}
        <div className="mb-8">
          <Roadmap roadmap={result.roadmap} />
        </div>

        {/* Share Results */}
        <div className="mb-8 max-w-md mx-auto">
          <ShareResults result={result} />
        </div>

        {/* Footer Actions */}
        <div className="text-center pb-8">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
