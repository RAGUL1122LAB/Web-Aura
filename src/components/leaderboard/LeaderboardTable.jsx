/**
 * WEB AURA 2K26 - Leaderboard Table
 * 
 * Rules:
 * - Pre-event: Locked banner with countdown
 * - Live: Competition ranking (#1, #1, #3, #4)
 * - Public sees Rank + Team Name
 * - Scores visible ONLY when enabled by Admin in eventSettings
 */

import React from 'react';
import { useEvent } from '../../context/EventContext';
import SanAndreasBadge from '../common/SanAndreasBadge';

export default function LeaderboardTable({ showScoresOverride = false }) {
  const { leaderboard, settings, isLive } = useEvent();

  // Score visibility flags
  const showR1 = showScoresOverride || settings.round1ScoreVisible;
  const showR2 = showScoresOverride || settings.round2ScoreVisible;
  const showTotal = showScoresOverride || settings.totalScoreVisible;

  return (
    <div className="border-3 border-gta-black bg-gta-beige gta-box-shadow select-none">
      {/* Table Title Banner */}
      <div className="bg-gta-black text-white px-4 py-3 border-b-3 border-gta-black flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏆</span>
          <div>
            <h3 className="font-gta-condensed text-2xl sm:text-3xl font-black uppercase tracking-wider text-white leading-none">
              OFFICIAL SQUAD LEADERBOARD
            </h3>
            <p className="font-gta-condensed text-xs uppercase tracking-widest text-gta-orange mt-0.5">
              COMPETITION RANKINGS • SAN ANDREAS STANDINGS
            </p>
          </div>
        </div>

        {/* State Badge */}
        <div className="flex items-center gap-2">
          {isLive ? (
            <SanAndreasBadge variant="green" size="md">
              ● LIVE RANKINGS
            </SanAndreasBadge>
          ) : (
            <SanAndreasBadge variant="red" size="md">
              🔒 PRE-EVENT LOCKED
            </SanAndreasBadge>
          )}
        </div>
      </div>

      {/* Visibility Status Bar */}
      <div className="bg-gta-charcoal text-white px-4 py-2 border-b-2 border-gta-black flex items-center justify-between flex-wrap gap-2 text-xs font-gta-condensed uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span>SCORE VISIBILITY:</span>
          <span className={showR1 ? 'text-gta-green font-bold' : 'text-gta-red'}>
            R1: {showR1 ? '[VISIBLE]' : '[HIDDEN]'}
          </span>
          <span className={showR2 ? 'text-gta-green font-bold' : 'text-gta-red'}>
            R2: {showR2 ? '[VISIBLE]' : '[HIDDEN]'}
          </span>
          <span className={showTotal ? 'text-gta-green font-bold' : 'text-gta-red'}>
            TOTAL: {showTotal ? '[VISIBLE]' : '[HIDDEN]'}
          </span>
        </div>
        <span className="text-gta-tan">
          TIE RULE: 1224 COMPETITION RANKING
        </span>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-gta-condensed">
          <thead>
            <tr className="bg-gta-brown text-gta-tan-light border-b-3 border-gta-black uppercase text-base sm:text-lg tracking-wider">
              <th className="py-2.5 px-4 text-center w-16">RANK</th>
              <th className="py-2.5 px-4">TEAM / SQUAD NAME</th>
              <th className="py-2.5 px-4 text-center">TEAM ID</th>
              <th className="py-2.5 px-4 text-center">MEMBERS</th>
              <th className="py-2.5 px-4 text-center">ROUND 1 (50)</th>
              <th className="py-2.5 px-4 text-center">ROUND 2 (50)</th>
              <th className="py-2.5 px-4 text-center bg-gta-black text-gta-orange">TOTAL (100)</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-gta-black text-base font-bold">
            {leaderboard && leaderboard.length > 0 ? (
              leaderboard.map((team, index) => {
                const isTop1 = team.rank === 1;
                const isTop2 = team.rank === 2;
                const isTop3 = team.rank === 3;

                return (
                  <tr 
                    key={team.teamId}
                    className={`
                      hover:bg-gta-tan-light transition-none
                      ${isTop1 ? 'bg-amber-100' : index % 2 === 0 ? 'bg-white' : 'bg-gta-beige'}
                    `}
                  >
                    {/* Rank with special podium color */}
                    <td className="py-3 px-4 text-center">
                      <span className={`
                        inline-block px-2.5 py-1 text-lg font-black border-2 border-gta-black
                        ${isTop1 ? 'bg-gta-yellow text-gta-black' : isTop2 ? 'bg-gta-gray-light text-gta-black' : isTop3 ? 'bg-amber-700 text-white' : 'bg-gta-black text-white'}
                      `}>
                        #{team.rank}
                      </span>
                    </td>

                    {/* Team Name */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="text-lg sm:text-xl font-black text-gta-black uppercase tracking-wide">
                          {team.teamName}
                        </span>
                        {team.members && team.members.length > 0 && (
                          <span className="text-xs font-body font-semibold text-gta-brown uppercase">
                            Lead: {team.members[0]?.name || 'Captain'}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Team ID */}
                    <td className="py-3 px-4 text-center font-mono text-sm sm:text-base text-gta-brown-dark font-bold">
                      {team.teamId}
                    </td>

                    {/* Member Count */}
                    <td className="py-3 px-4 text-center">
                      <span className="bg-gta-black text-white px-2 py-0.5 text-xs font-mono">
                        {team.memberCount || team.members?.length || 1} DEVS
                      </span>
                    </td>

                    {/* Round 1 Score (Masked if hidden) */}
                    <td className="py-3 px-4 text-center">
                      {showR1 ? (
                        <span className="font-gta-hud text-xl text-gta-black font-bold">
                          {team.r1Score !== null ? `${team.r1Score}/50` : '—'}
                        </span>
                      ) : (
                        <span className="text-xs text-gta-brown bg-gta-tan px-2 py-0.5 border border-gta-brown font-bold">
                          [LOCKED]
                        </span>
                      )}
                    </td>

                    {/* Round 2 Score (Masked if hidden) */}
                    <td className="py-3 px-4 text-center">
                      {showR2 ? (
                        <span className="font-gta-hud text-xl text-gta-black font-bold">
                          {team.r2Score !== null ? `${team.r2Score}/50` : '—'}
                        </span>
                      ) : (
                        <span className="text-xs text-gta-brown bg-gta-tan px-2 py-0.5 border border-gta-brown font-bold">
                          [LOCKED]
                        </span>
                      )}
                    </td>

                    {/* Total Score (Masked if hidden) */}
                    <td className="py-3 px-4 text-center bg-gta-charcoal text-white font-gta-hud text-2xl font-black tracking-wider">
                      {showTotal ? (
                        <span className={team.totalScore > 0 ? 'text-gta-green' : 'text-gta-tan'}>
                          {team.totalScore !== null ? `${team.totalScore}` : '00'}
                        </span>
                      ) : (
                        <span className="text-xs text-gta-orange font-gta-condensed uppercase tracking-wider font-bold">
                          HIDDEN
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gta-brown uppercase font-bold text-lg">
                  NO TEAMS CURRENTLY REGISTERED.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="p-3 bg-gta-tan-light border-t-2 border-gta-black text-xs font-semibold text-gta-brown flex items-center justify-between flex-wrap gap-2">
        <span>★ Ranks update dynamically via Cloud Firestore real-time synchronization.</span>
        <span className="uppercase font-bold text-gta-black">Max Marks: 100 (50 R1 + 50 R2)</span>
      </div>
    </div>
  );
}
