/**
 * WEB AURA 2K26 - Winner Service
 * 
 * Computes Top 3 squads from authentic scores and triggers broadcast.
 */

import { MockStore } from '../firebase/mockStore';
import { leaderboardService } from './leaderboardService';

export const winnerService = {
  // Get currently saved winners
  getWinners() {
    return MockStore.getWinners();
  },

  // Calculate top 3 based on current scores
  calculateTopThree() {
    const { teams } = leaderboardService.getLeaderboardData();
    // Filter teams that have competed and take top 3
    const sorted = [...teams].sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));
    return sorted.slice(0, 3).map((team, idx) => ({
      rank: idx + 1,
      teamId: team.teamId,
      teamName: team.teamName,
      finalScore: team.totalScore || 0,
      members: team.members || [],
      publishedAt: new Date().toISOString()
    }));
  },

  // Admin triggers the winner reveal
  triggerReveal() {
    const topThree = this.calculateTopThree();
    return MockStore.triggerWinnerReveal(topThree);
  }
};
