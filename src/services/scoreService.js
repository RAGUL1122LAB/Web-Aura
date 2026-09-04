/**
 * WEB AURA 2K26 - Score Service
 * 
 * Rules:
 * - 0 to 10 marks per question
 * - Reject negative or >10 numbers
 * - Auto-calculate Round Total (max 50)
 * - Evaluator can save draft or submit evaluation, and edit previously submitted scores
 */

import { MockStore } from '../firebase/mockStore';

export const scoreService = {
  // Validate individual question score
  validateQuestionScore(value) {
    if (value === '' || value === null || value === undefined) {
      return { valid: false, error: 'Question score cannot be blank' };
    }
    const num = Number(value);
    if (isNaN(num)) {
      return { valid: false, error: 'Score must be a valid number' };
    }
    if (num < 0) {
      return { valid: false, error: 'Score cannot be negative' };
    }
    if (num > 10) {
      return { valid: false, error: 'Maximum score per question is 10' };
    }
    return { valid: true, value: num };
  },

  // Calculate total for 5 questions
  calculateRoundTotal(questionScores) {
    let total = 0;
    for (let i = 1; i <= 5; i++) {
      const qKey = `q${i}`;
      const val = Number(questionScores[qKey]);
      if (!isNaN(val) && val >= 0 && val <= 10) {
        total += val;
      }
    }
    return Math.min(total, 50);
  },

  // Validate all 5 questions
  validateAllQuestions(questionScores) {
    const errors = {};
    let isComplete = true;

    for (let i = 1; i <= 5; i++) {
      const qKey = `q${i}`;
      const validation = this.validateQuestionScore(questionScores[qKey]);
      if (!validation.valid) {
        errors[qKey] = validation.error;
        isComplete = false;
      }
    }

    return { isValid: isComplete, errors };
  },

  // Get evaluations for a team
  getTeamEvaluations(teamId) {
    return MockStore.getEvaluationsForTeam(teamId);
  },

  // Get specific round evaluation for a team
  getEvaluationForRound(teamId, roundId) {
    const evals = MockStore.getEvaluationsForTeam(teamId);
    return evals.find(e => e.roundId === Number(roundId)) || null;
  },

  // Save/Submit evaluation
  saveEvaluation({ teamId, roundId, evaluatorId, questionScores }) {
    const roundTotal = this.calculateRoundTotal(questionScores);
    return MockStore.saveEvaluation({
      teamId,
      roundId: Number(roundId),
      evaluatorId,
      questionScores,
      roundTotal
    });
  }
};
