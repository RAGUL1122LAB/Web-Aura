/**
 * WEB AURA 2K26 - Event Page
 * 
 * Strict Scope:
 * Exactly 2 rounds:
 * - Round 1: Presentation + Frontend (50 Marks, 5 Questions x 10 Marks)
 * - Round 2: Backend + Database + Deployment (50 Marks, 5 Questions x 10 Marks)
 * Total: 100 Marks
 * Authoritative Start: 7 September 2026 at 9:00 AM
 */

import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import SanAndreasPanel from '../../components/common/SanAndreasPanel';
import SanAndreasBadge from '../../components/common/SanAndreasBadge';
import { EVENT_CONFIG } from '../../config/eventConfig';

export default function EventPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        
        {/* Top Header Banner */}
        <div className="border-3 border-gta-black bg-gta-black text-white p-4 sm:p-6 gta-box-shadow select-none">
          <div className="flex items-center justify-between flex-wrap gap-3 border-b-2 border-gta-orange pb-3 mb-3">
            <div>
              <span className="text-xs bg-gta-orange text-gta-black font-gta-condensed font-black px-2 py-0.5 uppercase tracking-widest">
                OFFICIAL COMPETITION DIRECTIVE
              </span>
              <h1 className="font-gta-title text-2xl sm:text-4xl md:text-5xl text-white gta-text-shadow leading-tight sm:leading-none tracking-tight mt-1">
                WEB AURA 2K26 RULES & ROUNDS
              </h1>
            </div>
            <div className="text-left sm:text-right">
              <div className="font-gta-hud text-lg sm:text-xl text-gta-green font-bold">
                7 SEPTEMBER 2026 @ 9:00 AM
              </div>
              <div className="text-xs font-gta-condensed font-bold text-gta-tan uppercase tracking-wider">
                CENTRALIZED TIMELINE
              </div>
            </div>
          </div>

          <p className="font-body text-sm sm:text-base text-gta-tan-light max-w-3xl leading-relaxed">
            WEB AURA 2K26 is the ultimate collegiate battleground for full-stack engineering squads.
            Teams will compete through two rigorous rounds designed to evaluate visual fidelity, system design, architectural scalability, and real-time cloud deployment.
          </p>
        </div>

        {/* Two Competition Rounds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Round 1 Card */}
          <div className="border-3 border-gta-black bg-gta-beige gta-box-shadow select-none flex flex-col justify-between">
            <div>
              <div className="bg-gta-black text-white p-3 sm:p-4 border-b-3 border-gta-black flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[10px] bg-gta-orange text-gta-black font-bold px-1.5 py-0.5 uppercase">
                    STAGE 01
                  </span>
                  <h3 className="font-gta-condensed text-xl sm:text-2xl font-black uppercase text-white tracking-wide mt-1">
                    ROUND 1: PRESENTATION + FRONTEND
                  </h3>
                </div>
                <div className="text-left sm:text-right">
                  <div className="font-gta-hud text-2xl sm:text-3xl font-black text-gta-green">
                    50 MARKS
                  </div>
                  <div className="text-[10px] text-gta-tan uppercase font-bold">
                    MAX SCORE
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-xs text-gta-brown font-semibold">
                  Squads present their core concept, UI polish, design system fidelity, and client-side responsiveness before the jury.
                </p>

                {/* 5 Questions Rubric */}
                <div className="space-y-2">
                  <div className="text-xs font-gta-condensed font-bold text-gta-black uppercase tracking-wider border-b border-gta-black pb-1">
                    EVALUATION CRITERIA (5 QUESTIONS • 10 MARKS EACH):
                  </div>
                  {EVENT_CONFIG.rounds[0].questions.map((q, idx) => (
                    <div key={q.id} className="p-2.5 bg-white border border-gta-black flex items-start justify-between gap-2">
                      <div>
                        <div className="font-gta-condensed font-bold text-sm uppercase text-gta-black">
                          {q.title}
                        </div>
                        <div className="text-xs text-gta-brown">
                          {q.description}
                        </div>
                      </div>
                      <span className="font-mono text-xs bg-gta-black text-gta-orange px-1.5 py-0.5 font-bold shrink-0">
                        10 MARKS
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-gta-tan border-t-2 border-gta-black text-xs font-bold uppercase text-gta-brown flex items-center justify-between">
              <span>★ SUBMISSIONS LOCKED AT ROUND CLOSE</span>
              <span className="text-gta-black font-mono">MAX: 50/50</span>
            </div>
          </div>

          {/* Round 2 Card */}
          <div className="border-3 border-gta-black bg-gta-beige gta-box-shadow select-none flex flex-col justify-between">
            <div>
              <div className="bg-gta-black text-white p-3 sm:p-4 border-b-3 border-gta-black flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[10px] bg-gta-blue text-white font-bold px-1.5 py-0.5 uppercase">
                    STAGE 02
                  </span>
                  <h3 className="font-gta-condensed text-xl sm:text-2xl font-black uppercase text-white tracking-wide mt-1">
                    ROUND 2: BACKEND + DB + DEPLOYMENT
                  </h3>
                </div>
                <div className="text-left sm:text-right">
                  <div className="font-gta-hud text-2xl sm:text-3xl font-black text-gta-green">
                    50 MARKS
                  </div>
                  <div className="text-[10px] text-gta-tan uppercase font-bold">
                    MAX SCORE
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-xs text-gta-brown font-semibold">
                  Squads demonstrate database schema design, security rule enforcement, transactional integrity, and live cloud deployment.
                </p>

                {/* 5 Questions Rubric */}
                <div className="space-y-2">
                  <div className="text-xs font-gta-condensed font-bold text-gta-black uppercase tracking-wider border-b border-gta-black pb-1">
                    EVALUATION CRITERIA (5 QUESTIONS • 10 MARKS EACH):
                  </div>
                  {EVENT_CONFIG.rounds[1].questions.map((q, idx) => (
                    <div key={q.id} className="p-2.5 bg-white border border-gta-black flex items-start justify-between gap-2">
                      <div>
                        <div className="font-gta-condensed font-bold text-sm uppercase text-gta-black">
                          {q.title}
                        </div>
                        <div className="text-xs text-gta-brown">
                          {q.description}
                        </div>
                      </div>
                      <span className="font-mono text-xs bg-gta-black text-gta-orange px-1.5 py-0.5 font-bold shrink-0">
                        10 MARKS
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-gta-tan border-t-2 border-gta-black text-xs font-bold uppercase text-gta-brown flex items-center justify-between">
              <span>★ REAL-TIME CLOUD VERIFICATION REQUIRED</span>
              <span className="text-gta-black font-mono">MAX: 50/50</span>
            </div>
          </div>

        </div>

        {/* Competition Mark Distribution Summary */}
        <div className="border-3 border-gta-black bg-gta-tan-light p-3.5 sm:p-5 gta-box-shadow select-none">
          <div className="flex items-center justify-between flex-wrap gap-3 border-b-2 border-gta-black pb-3 mb-3">
            <div>
              <h3 className="font-gta-condensed text-xl sm:text-2xl font-black uppercase text-gta-black leading-tight">
                OVERALL MARK DISTRIBUTION & JURY BENCHMARK
              </h3>
              <p className="text-xs font-bold text-gta-brown uppercase">
                STRICT 100-POINT SYSTEM • COMPETITION RANKINGS
              </p>
            </div>
            <div className="font-gta-hud text-2xl sm:text-4xl font-black text-gta-black bg-gta-orange px-3 py-1 border-2 border-gta-black">
              100 MARKS TOTAL
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="bg-white p-3 border-2 border-gta-black">
              <div className="font-gta-condensed text-sm font-bold uppercase text-gta-brown">ROUND 1 MAXIMUM</div>
              <div className="font-gta-hud text-3xl font-black text-gta-black mt-1">50 MARKS</div>
              <div className="text-[11px] text-gta-brown font-semibold">5 Questions x 10 Marks</div>
            </div>
            <div className="bg-white p-3 border-2 border-gta-black">
              <div className="font-gta-condensed text-sm font-bold uppercase text-gta-brown">ROUND 2 MAXIMUM</div>
              <div className="font-gta-hud text-3xl font-black text-gta-black mt-1">50 MARKS</div>
              <div className="text-[11px] text-gta-brown font-semibold">5 Questions x 10 Marks</div>
            </div>
            <div className="bg-gta-black text-white p-3 border-2 border-gta-black">
              <div className="font-gta-condensed text-sm font-bold uppercase text-gta-orange">GRAND TOTAL</div>
              <div className="font-gta-hud text-3xl font-black text-gta-green mt-1">100 MARKS</div>
              <div className="text-[11px] text-gta-tan font-semibold">Evaluator Supervised</div>
            </div>
          </div>
        </div>

      </div>
    </PageContainer>
  );
}
