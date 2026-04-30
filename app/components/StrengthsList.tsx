'use client';

import React from 'react';
import { Strength } from '../types/analysis';

interface StrengthsListProps {
  strengths: Strength[];
}

export default function StrengthsList({ strengths }: StrengthsListProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </span>
        Key Strengths
      </h3>
      
      <div className="space-y-4">
        {strengths.map((strength, index) => (
          <div 
            key={index}
            className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl"
          >
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center mr-3 mt-0.5">
                {index + 1}
              </span>
              <div>
                <h4 className="text-sm font-semibold text-slate-800 mb-1">
                  {strength.point}
                </h4>
                <p className="text-sm text-slate-600">
                  <span className="font-medium text-emerald-600">Evidence: </span>
                  {strength.evidence}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
