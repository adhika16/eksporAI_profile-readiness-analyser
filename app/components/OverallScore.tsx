'use client';

import React from 'react';

interface OverallScoreProps {
  score: number;
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'text-emerald-500';
  if (score >= 70) return 'text-blue-500';
  if (score >= 50) return 'text-amber-500';
  return 'text-red-500';
}

function getScoreBgColor(score: number): string {
  if (score >= 90) return 'bg-emerald-500';
  if (score >= 70) return 'bg-blue-500';
  if (score >= 50) return 'bg-amber-500';
  return 'bg-red-500';
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Globally Competitive';
  if (score >= 70) return 'Good - Minor Improvements Needed';
  if (score >= 50) return 'Average - Significant Gaps Exist';
  return 'Needs Major Transformation';
}

function getScoreDescription(score: number): string {
  if (score >= 90) return 'You are ready to compete for global clients. Your profile demonstrates professional excellence.';
  if (score >= 70) return 'Strong foundation with room for refinement. Focus on the suggested improvements.';
  if (score >= 50) return 'Good start, but significant improvements needed to attract international clients.';
  return 'Major transformation required. Follow the roadmap to build export readiness.';
}

export default function OverallScore({ score }: OverallScoreProps) {
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
      <h3 className="text-lg font-semibold text-slate-700 mb-6">
        Export Readiness Score
      </h3>
      
      <div className="relative inline-flex items-center justify-center">
        {/* Background circle */}
        <svg className="transform -rotate-90 w-64 h-64">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-100"
          />
          {/* Progress circle */}
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${getScoreColor(score)} transition-all duration-1000 ease-out`}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-6xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
          <span className="text-lg text-slate-400 mt-1">/100</span>
        </div>
      </div>
      
      {/* Score Label */}
      <div className="mt-6">
        <span className={`
          inline-block px-4 py-2 rounded-full text-sm font-semibold
          ${getScoreBgColor(score)} text-white
        `}>
          {getScoreLabel(score)}
        </span>
      </div>
      
      {/* Description */}
      <p className="mt-4 text-sm text-slate-600 max-w-md mx-auto">
        {getScoreDescription(score)}
      </p>
    </div>
  );
}
