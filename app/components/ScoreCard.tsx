'use client';

import React from 'react';
import { CategoryScores } from '../types/analysis';

interface ScoreCardProps {
  title: string;
  score: number;
  weight: number;
  description: string;
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
  if (score >= 90) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Average';
  return 'Needs Work';
}

export function ScoreCard({ title, score, weight, description }: ScoreCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
          <p className="text-xs text-slate-400 mt-1">Weight: {weight}%</p>
        </div>
        <div className="text-right">
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
          <span className="text-sm text-slate-400">/100</span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
        <div 
          className={`h-full ${getScoreBgColor(score)} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium ${getScoreColor(score)}`}>
          {getScoreLabel(score)}
        </span>
        <p className="text-xs text-slate-500 truncate max-w-[60%]" title={description}>
          {description}
        </p>
      </div>
    </div>
  );
}

interface CategoryScoresListProps {
  scores: CategoryScores;
}

const categories = [
  { key: 'technical_strength', title: 'Technical Strength', weight: 30, description: 'Skills depth & code quality' },
  { key: 'communication', title: 'Communication', weight: 25, description: 'English & professionalism' },
  { key: 'market_demand', title: 'Market Demand', weight: 20, description: 'Skill relevance globally' },
  { key: 'presentation', title: 'Presentation', weight: 15, description: 'Profile completeness' },
  { key: 'activity', title: 'Activity', weight: 10, description: 'GitHub contributions' },
] as const;

export default function CategoryScoresList({ scores }: CategoryScoresListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <ScoreCard
          key={category.key}
          title={category.title}
          score={scores[category.key]}
          weight={category.weight}
          description={category.description}
        />
      ))}
    </div>
  );
}
