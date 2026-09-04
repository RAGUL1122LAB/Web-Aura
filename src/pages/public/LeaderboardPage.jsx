/**
 * WEB AURA 2K26 - Leaderboard Page
 * 
 * Rules:
 * - Shows live rankings via competition ranking (1, 1, 3, 4)
 * - Masks scores until enabled by Admin in eventSettings
 * - Shows San Andreas victory podium when winners are revealed
 */

import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import LeaderboardTable from '../../components/leaderboard/LeaderboardTable';
import PodiumBanner from '../../components/leaderboard/PodiumBanner';
import CountdownTimer from '../../components/public/CountdownTimer';
import { useEvent } from '../../context/EventContext';

export default function LeaderboardPage() {
  const { isLive } = useEvent();

  return (
    <PageContainer>
      <div className="space-y-6">
        
        {/* Victory Podium Banner (if revealed by Admin) */}
        <PodiumBanner />

        {/* If pre-event, show countdown timer at top */}
        {!isLive && (
          <CountdownTimer />
        )}

        {/* Official Squad Leaderboard Table */}
        <LeaderboardTable />

      </div>
    </PageContainer>
  );
}
