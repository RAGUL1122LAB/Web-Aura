/**
 * WEB AURA 2K26 - Page Container
 * Provides early 2000s retro framed layout with thick borders and high contrast
 */

import React from 'react';

export default function PageContainer({ children, className = '' }) {
  return (
    <main className={`min-h-[85vh] bg-gta-black py-6 sm:py-8 px-3 sm:px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </main>
  );
}
