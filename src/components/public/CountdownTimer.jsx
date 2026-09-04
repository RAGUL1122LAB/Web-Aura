/**
 * WEB AURA 2K26 - San Andreas Game Countdown Timer
 * 
 * Target: 7 September 2026 at 9:00 AM (Authoritative Date)
 * Styled as classic 2004 PS2 game timer / mission clock
 * Strict: 0 rounded corners, 0 gradients, solid colors
 */

import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '../../config/eventConfig';
import { useEvent } from '../../context/EventContext';

export default function CountdownTimer() {
  const { isLive } = useEvent();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const target = new Date(EVENT_CONFIG.eventStartIso).getTime();
    const now = Date.now();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (isLive || timeLeft.expired) {
    return (
      <div className="bg-gta-green border-3 border-gta-black px-4 py-2 flex items-center justify-between gap-4 gta-box-shadow select-none">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚡</span>
          <span className="font-gta-condensed font-black text-2xl uppercase tracking-wider text-gta-black">
            STATUS: EVENT IS LIVE!
          </span>
        </div>
        <span className="font-gta-hud text-lg font-bold bg-gta-black text-gta-green px-2 py-0.5 border border-black">
          ROUND ACTIVE
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gta-black border-3 border-gta-orange p-3 sm:p-4 text-white gta-box-shadow select-none">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b-2 border-gta-brown pb-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-gta-orange font-bold text-base sm:text-lg shrink-0">⏳</span>
          <h4 className="font-gta-condensed text-base sm:text-xl font-bold uppercase tracking-wider text-gta-orange leading-tight">
            MISSION CLOCK • COUNTDOWN TO KICKOFF
          </h4>
        </div>
        <span className="text-[11px] sm:text-xs bg-gta-orange text-gta-black font-gta-condensed font-bold px-2 py-0.5 uppercase tracking-wide shrink-0">
          {EVENT_CONFIG.eventDateDisplay} @ 9:00 AM
        </span>
      </div>

      {/* Clock Display Grid */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center">
        <TimeUnit label="DAYS" value={timeLeft.days} />
        <TimeUnit label="HOURS" value={timeLeft.hours} />
        <TimeUnit label="MINS" value={timeLeft.minutes} />
        <TimeUnit label="SECS" value={timeLeft.seconds} highlight />
      </div>
    </div>
  );
}

function TimeUnit({ label, value, highlight = false }) {
  const formatted = String(value).padStart(2, '0');
  return (
    <div className={`p-1.5 sm:p-2 border-2 border-gta-black ${highlight ? 'bg-gta-orange text-gta-black' : 'bg-gta-charcoal text-white'}`}>
      <div className="font-gta-hud text-xl sm:text-3xl md:text-4xl font-black tracking-wider sm:tracking-widest leading-none">
        {formatted}
      </div>
      <div className={`font-gta-condensed text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mt-1 ${highlight ? 'text-gta-black' : 'text-gta-tan'}`}>
        {label}
      </div>
    </div>
  );
}
