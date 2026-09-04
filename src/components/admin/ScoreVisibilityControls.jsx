/**
 * WEB AURA 2K26 - Admin Score Visibility Controls
 * 
 * Centralized toggles for participant score visibility:
 * - Round 1 Visibility: ON / OFF
 * - Round 2 Visibility: ON / OFF
 * - Total Score Visibility: ON / OFF
 */

import React from 'react';
import { useEvent } from '../../context/EventContext';
import SanAndreasButton from '../common/SanAndreasButton';

export default function ScoreVisibilityControls() {
  const { settings, updateVisibility } = useEvent();

  const toggleR1 = () => updateVisibility({ round1: !settings.round1ScoreVisible });
  const toggleR2 = () => updateVisibility({ round2: !settings.round2ScoreVisible });
  const toggleTotal = () => updateVisibility({ total: !settings.totalScoreVisible });

  return (
    <div className="border-3 border-gta-black bg-gta-beige p-4 gta-box-shadow select-none">
      <div className="bg-gta-black text-white p-3 border-b-3 border-gta-black flex items-center justify-between flex-wrap gap-2">
        <div>
          <h4 className="font-gta-condensed text-xl sm:text-2xl font-black uppercase text-white leading-none">
            SCORE BROADCAST VISIBILITY
          </h4>
          <p className="font-gta-condensed text-xs uppercase tracking-widest text-gta-orange mt-0.5">
            CENTRALIZED FIREBASE EVENT SETTINGS
          </p>
        </div>
        <span className="text-xs bg-gta-orange text-gta-black font-bold px-2 py-0.5 uppercase">
          ADMIN AUTHORITY
        </span>
      </div>

      <div className="p-4 space-y-4">
        <p className="text-xs text-gta-brown font-semibold">
          Control which evaluation scores are made visible on the public leaderboard and participant dashboards in real time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Round 1 Toggle */}
          <div className="p-3 bg-white border-2 border-gta-black flex flex-col justify-between gap-3">
            <div>
              <div className="font-gta-condensed text-lg font-black uppercase text-gta-black">
                ROUND 1 SCORES
              </div>
              <p className="text-xs text-gta-brown font-medium">
                Presentation & Frontend (50 Max)
              </p>
            </div>
            <SanAndreasButton
              variant={settings.round1ScoreVisible ? 'green' : 'black'}
              size="md"
              onClick={toggleR1}
            >
              {settings.round1ScoreVisible ? '● VISIBLE [ON]' : '○ HIDDEN [OFF]'}
            </SanAndreasButton>
          </div>

          {/* Round 2 Toggle */}
          <div className="p-3 bg-white border-2 border-gta-black flex flex-col justify-between gap-3">
            <div>
              <div className="font-gta-condensed text-lg font-black uppercase text-gta-black">
                ROUND 2 SCORES
              </div>
              <p className="text-xs text-gta-brown font-medium">
                Backend & Cloud Deploy (50 Max)
              </p>
            </div>
            <SanAndreasButton
              variant={settings.round2ScoreVisible ? 'green' : 'black'}
              size="md"
              onClick={toggleR2}
            >
              {settings.round2ScoreVisible ? '● VISIBLE [ON]' : '○ HIDDEN [OFF]'}
            </SanAndreasButton>
          </div>

          {/* Total / Final Toggle */}
          <div className="p-3 bg-white border-2 border-gta-black flex flex-col justify-between gap-3">
            <div>
              <div className="font-gta-condensed text-lg font-black uppercase text-gta-black">
                TOTAL / FINAL MARKS
              </div>
              <p className="text-xs text-gta-brown font-medium">
                Overall Standings (100 Max)
              </p>
            </div>
            <SanAndreasButton
              variant={settings.totalScoreVisible ? 'green' : 'black'}
              size="md"
              onClick={toggleTotal}
            >
              {settings.totalScoreVisible ? '● VISIBLE [ON]' : '○ HIDDEN [OFF]'}
            </SanAndreasButton>
          </div>
        </div>
      </div>
    </div>
  );
}
