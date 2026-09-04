/**
 * WEB AURA 2K26 - San Andreas Badge
 * Sharp rectangular tags with black borders
 */

import React from 'react';

export default function SanAndreasBadge({
  children,
  variant = 'orange', // 'orange' | 'green' | 'red' | 'blue' | 'black' | 'tan'
  size = 'sm',
  className = ''
}) {
  const variantStyles = {
    orange: 'bg-gta-orange text-gta-black border-gta-black',
    green: 'bg-gta-green text-gta-black border-gta-black',
    red: 'bg-gta-red text-white border-gta-black',
    blue: 'bg-gta-blue text-white border-gta-black',
    black: 'bg-gta-black text-gta-orange border-gta-orange',
    tan: 'bg-gta-tan text-gta-brown border-gta-black'
  };

  const sizeStyles = {
    xs: 'px-1.5 py-0.5 text-xs font-bold',
    sm: 'px-2.5 py-1 text-xs font-bold tracking-wider',
    md: 'px-3.5 py-1.5 text-sm font-extrabold tracking-wider'
  };

  return (
    <span className={`inline-flex items-center justify-center font-gta-condensed uppercase border-2 select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
}
