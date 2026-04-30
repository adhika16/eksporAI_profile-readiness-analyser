'use client';

import React from 'react';
import { LoadingState as LoadingStateType } from '../types/analysis';

interface LoadingStateProps {
  state: LoadingStateType;
}

const steps = [
  { key: 'uploading', label: 'Uploading PDF...', icon: '📄', progress: 10 },
  { key: 'extracting', label: 'Extracting LinkedIn data...', icon: '📋', progress: 25 },
  { key: 'github', label: 'Fetching GitHub profile...', icon: '🔗', progress: 40 },
  { key: 'analyzing', label: 'Analyzing with AI...', icon: '🤖', progress: 70 },
  { key: 'generating', label: 'Generating your report...', icon: '✨', progress: 90 },
  { key: 'complete', label: 'Complete!', icon: '✅', progress: 100 },
];

export default function LoadingState({ state }: LoadingStateProps) {
  const currentStepIndex = steps.findIndex(s => s.key === state.step);
  const currentProgress = state.progress || steps[currentStepIndex]?.progress || 0;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
          <p className="text-right text-xs text-slate-400 mt-2">{currentProgress}%</p>
        </div>

        {/* Current Step */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-pulse">
            {steps[currentStepIndex]?.icon || '🤖'}
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            {state.message || steps[currentStepIndex]?.label}
          </h3>
          <p className="text-sm text-slate-500">
            This may take 20-30 seconds
          </p>
        </div>

        {/* Step Indicators */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isPending = index > currentStepIndex;

            return (
              <div 
                key={step.key}
                className={`
                  flex items-center space-x-3 p-2 rounded-lg transition-all duration-300
                  ${isCompleted ? 'opacity-100' : isCurrent ? 'opacity-100 bg-blue-50' : 'opacity-40'}
                `}
              >
                <div className={`
                  flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs
                  ${isCompleted 
                    ? 'bg-green-500 text-white' 
                    : isCurrent 
                      ? 'bg-blue-500 text-white animate-pulse' 
                      : 'bg-slate-200 text-slate-400'
                  }
                `}>
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`
                  text-sm font-medium
                  ${isCompleted 
                    ? 'text-green-600' 
                    : isCurrent 
                      ? 'text-blue-700' 
                      : 'text-slate-400'
                  }
                `}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="mt-8 p-4 bg-slate-50 rounded-xl">
          <p className="text-xs text-slate-500 text-center">
            💡 <span className="font-medium">Tip:</span> While you wait, think about your target clients and the specific problems you can solve for them.
          </p>
        </div>
      </div>
    </div>
  );
}
