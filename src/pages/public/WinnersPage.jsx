/**
 * WEB AURA 2K26 - Winners Page (/winners)
 * 
 * Dedicated San Andreas Grand Podium & Hall of Fame:
 * - 1st, 2nd, and 3rd place squads
 * - Triggered by Admin broadcast
 * - Strict San Andreas aesthetic
 */

import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import PodiumBanner from '../../components/leaderboard/PodiumBanner';
import LeaderboardTable from '../../components/leaderboard/LeaderboardTable';
import { useEvent } from '../../context/EventContext';
import SanAndreasButton from '../../components/common/SanAndreasButton';
import { Link } from 'react-router-dom';

export default function WinnersPage() {
  const { isWinnerRevealed, winners } = useEvent();

  return (
    <PageContainer>
      <div className="space-y-6 select-none">
        
        {/* Banner */}
        <div className="border-3 border-gta-black bg-gta-black text-white p-4 sm:p-6 gta-box-shadow">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b-2 border-gta-orange pb-3 mb-3">
            <div>
              <span className="text-xs bg-gta-green text-gta-black font-gta-condensed font-black px-2 py-0.5 uppercase tracking-widest">
                HALL OF FAME • PODIUM ARCHIVE
              </span>
              <h1 className="font-gta-title text-3xl sm:text-5xl text-gta-orange gta-text-shadow leading-none tracking-tight mt-1">
                WEB AURA 2K26 CHAMPIONS
              </h1>
            </div>
            <Link to="/leaderboard">
              <SanAndreasButton variant="orange" size="sm">
                [ FULL LEADERBOARD ]
              </SanAndreasButton>
            </Link>
          </div>

          <p className="font-body text-sm sm:text-base text-gta-tan-light max-w-2xl leading-relaxed">
            Honoring the highest-scoring development squads who dominated both Round 1 (Frontend & Presentation) and Round 2 (Backend & Live Cloud Deployment).
          </p>
        </div>

        {/* Dynamic Podium Banner */}
        {isWinnerRevealed ? (
          <>
            <PodiumBanner />
            <LeaderboardTable showScoresOverride={true} />
          </>
        ) : (
          <div className="border-3 border-gta-black bg-gta-beige p-8 text-center gta-box-shadow">
            <div className="font-gta-condensed font-black text-sm text-gta-orange tracking-widest mb-2">[CEREMONY LOCKED]</div>
            <h3 className="font-gta-condensed text-3xl font-black uppercase text-gta-black">
              PODIUM CEREMONY PENDING
            </h3>
            <p className="text-sm font-semibold text-gta-brown max-w-md mx-auto mt-2">
              The grand winner reveal has not yet been triggered by the Jury Administrators. Scores and standings are currently being finalized. Check back soon or monitor the live leaderboard!
            </p>
            <div className="mt-4">
              <Link to="/leaderboard">
                <SanAndreasButton variant="black" size="md">
                  VIEW CURRENT STANDINGS
                </SanAndreasButton>
              </Link>
            </div>
          </div>
        )}

      </div>
    </PageContainer>
  );
}
