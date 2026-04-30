'use client';

import React, { useState } from 'react';
import { ProposalTemplate } from '../types/analysis';

interface ProposalTemplatesProps {
  proposals: ProposalTemplate[];
}

export default function ProposalTemplates({ proposals }: ProposalTemplatesProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleCopy = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </span>
        Winning Proposal Templates
      </h3>
      
      <p className="text-sm text-slate-500 mb-4">
        Customize these templates based on your target job type
      </p>

      <div className="space-y-4">
        {proposals.map((proposal, index) => (
          <div 
            key={index}
            className="border border-slate-200 rounded-xl overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggleExpand(index)}
              className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
            >
              <div className="flex items-center">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold flex items-center justify-center mr-3">
                  {index + 1}
                </span>
                <span className="font-medium text-slate-700">{proposal.jobType}</span>
              </div>
              <svg 
                className={`w-5 h-5 text-slate-400 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Content */}
            {expandedIndex === index && (
              <div className="p-4 border-t border-slate-200">
                <div className="bg-slate-50 rounded-lg p-4 mb-3">
                  <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {proposal.proposal}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(proposal.proposal, index)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${copiedIndex === index 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }
                  `}
                >
                  {copiedIndex === index ? (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy Proposal</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
