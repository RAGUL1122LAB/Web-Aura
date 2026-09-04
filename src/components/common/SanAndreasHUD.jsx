/**
 * WEB AURA 2K26 - San Andreas Authentic HUD Widget
 * 
 * Direct recreation of the top-right HUD seen in the GTA: San Andreas reference image:
 * - CJ/S or Participant/Role tag
 * - Health Bar (Solid red block)
 * - Armor Bar (Solid blue/white block)
 * - Cash Counter: $10509$ in classic green
 * - Weapon Box: Rectangular icon box with fist/code icon
 */

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEvent } from '../../context/EventContext';
import { soundEffects } from '../../utils/soundEffects';

export default function SanAndreasHUD() {
  const { currentUser, role } = useAuth();
  const { eventStatus } = useEvent();
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
  };

  // Determine display label based on role/user
  const userTag = currentUser 
    ? (currentUser.name ? currentUser.name.split(' ')[0].toUpperCase() : 'CJ')
    : 'GUEST/S';

  const roleColor = role === 'ADMIN' ? 'text-gta-red' : role === 'EVALUATOR' ? 'text-gta-blue' : 'text-gta-orange';

  return (
    <div className="flex items-center gap-3 select-none">
      {/* HUD Bars & Cash Column */}
      <div className="flex flex-col items-end gap-1">
        {/* User / Squad Tag */}
        <div className="flex items-center gap-1.5 font-gta-condensed text-xs sm:text-base font-extrabold tracking-wider">
          <span className="text-white drop-shadow-[1px_1px_0px_#000]">{userTag}</span>
          <span className="text-[10px] sm:text-xs bg-gta-black px-1 text-gta-orange border border-gta-black">
            [{role}]
          </span>
        </div>

        {/* Health Bar (Red) - Visible on tablet/desktop */}
        <div className="hidden sm:flex items-center gap-1">
          <span className="text-[9px] font-bold text-gta-red font-gta-condensed">HP</span>
          <div className="w-20 sm:w-24 h-2.5 bg-black border border-black p-0.5">
            <div className="w-full h-full bg-gta-red"></div>
          </div>
        </div>

        {/* Armor Bar (Blue/White) - Visible on tablet/desktop */}
        <div className="hidden sm:flex items-center gap-1">
          <span className="text-[9px] font-bold text-gta-blue font-gta-condensed tracking-tighter">ARMOR</span>
          <div className="w-20 sm:w-24 h-2.5 bg-black border border-black p-0.5">
            <div className="w-4/5 h-full bg-gta-blue"></div>
          </div>
        </div>

        {/* Cash / Points Counter (Authentic SA Green Font) */}
        <div className="font-gta-hud text-lg sm:text-2xl font-bold tracking-wider sm:tracking-widest text-gta-green gta-text-shadow leading-none mt-0.5">
          {eventStatus === 'LIVE' ? '$2026.09$' : '$0010509$'}
        </div>
      </div>

      {/* Weapon / Fist Icon Box */}
      <div className="relative w-11 h-11 sm:w-14 sm:h-14 bg-gta-black border-2 sm:border-3 border-gta-black flex flex-col items-center justify-center p-1 group shrink-0">
        {/* Weapon / Code Icon graphic */}
        <div className="font-gta-condensed text-sm sm:text-base font-black text-gta-orange leading-none">
          {role === 'ADMIN' ? 'SYS' : role === 'EVALUATOR' ? 'LAW' : 'SA'}
        </div>
        <div className="text-[8px] sm:text-[9px] font-mono font-bold text-white uppercase tracking-tighter">
          {role === 'ADMIN' ? 'ROOT' : role === 'EVALUATOR' ? 'JURY' : 'DEV'}
        </div>

        {/* Sound toggle button in bottom corner */}
        <button
          onClick={toggleSound}
          title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          className="absolute -bottom-2 -left-2 bg-gta-orange text-gta-black border border-black text-[8px] px-1 font-bold font-mono hover:bg-gta-orange-light leading-tight"
        >
          {isMuted ? 'OFF' : 'SFX'}
        </button>
      </div>
    </div>
  );
}
