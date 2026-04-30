'use client';

import React from 'react';
import { RoadmapWeek } from '../types/analysis';

interface RoadmapProps {
  roadmap: RoadmapWeek[];
}

export default function Roadmap({ roadmap }: RoadmapProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <span className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mr-3">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </span>
        30-Day Improvement Roadmap
      </h3>
      
      <div className="space-y-6">
        {roadmap.map((week, index) => (
          <div key={week.week} className="relative">
            {/* Timeline connector */}
            {index < roadmap.length - 1 && (
              <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-slate-200" />
            )}
            
            <div className="flex items-start">
              {/* Week badge */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xs font-bold flex items-center justify-center mr-4 z-10">
                {week.week}
              </div>
              
              <div className="flex-1 pb-6">
                <h4 className="text-sm font-semibold text-slate-800 mb-1">
                  Week {week.week}: {week.focus}
                </h4>
                <ul className="space-y-2">
                  {week.actions.map((action, actionIndex) => (
                    <li key={actionIndex} className="flex items-start text-sm text-slate-600">
                      <span className="mr-2 text-cyan-500 mt-1">•</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
