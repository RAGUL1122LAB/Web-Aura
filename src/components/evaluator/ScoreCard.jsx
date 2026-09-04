/**
 * WEB AURA 2K26 - Evaluator Score Card
 * 
 * Rules:
 * - Round 1: Presentation + Frontend (50 Marks, 5 Questions x 10 Marks)
 * - Round 2: Backend + Database + Deployment (50 Marks, 5 Questions x 10 Marks)
 * - Strict 0-10 validation, auto-sum, edit previously submitted scores
 */

import React, { useState, useEffect } from 'react';
import { roundService } from '../../services/roundService';
import { scoreService } from '../../services/scoreService';
import { soundEffects } from '../../utils/soundEffects';
import SanAndreasButton from '../common/SanAndreasButton';
import SanAndreasBadge from '../common/SanAndreasBadge';

export default function ScoreCard({ team, evaluatorId, onScoreSaved }) {
  const [activeRoundId, setActiveRoundId] = useState(1);
  const [questionScores, setQuestionScores] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: ''
  });
  const [errors, setErrors] = useState({});
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const rounds = roundService.getRounds();
  const currentRound = roundService.getRoundById(activeRoundId);

  // Load existing evaluation for selected team and round
  useEffect(() => {
    if (team) {
      const existing = scoreService.getEvaluationForRound(team.teamId, activeRoundId);
      if (existing && existing.questionScores) {
        setQuestionScores(existing.questionScores);
        setIsSaved(true);
      } else {
        setQuestionScores({ q1: '', q2: '', q3: '', q4: '', q5: '' });
        setIsSaved(false);
      }
      setErrors({});
      setFeedbackMsg('');
    }
  }, [team, activeRoundId]);

  if (!team) {
    return (
      <div className="border-3 border-gta-black bg-gta-beige p-8 text-center gta-box-shadow select-none">
        <div className="font-gta-condensed font-black text-xs text-gta-orange tracking-widest mb-2">[AWAITING SELECTION]</div>
        <h4 className="font-gta-condensed text-2xl font-black uppercase text-gta-black">
          SELECT A SQUAD TO EVALUATE
        </h4>
        <p className="text-sm font-semibold text-gta-brown mt-1">
          Use the Squad Dispatch Scanner on the left to select an active team for Round 1 or Round 2 evaluation.
        </p>
      </div>
    );
  }

  // Handle score input change with strict 0-10 validation
  const handleScoreChange = (qKey, value) => {
    // If empty, clear
    if (value === '') {
      setQuestionScores(prev => ({ ...prev, [qKey]: '' }));
      setErrors(prev => ({ ...prev, [qKey]: null }));
      return;
    }

    const num = Number(value);
    if (isNaN(num)) {
      setErrors(prev => ({ ...prev, [qKey]: 'Must be a number' }));
      return;
    }
    if (num < 0) {
      setErrors(prev => ({ ...prev, [qKey]: 'Cannot be negative' }));
      return;
    }
    if (num > 10) {
      setErrors(prev => ({ ...prev, [qKey]: 'Max is 10' }));
      return;
    }

    // Valid
    setErrors(prev => ({ ...prev, [qKey]: null }));
    setQuestionScores(prev => ({ ...prev, [qKey]: num }));
  };

  const calculatedTotal = scoreService.calculateRoundTotal(questionScores);

  const handleSubmit = (isDraft = false) => {
    // Validate all questions
    const validation = scoreService.validateAllQuestions(questionScores);
    if (!isDraft && !validation.isValid) {
      setErrors(validation.errors);
      soundEffects.playError();
      setFeedbackMsg('Please complete all 5 questions with valid marks (0-10).');
      return;
    }

    scoreService.saveEvaluation({
      teamId: team.teamId,
      roundId: activeRoundId,
      evaluatorId: evaluatorId || 'eval_jury',
      questionScores
    });

    soundEffects.playRespect();
    setIsSaved(true);
    setFeedbackMsg(`✓ Round ${activeRoundId} scores successfully submitted (${calculatedTotal}/50)!`);
    if (onScoreSaved) onScoreSaved();
  };

  return (
    <div className="border-3 border-gta-black bg-gta-beige gta-box-shadow select-none">
      {/* Target Squad Header Banner */}
      <div className="bg-gta-black text-white p-4 border-b-3 border-gta-black flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-gta-title text-2xl text-gta-orange">
              {team.teamName}
            </span>
            <span className="font-mono text-xs bg-gta-brown text-gta-tan px-2 py-0.5 border border-black">
              {team.teamId}
            </span>
          </div>
          <p className="text-xs font-semibold text-gta-gray-light uppercase mt-0.5">
            LEAD: {team.members?.[0]?.name || 'Captain'} • {team.memberCount || 1} MEMBERS
          </p>
        </div>

        {/* Round Tabs (Sharp Rectangles) */}
        <div className="flex items-center gap-2">
          {rounds.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                soundEffects.playClick();
                setActiveRoundId(r.id);
              }}
              className={`
                px-3 py-1.5 font-gta-condensed text-base font-bold uppercase border-2 border-gta-black
                ${activeRoundId === r.id ? 'bg-gta-orange text-gta-black' : 'bg-gta-dark text-gta-tan hover:bg-gta-brown'}
              `}
            >
              ROUND {r.id} (50)
            </button>
          ))}
        </div>
      </div>

      {/* Round Header & Info */}
      <div className="bg-gta-tan p-3 border-b-2 border-gta-black flex items-center justify-between flex-wrap gap-2">
        <div>
          <h4 className="font-gta-condensed text-xl font-black uppercase text-gta-black">
            {currentRound?.name}
          </h4>
          <p className="text-xs font-semibold text-gta-brown uppercase">
            {currentRound?.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-bold text-gta-black">ROUND TOTAL:</span>
          <div className="font-gta-hud text-3xl font-black text-gta-black bg-white px-3 py-0.5 border-2 border-gta-black">
            {calculatedTotal} / 50
          </div>
        </div>
      </div>

      {/* 5 Questions Rubric Form */}
      <div className="p-4 space-y-3">
        {currentRound?.questions.map((q, index) => {
          const scoreVal = questionScores[q.id];
          const hasError = errors[q.id];

          return (
            <div 
              key={q.id}
              className="p-3 bg-white border-2 border-gta-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-gta-condensed font-black text-lg uppercase text-gta-black">
                    {q.title}
                  </span>
                  <span className="text-xs font-bold text-gta-orange bg-gta-black px-1.5 py-0.5">
                    MAX 10
                  </span>
                </div>
                <p className="text-xs text-gta-brown font-medium mt-0.5">
                  {q.description}
                </p>
                {hasError && (
                  <p className="text-xs font-bold text-gta-red uppercase mt-1">
                    ⚠ {hasError}
                  </p>
                )}
              </div>

              {/* Score Input Box (0-10) */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="1"
                  value={scoreVal}
                  onChange={(e) => handleScoreChange(q.id, e.target.value)}
                  placeholder="0-10"
                  className={`
                    w-20 px-2 py-1.5 font-gta-hud text-2xl font-black text-center border-2 border-gta-black
                    focus:outline-none focus:bg-gta-cream
                    ${hasError ? 'border-gta-red bg-red-50 text-gta-red' : 'bg-gta-beige text-gta-black'}
                  `}
                />
                <span className="font-gta-condensed font-bold text-sm text-gta-brown">/ 10</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div className="mx-4 mb-3 p-2.5 bg-gta-black text-gta-orange border-2 border-gta-orange font-gta-condensed text-base font-bold uppercase tracking-wider text-center">
          {feedbackMsg}
        </div>
      )}

      {/* Action Buttons (Save Draft, Submit Evaluation) */}
      <div className="p-4 bg-gta-tan-light border-t-3 border-gta-black flex items-center justify-between flex-wrap gap-3">
        <div className="text-xs font-bold uppercase text-gta-brown">
          {isSaved ? '★ Previously Submitted — You can update marks anytime' : '★ Ready for evaluation entry'}
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap w-full sm:w-auto">
          <SanAndreasButton
            variant="tan"
            size="md"
            onClick={() => handleSubmit(true)}
            className="w-full sm:w-auto justify-center"
          >
            SAVE DRAFT
          </SanAndreasButton>
          <SanAndreasButton
            variant="orange"
            size="md"
            onClick={() => handleSubmit(false)}
            className="w-full sm:w-auto justify-center"
          >
            SUBMIT EVALUATION ({calculatedTotal}/50)
          </SanAndreasButton>
        </div>
      </div>
    </div>
  );
}
