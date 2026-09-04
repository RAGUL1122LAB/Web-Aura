/**
 * WEB AURA 2K26 - Admin Winner Reveal Trigger & Modal
 * 
 * Rules:
 * - Explicit Admin confirmation dialog
 * - Calculates Top 3 squads from authentic scores
 * - Writes winner reveal state with server timestamp
 * - Broadcasts to all connected clients
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useEvent } from '../../context/EventContext';
import SanAndreasButton from '../common/SanAndreasButton';
import SanAndreasModal from '../common/SanAndreasModal';
import { soundEffects } from '../../utils/soundEffects';

export default function WinnerRevealModal() {
  const { isWinnerRevealed, triggerWinnerReveal } = useEvent();
  const [modalOpen, setModalOpen] = useState(false);
  const [broadcasting, setBroadcasting] = useState(false);

  const handleOpenConfirm = () => {
    soundEffects.playClick();
    setModalOpen(true);
  };

  const handleConfirmReveal = () => {
    setBroadcasting(true);
    soundEffects.playMissionPassed();

    // Trigger canvas confetti (sharp 2004 victory burst)
    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#EA7A00', '#F58A07', '#2ECC71', '#000000', '#FFFFFF']
      });
    } catch (e) {}

    triggerWinnerReveal();
    setBroadcasting(false);
    setModalOpen(false);
  };

  return (
    <div className="border-3 border-gta-black bg-gta-beige p-4 gta-box-shadow select-none">
      <div className="bg-gta-black text-white p-3 border-b-3 border-gta-black flex items-center justify-between flex-wrap gap-2">
        <div>
          <h4 className="font-gta-condensed text-xl sm:text-2xl font-black uppercase text-white leading-none">
            PODIUM BROADCAST & WINNER REVEAL
          </h4>
          <p className="font-gta-condensed text-xs uppercase tracking-widest text-gta-orange mt-0.5">
            GRAND FINALE VICTORY SYSTEM
          </p>
        </div>
        <span className="text-xs bg-gta-red text-white font-bold px-2 py-0.5 uppercase">
          LIVE BROADCAST
        </span>
      </div>

      <div className="p-4 space-y-3">
        <p className="text-xs text-gta-brown font-semibold">
          Triggering the Winner Reveal automatically computes the authentic top three squads from verified evaluator marks and activates the San Andreas podium ceremony across all participant and spectator screens simultaneously.
        </p>

        <div className="p-3 bg-white border-2 border-gta-black flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="font-gta-condensed text-lg font-black uppercase text-gta-black">
              STATUS: {isWinnerRevealed ? '[LIVE] WINNERS ARE LIVE ON AIR' : '[LOCKED] WINNERS UNREVEALED'}
            </div>
            <p className="text-xs text-gta-brown">
              {isWinnerRevealed 
                ? 'All clients have transitioned to the San Andreas victory screen.' 
                : 'Awaiting Admin authorization to trigger victory reveal.'}
            </p>
          </div>

          <SanAndreasButton
            variant={isWinnerRevealed ? 'green' : 'red'}
            size="lg"
            onClick={handleOpenConfirm}
          >
            {isWinnerRevealed ? '★ RE-BROADCAST WINNERS ★' : '★ TRIGGER WINNER REVEAL ★'}
          </SanAndreasButton>
        </div>
      </div>

      {/* Confirmation Modal */}
      <SanAndreasModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="CONFIRM PODIUM BROADCAST"
        subtitle="SAN ANDREAS GRAND FINALE"
      >
        <div className="space-y-4">
          <div className="p-3 bg-amber-100 border-2 border-gta-black text-gta-black">
            <h5 className="font-gta-condensed font-black text-xl uppercase mb-1">
              ⚠ BROADCAST IMPACT WARNING
            </h5>
            <p className="text-xs font-semibold leading-relaxed">
              This action will instantly calculate the official Top 3 squads and broadcast the San Andreas victory podium to all connected participants, evaluators, and spectator displays in real time.
            </p>
          </div>

          <p className="text-xs text-gta-brown font-semibold">
            Are you sure you want to trigger the winner reveal now?
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <SanAndreasButton
              variant="black"
              size="md"
              onClick={() => setModalOpen(false)}
            >
              CANCEL
            </SanAndreasButton>
            <SanAndreasButton
              variant="red"
              size="md"
              onClick={handleConfirmReveal}
              disabled={broadcasting}
            >
              {broadcasting ? 'BROADCASTING...' : 'YES, TRIGGER REVEAL NOW'}
            </SanAndreasButton>
          </div>
        </div>
      </SanAndreasModal>
    </div>
  );
}
