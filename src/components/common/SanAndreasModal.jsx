/**
 * WEB AURA 2K26 - San Andreas Modal
 * Sharp rectangular popups, solid borders, zero gradients
 */

import React, { useEffect } from 'react';
import SanAndreasButton from './SanAndreasButton';

export default function SanAndreasModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-lg'
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div 
        className={`w-full ${maxWidth} bg-gta-beige border-4 border-gta-black gta-box-shadow-lg relative animate-none`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gta-black px-4 py-3 border-b-3 border-gta-black flex items-center justify-between">
          <div>
            <h3 className="font-gta-condensed text-2xl uppercase tracking-wider font-bold text-white leading-none">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs uppercase tracking-widest font-semibold text-gta-orange mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gta-red text-white font-bold border-2 border-white hover:bg-red-700 flex items-center justify-center text-sm"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
