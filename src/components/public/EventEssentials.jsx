/**
 * WEB AURA 2K26 - Event Essentials
 * Recreating "SA ESSENTIALS" from the bottom left of reference image
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { soundEffects } from '../../utils/soundEffects';

export default function EventEssentials() {
  const handleLinkClick = () => {
    soundEffects.playClick();
  };

  return (
    <div className="select-none">
      <h3 className="font-gta-condensed text-xl sm:text-2xl font-black uppercase tracking-wider text-gta-black border-b-2 border-gta-black pb-1 mb-2">
        EVENT ESSENTIALS
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-sm sm:text-base font-gta-condensed font-bold uppercase tracking-wider text-gta-brown">
        <Link 
          to="/event" 
          onClick={handleLinkClick}
          className="min-h-[44px] flex items-center hover:text-gta-orange hover:bg-gta-black px-2.5 py-1.5 border border-transparent hover:border-gta-black transition-none"
        >
          [Round 1: Presentation + Frontend (50 Marks)]
        </Link>
        <Link 
          to="/event" 
          onClick={handleLinkClick}
          className="min-h-[44px] flex items-center hover:text-gta-orange hover:bg-gta-black px-2.5 py-1.5 border border-transparent hover:border-gta-black transition-none"
        >
          [Round 2: Backend + Deploy (50 Marks)]
        </Link>
        <Link 
          to="/leaderboard" 
          onClick={handleLinkClick}
          className="min-h-[44px] flex items-center hover:text-gta-orange hover:bg-gta-black px-2.5 py-1.5 border border-transparent hover:border-gta-black transition-none"
        >
          [Live Leaderboard & Ranks]
        </Link>
        <Link 
          to="/gallery" 
          onClick={handleLinkClick}
          className="min-h-[44px] flex items-center hover:text-gta-orange hover:bg-gta-black px-2.5 py-1.5 border border-transparent hover:border-gta-black transition-none"
        >
          [Hackathon War Room Gallery]
        </Link>
        <Link 
          to="/about" 
          onClick={handleLinkClick}
          className="min-h-[44px] flex items-center hover:text-gta-orange hover:bg-gta-black px-2.5 py-1.5 border border-transparent hover:border-gta-black transition-none"
        >
          [Tech Club Faculty & Jury]
        </Link>
        <Link 
          to="/winners" 
          onClick={handleLinkClick}
          className="min-h-[44px] flex items-center hover:text-gta-orange hover:bg-gta-black px-2.5 py-1.5 border border-transparent hover:border-gta-black transition-none text-gta-green-dark"
        >
          [San Andreas Winners Podium]
        </Link>
      </div>
    </div>
  );
}
