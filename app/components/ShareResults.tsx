'use client';

import React, { useState } from 'react';
import { AnalysisResult } from '../types/analysis';

interface ShareResultsProps {
  result: AnalysisResult;
}

export default function ShareResults({ result }: ShareResultsProps) {
  const [copied, setCopied] = useState(false);

  const generateShareableText = () => {
    const topStrength = result.strengths[0]?.point || 'Strong technical skills';
    const keyImprovement = result.weaknesses[0]?.point || 'Communication skills';
    
    return `🎯 My Export Readiness Score: ${result.overall_score}/100

✅ Top Strength: ${topStrength}
📈 Key Focus: ${keyImprovement}
💰 Recommended Rate: $${result.recommended_rate.min}-${result.recommended_rate.max} USD/hour

Analyzed by EksporAI Coach - AI-powered career coaching for Indonesian digital talent 🚀`;
  };

  const handleShare = async () => {
    const text = generateShareableText();
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mr-3">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </span>
        Share Your Results
      </h3>
      
      <p className="text-sm text-slate-500 mb-4">
        Share your progress with your network
      </p>

      <button
        onClick={handleShare}
        className={`
          w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all
          ${copied 
            ? 'bg-emerald-100 text-emerald-700' 
            : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
          }
        `}
      >
        {copied ? (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Copied to clipboard!</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span>Copy Summary to Share</span>
          </>
        )}
      </button>

      <div className="mt-4 p-3 bg-slate-50 rounded-lg">
        <p className="text-xs text-slate-500 text-center">
          Share on LinkedIn, Twitter, or with your mentor to get feedback on your improvement journey!
        </p>
      </div>
    </div>
  );
}
