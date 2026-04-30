'use client';

import React from 'react';
import { Weakness } from '../types/analysis';

interface WeaknessesListProps {
  weaknesses: Weakness[];
}

export default function WeaknessesList({ weaknesses }: WeaknessesListProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-3">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </span>
        Areas for Improvement
      </h3>
      
      <div className="space-y-4">
        {weaknesses.map((weakness, index) => (
          <div 
            key={index}
            className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl"
          >
            <div className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center mr-3 mt-0.5">
                {index + 1}
              </span>
              <div>
                <h4 className="text-sm font-semibold text-slate-800 mb-1">
                  {weakness.point}
                </h4>
                <p className="text-sm text-slate-600">
                  <span className="font-medium text-amber-600">Action: </span>
                  {weakness.improvement}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
