'use client';

import React from 'react';
import { HourlyRate } from '../types/analysis';

interface RateRecommendationProps {
  rate: HourlyRate;
}

export default function RateRecommendation({ rate }: RateRecommendationProps) {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        Recommended Hourly Rate
      </h3>
      
      <div className="flex items-baseline justify-center my-6">
        <span className="text-3xl font-bold">${rate.min}</span>
        <span className="text-xl mx-2 text-white/70">–</span>
        <span className="text-3xl font-bold">${rate.max}</span>
        <span className="text-lg ml-2 text-white/70">{rate.currency}</span>
      </div>
      
      <p className="text-sm text-white/80 text-center">
        Based on your skill level, portfolio quality, and current market rates for Indonesian developers
      </p>
      
      <div className="mt-4 pt-4 border-t border-white/20">
        <p className="text-xs text-white/70 text-center">
          💡 Start at the lower end to build your reputation, then increase as you gain reviews
        </p>
      </div>
    </div>
  );
}
