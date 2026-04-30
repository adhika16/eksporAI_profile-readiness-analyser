'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  const handleClick = () => {
    // Clear any stored results from sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('analysisResult');
    }
    router.push('/');
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors font-medium"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span>Analyze Another Profile</span>
    </button>
  );
}
