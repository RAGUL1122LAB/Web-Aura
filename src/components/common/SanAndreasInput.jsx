/**
 * WEB AURA 2K26 - San Andreas Input
 * Sharp rectangular inputs with solid borders and high contrast
 */

import React from 'react';

export default function SanAndreasInput({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helperText,
  disabled = false,
  required = false,
  className = '',
  max,
  min,
  step,
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="font-gta-condensed uppercase tracking-wider text-base font-bold text-gta-black flex items-center justify-between"
        >
          <span>{label} {required && <span className="text-gta-red">*</span>}</span>
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        max={max}
        min={min}
        step={step}
        className={`
          w-full px-3.5 py-2.5
          bg-white text-gta-black font-semibold text-base
          border-3 border-gta-black
          focus:outline-none focus:bg-gta-cream focus:border-gta-orange
          disabled:bg-gta-gray-light disabled:cursor-not-allowed
          ${error ? 'border-gta-red bg-red-50' : ''}
        `}
        {...props}
      />
      {error && (
        <p className="text-xs font-bold text-gta-red uppercase tracking-wide flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-xs text-gta-brown font-medium">
          {helperText}
        </p>
      )}
    </div>
  );
}
