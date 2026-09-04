/**
 * WEB AURA 2K26 - Leaderboard Service
 * 
 * Computes live competition rankings (#1, #1, #3, #4) and masks scores
 * according to Admin eventSettings toggles.
 */

import { MockStore } from '../firebase/mockStore';
import { calculateCompetitionRankings } from '../utils/rankCalculator';

export const leaderboardService = {
  // Compute full leaderboard data
  getLeaderboardData() {
    const teams = MockStore.getAllTeams();
    const evaluations = MockStore.getAllEvaluations();
    const settings = MockStore.getEventSettings();

    // Map evaluations by team
    const teamStats = teams.map(team => {
      const teamEvals = evaluations.filter(e => e.teamId === team.teamId);
      const r1Eval = teamEvals.find(e => e.roundId === 1);
      const r2Eval = teamEvals.find(e => e.roundId === 2);

      const r1Score = r1Eval ? r1Eval.roundTotal : null;
      const r2Score = r2Eval ? r2Eval.roundTotal : null;
      
      let totalScore = null;
      if (r1Score !== null || r2Score !== null) {
        totalScore = (r1Score || 0) + (r2Score || 0);
      }

      return {
        teamId: team.teamId,
        teamName: team.teamName,
        members: team.members || [],
        memberCount: team.memberCount || 1,
        r1Score,
        r2Score,
        totalScore: totalScore ?? 0,
        hasScore: totalScore !== null,
        // Visibility-masked fields
        displayR1Score: settings.round1ScoreVisible ? r1Score : null,
        displayR2Score: settings.round2ScoreVisible ? r2Score : null,
        displayTotalScore: settings.totalScoreVisible ? totalScore : null,
      };
    });

    // Compute competition ranking based on totalScore
    const rankedTeams = calculateCompetitionRankings(teamStats, 'totalScore');

    return {
      settings,
      teams: rankedTeams
    };
  }
};
