/**
 * WEB AURA 2K26 - San Andreas Victory Podium Banner
 * 
 * Styled like classic GTA: San Andreas "MISSION PASSED! RESPECT +" victory sequence:
 * - Solid colors, heavy black borders
 * - 1st, 2nd, and 3rd place squads
 * - Triggered by Admin broadcast
 */

import React from 'react';
import { useEvent } from '../../context/EventContext';
import SanAndreasBadge from '../common/SanAndreasBadge';

export default function PodiumBanner() {
  const { winners, isWinnerRevealed } = useEvent();

  if (!isWinnerRevealed || !winners || winners.length === 0) {
    return null;
  }

  const firstPlace = winners.find(w => w.rank === 1) || winners[0];
  const secondPlace = winners.find(w => w.rank === 2) || winners[1];
  const thirdPlace = winners.find(w => w.rank === 3) || winners[2];

  return (
    <div className="border-4 border-gta-black bg-gta-black text-white p-4 sm:p-6 gta-box-shadow-lg mb-8 select-none">
      {/* Respect + / Mission Passed Header */}
      <div className="text-center pb-4 border-b-3 border-gta-orange mb-6">
        <div className="inline-block bg-gta-green text-gta-black font-gta-condensed font-black text-sm sm:text-base px-3 py-1 border-2 border-gta-black uppercase tracking-widest mb-2">
          ★ RESPECT + 100 ★
        </div>
        <h2 className="font-gta-title text-3xl sm:text-5xl text-gta-orange gta-text-shadow leading-none tracking-tight">
          MISSION PASSED! WINNERS REVEALED
        </h2>
        <p className="font-gta-condensed text-base sm:text-xl font-bold uppercase tracking-wider text-gta-tan-light mt-1">
          THE CHAMPIONS OF WEB AURA 2K26
        </p>
      </div>

      {/* Podium Grid (1st Center, 2nd Left, 3rd Right) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end max-w-4xl mx-auto">
        
        {/* 2nd Place */}
        {secondPlace && (
          <div className="order-2 md:order-1 border-3 border-gta-black bg-gta-gray text-white p-4 text-center gta-box-shadow">
            <div className="bg-gta-black py-1 px-2 border border-gta-gray text-xs font-gta-condensed font-bold text-gta-gray-light uppercase mb-2">
              RUNNER UP • 2ND PLACE
            </div>
            <div className="text-3xl mb-1">🥈</div>
            <h3 className="font-gta-condensed text-2xl font-black uppercase text-gta-orange">
              {secondPlace.teamName}
            </h3>
            <div className="font-mono text-xs text-gta-tan font-bold my-1">
              {secondPlace.teamId}
            </div>
            <div className="font-gta-hud text-2xl font-bold text-gta-green">
              {secondPlace.finalScore} / 100
            </div>
          </div>
        )}

        {/* 1st Place (Grand Champion) */}
        {firstPlace && (
          <div className="order-1 md:order-2 border-4 border-gta-yellow bg-gta-orange text-gta-black p-6 text-center gta-box-shadow-lg -mt-2">
            <div className="bg-gta-black py-1 px-3 border border-black text-sm font-gta-condensed font-black text-gta-yellow uppercase mb-2">
              👑 GRAND CHAMPION • 1ST PLACE
            </div>
            <div className="text-4xl mb-1">🏆</div>
            <h3 className="font-gta-title text-3xl sm:text-4xl font-black uppercase text-gta-black leading-none">
              {firstPlace.teamName}
            </h3>
            <div className="font-mono text-sm text-gta-brown-dark font-black my-1.5">
              {firstPlace.teamId}
            </div>
            <div className="font-gta-hud text-4xl font-black text-gta-black bg-gta-yellow border-2 border-gta-black py-1 my-2">
              {firstPlace.finalScore} / 100
            </div>
            <p className="font-gta-condensed text-xs font-black uppercase tracking-wider text-gta-black">
              OUTSTANDING PRESENTATION & CLOUD DEPLOYMENT
            </p>
          </div>
        )}

        {/* 3rd Place */}
        {thirdPlace && (
          <div className="order-3 md:order-3 border-3 border-gta-black bg-gta-brown text-white p-4 text-center gta-box-shadow">
            <div className="bg-gta-black py-1 px-2 border border-gta-brown text-xs font-gta-condensed font-bold text-gta-tan uppercase mb-2">
              2ND RUNNER UP • 3RD PLACE
            </div>
            <div className="text-3xl mb-1">🥉</div>
            <h3 className="font-gta-condensed text-2xl font-black uppercase text-gta-tan-light">
              {thirdPlace.teamName}
            </h3>
            <div className="font-mono text-xs text-gta-tan font-bold my-1">
              {thirdPlace.teamId}
            </div>
            <div className="font-gta-hud text-2xl font-bold text-gta-green">
              {thirdPlace.finalScore} / 100
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
