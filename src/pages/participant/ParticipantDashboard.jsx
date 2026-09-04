/**
 * WEB AURA 2K26 - Participant Dashboard
 * 
 * Rules:
 * - Welcome / participant name
 * - Team Name, Team ID, Members list
 * - Fixed membership: NO "Leave Team" or "Switch Team" controls
 * - Pre-Event vs Live state handling
 * - Score panels (masked unless Admin toggles visibility)
 * - Automatic OnboardingModal if profileComplete is false
 */

import React, { useState, useEffect } from 'react';
import PageContainer from '../../components/layout/PageContainer';
import SanAndreasPanel from '../../components/common/SanAndreasPanel';
import SanAndreasBadge from '../../components/common/SanAndreasBadge';
import SanAndreasButton from '../../components/common/SanAndreasButton';
import CountdownTimer from '../../components/public/CountdownTimer';
import LeaderboardTable from '../../components/leaderboard/LeaderboardTable';
import OnboardingModal from '../auth/OnboardingModal';
import { useAuth } from '../../context/AuthContext';
import { useEvent } from '../../context/EventContext';
import { teamService } from '../../services/teamService';
import { scoreService } from '../../services/scoreService';
import { EVENT_CONFIG } from '../../config/eventConfig';

export default function ParticipantDashboard() {
  const { currentUser } = useAuth();
  const { isLive, settings } = useEvent();
  
  const [team, setTeam] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (!currentUser.profileComplete || !currentUser.teamId) {
        setShowOnboarding(true);
      } else {
        setShowOnboarding(false);
        loadTeamData(currentUser.teamId);
      }
    }
  }, [currentUser]);

  const loadTeamData = (teamId) => {
    const t = teamService.getTeamById(teamId);
    setTeam(t);
    if (t) {
      const evals = scoreService.getTeamEvaluations(t.teamId);
      setEvaluations(evals);
    }
  };

  const handleOnboardingComplete = (newTeam) => {
    setTeam(newTeam);
    setShowOnboarding(false);
  };

  // Find scores
  const r1Eval = evaluations.find(e => e.roundId === 1);
  const r2Eval = evaluations.find(e => e.roundId === 2);
  const r1Score = r1Eval ? r1Eval.roundTotal : null;
  const r2Score = r2Eval ? r2Eval.roundTotal : null;
  const totalScore = (r1Score || 0) + (r2Score || 0);

  return (
    <PageContainer>
      {/* Onboarding trigger if incomplete */}
      <OnboardingModal
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
      />

      <div className="space-y-6 select-none">
        
        {/* Top Participant Welcome Banner */}
        <div className="border-3 border-gta-black bg-gta-black text-white p-3.5 sm:p-6 gta-box-shadow">
          <div className="flex items-center justify-between flex-wrap gap-3 border-b-2 border-gta-orange pb-3 mb-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs bg-gta-orange text-gta-black font-gta-condensed font-black px-2 py-0.5 uppercase tracking-widest">
                  PARTICIPANT TERMINAL
                </span>
                <span className="text-xs bg-gta-brown text-gta-tan px-2 py-0.5 font-mono">
                  {currentUser?.email}
                </span>
              </div>
              <h1 className="font-gta-title text-2xl sm:text-4xl md:text-5xl text-white gta-text-shadow leading-tight sm:leading-none tracking-tight mt-1">
                WELCOME, {currentUser?.name?.toUpperCase() || 'DEVELOPER'}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {isLive ? (
                <SanAndreasBadge variant="green" size="md">
                  ● STATUS: COMPETITION LIVE
                </SanAndreasBadge>
              ) : (
                <SanAndreasBadge variant="orange" size="md">
                  ⏳ STATUS: PRE-EVENT STAGING
                </SanAndreasBadge>
              )}
            </div>
          </div>

          <p className="font-body text-xs sm:text-sm text-gta-tan-light max-w-2xl leading-relaxed">
            Your squad headquarters for WEB AURA 2K26. Monitor evaluator feedback, review active rounds, and observe live standings across the event.
          </p>
        </div>

        {/* Countdown Timer (active in Pre-Event state) */}
        {!isLive && (
          <CountdownTimer />
        )}

        {/* Squad Details & Score Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* SQUAD PROFILE CARD (With Fixed Team Membership Notice) */}
          <div className="md:col-span-1 border-3 border-gta-black bg-gta-beige gta-box-shadow flex flex-col justify-between">
            <div>
              <div className="bg-gta-black text-white p-3.5 border-b-3 border-gta-black flex items-center justify-between">
                <h3 className="font-gta-condensed text-xl font-black uppercase tracking-wider text-gta-orange">
                  ★ SQUAD ROSTER
                </h3>
                <span className="font-mono text-xs bg-gta-brown text-gta-tan px-1.5 py-0.5">
                  {team?.teamId || 'UNASSIGNED'}
                </span>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <div className="text-[11px] font-gta-condensed font-bold uppercase tracking-wider text-gta-brown">
                    SQUAD / TEAM NAME
                  </div>
                  <h4 className="font-gta-condensed text-2xl font-black uppercase text-gta-black">
                    {team?.teamName || 'PENDING TEAM ASSIGNMENT'}
                  </h4>
                </div>

                <div>
                  <div className="text-[11px] font-gta-condensed font-bold uppercase tracking-wider text-gta-brown mb-1.5">
                    ROSTER MEMBERS ({team?.members?.length || 1})
                  </div>
                  <div className="space-y-1.5">
                    {team?.members?.map((m, idx) => (
                      <div 
                        key={m.uid || idx}
                        className="p-2 bg-white border border-gta-black flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-gta-black uppercase">{m.name}</div>
                          <div className="font-mono text-[10px] text-gta-brown">{m.email}</div>
                        </div>
                        <span className="font-gta-condensed font-bold text-[10px] bg-gta-black text-gta-orange px-1.5 py-0.5">
                          {m.role || (idx === 0 ? 'LEAD' : 'MEMBER')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fixed Membership Notice (Strictly NO leave/switch buttons) */}
                <div className="p-2.5 bg-gta-tan-light border border-gta-black text-[11px] font-semibold text-gta-brown leading-tight">
                  <span className="font-bold text-gta-black">🔒 FIXED MEMBERSHIP:</span> Once assigned, team rosters are locked for competitive fairness. For administrative corrections, contact the Jury Webmaster.
                </div>
              </div>
            </div>

            <div className="p-3 bg-gta-tan border-t-2 border-gta-black text-xs font-bold uppercase text-gta-brown">
              DEPARTMENT: {currentUser?.department || 'CSE'}
            </div>
          </div>

          {/* SQUAD EVALUATION PERFORMANCE PANELS */}
          <div className="md:col-span-2 space-y-4">
            
            {/* Score Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Round 1 Score Block */}
              <div className="border-3 border-gta-black bg-white p-3.5 gta-box-shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-gta-orange text-gta-black font-bold px-1 py-0.5 uppercase">
                      ROUND 1
                    </span>
                    <span className="text-xs text-gta-brown font-mono font-bold">50 MAX</span>
                  </div>
                  <h5 className="font-gta-condensed text-base font-black uppercase text-gta-black mt-1">
                    FRONTEND + PITCH
                  </h5>
                </div>

                <div className="my-3 text-center">
                  {!isLive ? (
                    <div className="text-xs font-gta-condensed font-bold text-gta-brown bg-gta-beige p-2 border border-gta-black uppercase">
                      🔒 PRE-EVENT LOCKED
                    </div>
                  ) : settings.round1ScoreVisible ? (
                    <div className="font-gta-hud text-3xl font-black text-gta-black">
                      {r1Score !== null ? `${r1Score}/50` : 'PENDING'}
                    </div>
                  ) : (
                    <div className="text-xs font-gta-condensed font-bold text-gta-orange bg-gta-black p-2 border border-black uppercase">
                      JURY EVALUATION HIDDEN
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-gta-brown font-semibold text-center">
                  5 Rubric Criteria x 10
                </div>
              </div>

              {/* Round 2 Score Block */}
              <div className="border-3 border-gta-black bg-white p-3.5 gta-box-shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-gta-blue text-white font-bold px-1 py-0.5 uppercase">
                      ROUND 2
                    </span>
                    <span className="text-xs text-gta-brown font-mono font-bold">50 MAX</span>
                  </div>
                  <h5 className="font-gta-condensed text-base font-black uppercase text-gta-black mt-1">
                    BACKEND + CLOUD
                  </h5>
                </div>

                <div className="my-3 text-center">
                  {!isLive ? (
                    <div className="text-xs font-gta-condensed font-bold text-gta-brown bg-gta-beige p-2 border border-gta-black uppercase">
                      🔒 PRE-EVENT LOCKED
                    </div>
                  ) : settings.round2ScoreVisible ? (
                    <div className="font-gta-hud text-3xl font-black text-gta-black">
                      {r2Score !== null ? `${r2Score}/50` : 'PENDING'}
                    </div>
                  ) : (
                    <div className="text-xs font-gta-condensed font-bold text-gta-orange bg-gta-black p-2 border border-black uppercase">
                      JURY EVALUATION HIDDEN
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-gta-brown font-semibold text-center">
                  5 Rubric Criteria x 10
                </div>
              </div>

              {/* Total Score Block */}
              <div className="border-3 border-gta-black bg-gta-black text-white p-3.5 gta-box-shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-gta-green text-gta-black font-black px-1 py-0.5 uppercase">
                      FINAL
                    </span>
                    <span className="text-xs text-gta-tan font-mono font-bold">100 MAX</span>
                  </div>
                  <h5 className="font-gta-condensed text-base font-black uppercase text-gta-orange mt-1">
                    TOTAL MARKS
                  </h5>
                </div>

                <div className="my-3 text-center">
                  {!isLive ? (
                    <div className="text-xs font-gta-condensed font-bold text-gta-tan bg-gta-charcoal p-2 border border-gta-gray uppercase">
                      🔒 PRE-EVENT LOCKED
                    </div>
                  ) : settings.totalScoreVisible ? (
                    <div className="font-gta-hud text-3xl font-black text-gta-green">
                      {totalScore > 0 ? `${totalScore}/100` : 'PENDING'}
                    </div>
                  ) : (
                    <div className="text-xs font-gta-condensed font-bold text-gta-orange bg-gta-brown p-2 border border-black uppercase">
                      PENDING REVEAL
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-gta-tan font-semibold text-center">
                  Supervised Total
                </div>
              </div>

            </div>

            {/* Event Guidelines Summary Box */}
            <div className="border-3 border-gta-black bg-gta-beige p-4 gta-box-shadow-sm">
              <h4 className="font-gta-condensed text-xl font-black uppercase text-gta-black mb-2">
                ★ PARTICIPANT ACTION DIRECTIVES
              </h4>
              <ul className="space-y-1.5 text-xs font-semibold text-gta-brown list-none">
                <li className="flex items-center gap-2">
                  <span className="text-gta-orange">◆</span>
                  <span><strong>Event Kickoff:</strong> {EVENT_CONFIG.eventDateDisplay} at {EVENT_CONFIG.eventTimeDisplay} sharp.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gta-orange">◆</span>
                  <span><strong>Round 1:</strong> Frontend UI fidelity & pitch presentation (50 marks).</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gta-orange">◆</span>
                  <span><strong>Round 2:</strong> Backend DB integration & live deployment verification (50 marks).</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gta-orange">◆</span>
                  <span><strong>Grand Podium:</strong> Real-time broadcast reveal upon jury completion.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Live Leaderboard Standings Section */}
        <div className="pt-2">
          <LeaderboardTable />
        </div>

      </div>
    </PageContainer>
  );
}
