/**
 * WEB AURA 2K26 - Dispatch News
 * Exact recreation of "GROVE STREET TIMES" and "GANG WARS IN LS" sidebar from reference image
 */

import React from 'react';
import { EVENT_CONFIG } from '../../config/eventConfig';

export default function DispatchNews() {
  return (
    <div className="flex flex-col gap-4 select-none">
      
      {/* Upper Box: Recreating "GROVE STREET TIMES" */}
      <div className="border-3 border-gta-black bg-gta-beige gta-box-shadow">
        {/* Banner with retro reporter icon & bold uppercase title */}
        <div className="bg-gta-black text-white px-3 py-2 border-b-3 border-gta-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📰</span>
            <h3 className="font-gta-condensed text-xl sm:text-2xl font-black uppercase tracking-wider text-white leading-none">
              WEB AURA DISPATCH
            </h3>
          </div>
          <span className="text-[10px] bg-gta-orange text-gta-black font-bold px-1.5 py-0.5 uppercase">
            TIMES
          </span>
        </div>

        {/* Content with classic diamond bullet points */}
        <div className="p-4 flex flex-col gap-3 text-sm sm:text-base">
          <p className="font-semibold text-gta-black italic">
            Welcome to the official WEB AURA 2K26 competition portal!
          </p>

          <div className="flex flex-col gap-2.5">
            {EVENT_CONFIG.dispatchNews.map((item) => (
              <div key={item.id} className="flex items-start gap-2">
                <span className="text-gta-orange font-bold text-base leading-none select-none">◆</span>
                <div>
                  <span className="font-gta-condensed font-black uppercase tracking-wide text-gta-black mr-1.5">
                    {item.headline}:
                  </span>
                  <span className="text-gta-brown font-medium text-xs sm:text-sm">
                    {item.summary}
                  </span>
                </div>
              </div>
            ))}
            
            <div className="flex items-start gap-2">
              <span className="text-gta-orange font-bold text-base leading-none select-none">◆</span>
              <div>
                <span className="font-gta-condensed font-black uppercase tracking-wide text-gta-black mr-1.5">
                  AUTHORITATIVE START:
                </span>
                <span className="text-gta-brown font-medium text-xs sm:text-sm">
                  {EVENT_CONFIG.eventDateDisplay} at {EVENT_CONFIG.eventTimeDisplay}.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Box: Recreating "GANG WARS IN LS" from Reference Image */}
      <div className="border-3 border-gta-black bg-gta-beige gta-box-shadow">
        {/* Banner */}
        <div className="bg-gta-black text-white px-3 py-2 border-b-3 border-gta-black flex items-center justify-between">
          <h3 className="font-gta-condensed text-xl sm:text-2xl font-black uppercase tracking-wider text-white leading-none">
            WAR IN THE TERMINAL
          </h3>
          <span className="text-[10px] bg-gta-red text-white font-bold px-1.5 py-0.5 uppercase">
            LIVE LAB
          </span>
        </div>

        {/* Retro Graphic Box (Matching the screenshot snapshot) */}
        <div className="p-3">
          <div className="relative w-full h-44 bg-gta-brown border-2 border-gta-black overflow-hidden flex flex-col justify-between p-3">
            {/* Retro Terminal Code Visual */}
            <div className="font-mono text-xs text-gta-green leading-tight space-y-1">
              <p className="text-gta-tan font-bold">&gt; SQUAD_CHECK: [OK] WA26-T001</p>
              <p>&gt; RUNNING TEST_SUITE: ROUND_1</p>
              <p className="text-white">&gt; 5 QUESTIONS X 10 MARKS</p>
              <p className="text-gta-orange">&gt; STATUS: 50/50 MARKS VERIFIED</p>
              <p className="text-gta-green">&gt; DEPLOYMENT: PRODUCTION READY</p>
            </div>

            {/* Bottom HUD bar inside graphic */}
            <div className="bg-gta-black/90 p-1 border border-gta-black flex items-center justify-between text-[11px] font-gta-condensed font-bold text-white">
              <span className="text-gta-orange uppercase tracking-wider">LABORATORY: TERMINAL A</span>
              <span className="text-gta-green">RESPECT +</span>
            </div>
          </div>
          <p className="text-xs text-gta-brown font-semibold mt-2">
            Two rounds of intense architectural scrutiny. Bring clean commits, tested schemas, and sharp frontend presentations.
          </p>
        </div>
      </div>

    </div>
  );
}
