/**
 * WEB AURA 2K26 - San Andreas Button
 * Strict Rules: 0 border radius, 0 gradients, solid colors, black border
 */

import React from 'react';
import { soundEffects } from '../../utils/soundEffects';

export default function SanAndreasButton({
  children,
  onClick,
  variant = 'orange', // 'orange' | 'black' | 'tan' | 'green' | 'red'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  type = 'button',
  className = '',
  bracket = false,
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) return;
    soundEffects.playClick();
    if (onClick) onClick(e);
  };

  const variantStyles = {
    orange: 'bg-gta-orange hover:bg-gta-orange-light text-gta-black border-gta-black',
    black: 'bg-gta-black hover:bg-gta-dark text-gta-orange border-gta-orange',
    tan: 'bg-gta-tan hover:bg-gta-tan-light text-gta-brown border-gta-black',
    green: 'bg-gta-green hover:bg-gta-green-dark text-gta-black border-gta-black',
    red: 'bg-gta-red hover:bg-red-700 text-white border-gta-black',
    dark: 'bg-gta-brown hover:bg-gta-brown-light text-gta-cream border-gta-black'
  };

  const sizeStyles = {
    sm: 'px-3 py-1 text-sm font-semibold',
    md: 'px-5 py-2 text-base font-bold',
    lg: 'px-7 py-3 text-xl font-extrabold tracking-wider font-gta-condensed'
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        uppercase transition-none cursor-pointer select-none
        border-3 gta-box-sm
        active:translate-x-0.5 active:translate-y-0.5
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-x-0 disabled:active:translate-y-0
        ${variantStyles[variant] || variantStyles.orange}
        ${sizeStyles[size] || sizeStyles.md}
        ${className}
      `}
      {...props}
    >
      {bracket ? `[ ${children} ]` : children}
    </button>
  );
}
