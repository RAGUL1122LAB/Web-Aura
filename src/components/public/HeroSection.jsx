/**
 * WEB AURA 2K26 - Hero Section
 * Direct visual translation of "CJ'S SAN ANDREAS HUB" from reference image
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { soundEffects } from '../../utils/soundEffects';
import SanAndreasButton from '../common/SanAndreasButton';
import EventEssentials from './EventEssentials';

export default function HeroSection() {
  const { currentUser, role } = useAuth();

  return (
    <div className="border-3 border-gta-black bg-gta-beige text-gta-black gta-box-shadow select-none">
      {/* Panel Header (Recreating "CJ'S SAN ANDREAS HUB / HOME PAGE") */}
      <div className="bg-gta-black text-white px-4 py-3 border-b-3 border-gta-black flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="font-gta-condensed text-2xl sm:text-3xl font-black uppercase tracking-wider text-white leading-none">
            WEB AURA 2K26 HUB
          </h2>
          <p className="font-gta-condensed text-xs sm:text-sm font-bold uppercase tracking-widest text-gta-orange mt-0.5">
            DESIGN • DEVELOP • DEPLOY — OFFICIAL COMPETITION PORTAL
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-gta-orange text-gta-black font-gta-condensed font-black px-2 py-0.5 text-xs uppercase border border-black">
            STATE OF SAN ANDREAS
          </span>
        </div>
      </div>

      {/* Hero Visual Banner (Classic Early-2000s San Andreas Crew Sunset Banner) */}
      <div className="relative w-full min-h-[18rem] sm:min-h-[20rem] h-auto bg-gta-orange overflow-hidden border-b-3 border-gta-black flex flex-col justify-between p-3.5 sm:p-6 gap-4">
        {/* Retro City Sky Backdrop with San Andreas Palm Silhouettes & Streetlamps */}
        <div className="absolute inset-0 bg-[#E8771A] flex items-end justify-between px-6 pointer-events-none opacity-90">
          {/* Silhouetted Palms */}
          <div className="text-6xl sm:text-8xl select-none opacity-40 -mb-2">🌴</div>
          <div className="text-5xl sm:text-7xl select-none opacity-30 -mb-2">🌴</div>
          <div className="text-7xl sm:text-9xl select-none opacity-40 -mb-4">🌴</div>
        </div>

        {/* Central Bold Banner Typography */}
        <div className="relative z-10">
          <div className="inline-block bg-gta-black px-2.5 sm:px-3 py-1 border-2 border-gta-orange mb-2">
            <span className="font-gta-condensed text-[11px] sm:text-sm font-black text-gta-orange uppercase tracking-widest">
              ANNUAL HACKATHON SHOWDOWN
            </span>
          </div>
          <h1 className="font-gta-title text-3xl sm:text-5xl md:text-6xl text-white gta-text-shadow-lg leading-none tracking-tight flex items-center flex-wrap gap-1.5 sm:gap-3">
            <span>WEB</span>
            <span>AURA</span>
            <span className="text-white">2K26</span>
          </h1>
          <p className="font-gta-condensed text-xs sm:text-base md:text-2xl font-black text-gta-black bg-gta-tan-light inline-block px-2 sm:px-2.5 py-0.5 border-2 border-gta-black mt-2 uppercase tracking-wide max-w-full">
            TWO ROUNDS • 100 TOTAL MARKS • LIVE CLOUD DEPLOYMENT
          </p>
        </div>

        {/* Call to Action Controls (Strict Rectangular, Black/Orange) */}
        <div className="relative z-10 flex items-center flex-wrap gap-2.5 sm:gap-3 pt-1">
          {currentUser ? (
            <Link to={role === 'EVALUATOR' ? '/evaluator' : role === 'ADMIN' ? '/admin' : '/dashboard'} className="w-full sm:w-auto">
              <SanAndreasButton variant="black" size="lg" className="w-full sm:w-auto justify-center">
                ★ ENTER YOUR {role} HQ ★
              </SanAndreasButton>
            </Link>
          ) : (
            <>
              <Link to="/signup" className="w-full sm:w-auto">
                <SanAndreasButton variant="black" size="lg" className="w-full sm:w-auto justify-center">
                  ★ SQUAD UP & REGISTER ★
                </SanAndreasButton>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <SanAndreasButton variant="orange" size="lg" className="w-full sm:w-auto justify-center">
                  [ PARTICIPANT LOGIN ]
                </SanAndreasButton>
              </Link>
            </>
          )}

          <Link to="/event" className="w-full sm:w-auto">
            <SanAndreasButton variant="tan" size="md" className="w-full sm:w-auto justify-center">
              [ VIEW RULES & MARKS ]
            </SanAndreasButton>
          </Link>
        </div>
      </div>

      {/* Lower Section: Event Essentials Links (As seen in the bottom-left of reference image) */}
      <div className="p-4 bg-gta-beige">
        <EventEssentials />
      </div>
    </div>
  );
}
