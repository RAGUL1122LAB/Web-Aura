/**
 * WEB AURA 2K26 - San Andreas Classic 2004 Footer
 * Recreates the exact bracketed links, publisher boxes, and copyright from the reference
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { soundEffects } from '../../utils/soundEffects';
import { EVENT_CONFIG } from '../../config/eventConfig';

export default function Footer() {
  const handleLinkClick = () => {
    soundEffects.playClick();
  };

  return (
    <footer className="w-full bg-gta-black border-t-4 border-gta-black text-white pt-8 pb-10 select-none">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
        
        {/* Top Bracketed Navigation Links (As seen in reference image) */}
        <div className="flex items-center justify-center flex-wrap gap-1 sm:gap-2 text-sm sm:text-base font-gta-condensed uppercase tracking-wider text-gta-orange font-bold text-center">
          <Link 
            to="/about" 
            onClick={handleLinkClick}
            className="hover:text-white px-2 py-1 min-h-[38px] flex items-center"
          >
            [Contact Webmaster]
          </Link>
          <span className="hidden sm:inline text-gta-brown">|</span>
          <Link 
            to="/about" 
            onClick={handleLinkClick}
            className="hover:text-white px-2 py-1 min-h-[38px] flex items-center"
          >
            [About Web Aura]
          </Link>
          <span className="hidden sm:inline text-gta-brown">|</span>
          <a 
            href="#terms" 
            onClick={(e) => { e.preventDefault(); handleLinkClick(); alert("WEB AURA 2K26 Code of Conduct: Strictly original code developed during the hackathon. Zero plagiarism. Respect the Jury decisions."); }}
            className="hover:text-white px-2 py-1 min-h-[38px] flex items-center"
          >
            [Terms of Service]
          </a>
          <span className="hidden sm:inline text-gta-brown">|</span>
          <a 
            href="#privacy" 
            onClick={(e) => { e.preventDefault(); handleLinkClick(); alert("WEB AURA 2K26 Privacy Policy: Participant information is strictly utilized for event credentials, team matching, and certification."); }}
            className="hover:text-white px-2 py-1 min-h-[38px] flex items-center"
          >
            [Privacy Policy]
          </a>
        </div>

        {/* Publisher / Organizer Logo Badges (Recreating R* & Take-Two style rectangular boxes) */}
        <div className="flex items-center justify-center gap-4">
          {/* Logo 1: Rockstar-style R* -> W* WEB AURA */}
          <div className="w-12 h-12 bg-gta-orange border-2 border-white flex flex-col items-center justify-center text-gta-black font-gta-title font-black leading-none gta-box-shadow-sm select-none">
            <span className="text-2xl">W</span>
            <span className="text-[10px] -mt-1 font-bold">★</span>
          </div>

          {/* Logo 2: Take-Two style T2 -> 2K26 Dept badge */}
          <div className="w-12 h-12 bg-gta-blue border-2 border-white flex flex-col items-center justify-center text-white font-gta-condensed font-black leading-none gta-box-shadow-sm select-none">
            <span className="text-xl">2K</span>
            <span className="text-[9px] uppercase tracking-tighter">CSE</span>
          </div>
        </div>

        {/* Copyright Notice & Authoritative Event Date */}
        <div className="text-center flex flex-col items-center gap-1 text-xs text-gta-gray-light font-body">
          <p className="font-semibold text-gta-tan">
            © 2026 Web Aura Tech Club & Department of Computer Science and Engineering. All Rights Reserved.
          </p>
          <p className="text-[11px] text-gta-orange font-gta-condensed tracking-wider uppercase font-bold">
            EVENT DATE: {EVENT_CONFIG.eventDateDisplay} at {EVENT_CONFIG.eventTimeDisplay} • THEME: {EVENT_CONFIG.tagline}
          </p>
        </div>

      </div>
    </footer>
  );
}
