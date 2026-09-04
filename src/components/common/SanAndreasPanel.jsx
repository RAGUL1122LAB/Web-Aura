/**
 * WEB AURA 2K26 - San Andreas Panel
 * Strict 0 rounded corners, 0 gradients, heavy black border, authentic retro panel
 */

import React from 'react';

export default function SanAndreasPanel({
  title,
  subtitle,
  children,
  variant = 'beige', // 'beige' | 'dark' | 'tan' | 'orange' | 'white'
  headerBg = 'black', // 'black' | 'brown' | 'orange'
  className = '',
  actionRight,
  noPadding = false
}) {
  const bgStyles = {
    beige: 'bg-gta-beige text-gta-black',
    dark: 'bg-gta-dark text-gta-cream',
    tan: 'bg-gta-tan text-gta-brown',
    orange: 'bg-gta-orange text-gta-black',
    white: 'bg-white text-gta-black'
  };

  const headerStyles = {
    black: 'bg-gta-black text-white border-b-3 border-gta-black',
    brown: 'bg-gta-brown text-gta-tan-light border-b-3 border-gta-black',
    orange: 'bg-gta-orange text-gta-black border-b-3 border-gta-black'
  };

  return (
    <div className={`border-3 border-gta-black gta-box-shadow ${bgStyles[variant]} ${className}`}>
      {title && (
        <div className={`px-4 py-2.5 flex items-center justify-between flex-wrap gap-2 ${headerStyles[headerBg]}`}>
          <div>
            <h3 className="font-gta-condensed text-xl sm:text-2xl uppercase tracking-wider font-bold leading-none">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs uppercase tracking-widest font-semibold text-gta-orange mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {actionRight && (
            <div className="flex items-center gap-2">
              {actionRight}
            </div>
          )}
        </div>
      )}
      <div className={noPadding ? '' : 'p-4 sm:p-5'}>
        {children}
      </div>
    </div>
  );
}
