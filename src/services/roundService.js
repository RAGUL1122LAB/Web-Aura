/**
 * WEB AURA 2K26 - Round Service
 * 
 * AUTHORITATIVE ROUND STRUCTURE:
 * EXACTLY 2 Rounds.
 * Round 1: Presentation + Frontend (50 Marks, 5 Questions x 10 Marks)
 * Round 2: Backend + Database + Deployment (50 Marks, 5 Questions x 10 Marks)
 * Total: 100 Marks
 */

import { EVENT_CONFIG } from '../config/eventConfig';

export const roundService = {
  getRounds() {
    return EVENT_CONFIG.rounds;
  },

  getRoundById(roundId) {
    const rId = Number(roundId);
    return EVENT_CONFIG.rounds.find(r => r.id === rId) || null;
  }
};
