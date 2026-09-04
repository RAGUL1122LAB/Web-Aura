/**
 * WEB AURA 2K26 - Admin Command Center
 * 
 * Rules:
 * - Admin identity & root authorization
 * - View & control event state (PRE_EVENT, LIVE, COMPLETED, WINNER_REVEALED)
 * - Centralized Score Visibility Toggles (Round 1, Round 2, Total)
 * - Winner Reveal Trigger & Broadcast
 * - Authorized Team-Membership Correction Tool
 * - No evaluator score locking (evaluators can edit scores per finalized SRS)
 */

import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import ScoreVisibilityControls from '../../components/admin/ScoreVisibilityControls';
import WinnerRevealModal from '../../components/admin/WinnerRevealModal';
import TeamCorrectionModal from '../../components/admin/TeamCorrectionModal';
import LeaderboardTable from '../../components/leaderboard/LeaderboardTable';
import SanAndreasBadge from '../../components/common/SanAndreasBadge';
import SanAndreasButton from '../../components/common/SanAndreasButton';
import { useAuth } from '../../context/AuthContext';
import { useEvent } from '../../context/EventContext';
import { EVENT_CONFIG } from '../../config/eventConfig';

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const { eventStatus, settings, updateEventState } = useEvent();

  const handleStateChange = (newState) => {
    updateEventState(newState);
  };

  return (
    <PageContainer>
      <div className="space-y-6 select-none">
        
        {/* Admin Header Banner */}
        <div className="border-3 border-gta-black bg-gta-black text-white p-4 sm:p-6 gta-box-shadow">
          <div className="flex items-center justify-between flex-wrap gap-3 border-b-2 border-gta-red pb-3 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-gta-red text-white font-gta-condensed font-black px-2 py-0.5 uppercase tracking-widest">
                  ROOT LEVEL COMMAND
                </span>
                <span className="text-xs font-mono text-gta-tan">
                  ROOT: {currentUser?.email}
                </span>
              </div>
              <h1 className="font-gta-title text-3xl sm:text-5xl text-gta-orange gta-text-shadow leading-none tracking-tight mt-1">
                ADMIN CONTROL CENTER
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <SanAndreasBadge variant="red" size="md">
                AUTHORITATIVE ACCESS
              </SanAndreasBadge>
              <div className="bg-gta-charcoal px-3 py-1 border border-gta-gray text-xs font-mono text-gta-green">
                STATE: {eventStatus}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-gta-tan-light">
            <span>
              AUTHORITATIVE EVENT START: <strong>{EVENT_CONFIG.eventDateDisplay} at {EVENT_CONFIG.eventTimeDisplay}</strong>
            </span>
            <span className="text-gta-orange font-bold uppercase font-gta-condensed">
              REAL-TIME BROADCAST ENGINE ACTIVE
            </span>
          </div>
        </div>

        {/* Event State Machine Controller Panel */}
        <div className="border-3 border-gta-black bg-gta-beige p-4 gta-box-shadow">
          <div className="bg-gta-black text-white p-3 border-b-3 border-gta-black flex items-center justify-between">
            <h4 className="font-gta-condensed text-xl font-black uppercase text-white">
              EVENT STATE MACHINE OVERRIDE
            </h4>
            <span className="text-xs font-mono text-gta-orange">
              CURRENT: {eventStatus}
            </span>
          </div>

          <div className="p-4 flex items-center flex-wrap gap-3">
            <SanAndreasButton
              size="md"
              variant={eventStatus === 'PRE_EVENT' ? 'orange' : 'black'}
              onClick={() => handleStateChange('PRE_EVENT')}
            >
              PRE_EVENT (COUNTDOWN & LOCKED)
            </SanAndreasButton>

            <SanAndreasButton
              size="md"
              variant={eventStatus === 'LIVE' ? 'green' : 'black'}
              onClick={() => handleStateChange('LIVE')}
            >
              LIVE (COMPETITION ACTIVE)
            </SanAndreasButton>

            <SanAndreasButton
              size="md"
              variant={eventStatus === 'COMPLETED' ? 'tan' : 'black'}
              onClick={() => handleStateChange('COMPLETED')}
            >
              COMPLETED (SUBMISSIONS CLOSED)
            </SanAndreasButton>

            <SanAndreasButton
              size="md"
              variant={eventStatus === 'WINNER_REVEALED' ? 'red' : 'black'}
              onClick={() => handleStateChange('WINNER_REVEALED')}
            >
              WINNER_REVEALED (PODIUM BROADCAST)
            </SanAndreasButton>
          </div>
        </div>

        {/* 2-Column Controls Grid: Score Visibility & Winner Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScoreVisibilityControls />
          <WinnerRevealModal />
        </div>

        {/* Team Roster & Administrative Correction Tool */}
        <TeamCorrectionModal adminUid={currentUser?.uid} />

        {/* Full Admin Leaderboard Overview with Unmasked Scores */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-white font-gta-condensed uppercase px-1">
            <span className="text-xl font-black text-gta-orange">★ ADMIN SUPERVISED STANDINGS (ALL MARKS REVEALED)</span>
            <span className="text-xs text-gta-tan">FULL REAL-TIME SCORE STREAM</span>
          </div>
          <LeaderboardTable showScoresOverride={true} />
        </div>

      </div>
    </PageContainer>
  );
}
