/**
 * WEB AURA 2K26 - Evaluator Command Center
 * 
 * Rules:
 * - Evaluator identity & role
 * - Team search (debounced, TEAM NOT FOUND state)
 * - Round 1 scoring: 5 questions x 10 marks (max 50)
 * - Round 2 scoring: 5 questions x 10 marks (max 50)
 * - Score validation (0-10), auto-sum
 * - Edit previously submitted scores
 * - Classic San Andreas command layout
 */

import React, { useState } from 'react';
import PageContainer from '../../components/layout/PageContainer';
import TeamSearch from '../../components/evaluator/TeamSearch';
import ScoreCard from '../../components/evaluator/ScoreCard';
import SanAndreasBadge from '../../components/common/SanAndreasBadge';
import { useAuth } from '../../context/AuthContext';
import { useEvent } from '../../context/EventContext';

export default function EvaluatorDashboard() {
  const { currentUser } = useAuth();
  const { eventStatus } = useEvent();
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <PageContainer>
      <div className="space-y-6 select-none">
        
        {/* Evaluator Header Banner */}
        <div className="border-3 border-gta-black bg-gta-black text-white p-4 sm:p-6 gta-box-shadow">
          <div className="flex items-center justify-between flex-wrap gap-3 border-b-2 border-gta-orange pb-3 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-gta-blue text-white font-gta-condensed font-black px-2 py-0.5 uppercase tracking-widest">
                  OFFICIAL JURY WORKSPACE
                </span>
                <span className="text-xs font-mono text-gta-tan">
                  ID: {currentUser?.uid || 'eval_jury'}
                </span>
              </div>
              <h1 className="font-gta-title text-3xl sm:text-5xl text-white gta-text-shadow leading-none tracking-tight mt-1">
                EVALUATOR COMMAND CENTER
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <SanAndreasBadge variant="blue" size="md">
                JURY BENCH AUTHORIZED
              </SanAndreasBadge>
              <span className="text-xs font-gta-condensed font-bold text-gta-orange uppercase">
                EVENT: {eventStatus}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2 text-xs sm:text-sm text-gta-tan-light">
            <span>
              EVALUATOR: <strong>{currentUser?.name?.toUpperCase() || 'SENIOR JURY MEMBER'}</strong> ({currentUser?.email})
            </span>
            <span className="text-gta-green font-bold uppercase font-gta-condensed tracking-wider">
              ★ SYSTEM READY: ROUND 1 (50) & ROUND 2 (50)
            </span>
          </div>
        </div>

        {/* 2-Column Evaluation Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Team Search & Scanner (4 Cols) */}
          <div className="lg:col-span-4">
            <TeamSearch 
              onSelectTeam={(team) => setSelectedTeam(team)}
              selectedTeamId={selectedTeam?.teamId}
            />
          </div>

          {/* Right Column: Active Score Card (8 Cols) */}
          <div className="lg:col-span-8">
            <ScoreCard 
              team={selectedTeam}
              evaluatorId={currentUser?.uid}
              onScoreSaved={() => {
                // Keep team selected so evaluator sees saved state
              }}
            />
          </div>

        </div>

      </div>
    </PageContainer>
  );
}
