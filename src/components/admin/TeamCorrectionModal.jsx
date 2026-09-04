/**
 * WEB AURA 2K26 - Admin Team Correction Tool
 * 
 * Rules:
 * - Normal participants have FIXED membership (no switch/leave)
 * - Admin has authorized correction capability to fix discrepancies
 */

import React, { useState } from 'react';
import { teamService } from '../../services/teamService';
import { soundEffects } from '../../utils/soundEffects';
import SanAndreasButton from '../common/SanAndreasButton';
import SanAndreasModal from '../common/SanAndreasModal';
import SanAndreasInput from '../common/SanAndreasInput';

export default function TeamCorrectionModal({ adminUid }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [feedback, setFeedback] = useState('');

  const teams = teamService.getAllTeams();

  const handleEdit = (team) => {
    soundEffects.playClick();
    setSelectedTeam(team);
    setNewTeamName(team.teamName);
    setFeedback('');
    setIsOpen(true);
  };

  const handleSaveCorrection = () => {
    if (!newTeamName.trim()) return;
    try {
      teamService.adminCorrectTeam(selectedTeam.teamId, {
        teamName: newTeamName.trim().toUpperCase()
      }, adminUid || 'admin_root');

      soundEffects.playRespect();
      setFeedback('✓ Team record successfully corrected.');
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    } catch (e) {
      setFeedback(e.message);
    }
  };

  return (
    <div className="border-3 border-gta-black bg-gta-beige p-4 gta-box-shadow select-none">
      <div className="bg-gta-black text-white p-3 border-b-3 border-gta-black flex items-center justify-between flex-wrap gap-2">
        <div>
          <h4 className="font-gta-condensed text-xl sm:text-2xl font-black uppercase text-white leading-none">
            TEAM ROSTER & ADMINISTRATIVE CORRECTIONS
          </h4>
          <p className="font-gta-condensed text-xs uppercase tracking-widest text-gta-orange mt-0.5">
            FIXED MEMBERSHIP OVERSIGHT
          </p>
        </div>
        <span className="text-xs bg-gta-orange text-gta-black font-bold px-2 py-0.5 uppercase">
          ADMIN TOOL
        </span>
      </div>

      <div className="p-3 sm:p-4 space-y-3">
        <p className="text-xs text-gta-brown font-semibold">
          Participant team memberships are fixed by design. Use this command table to review squads and perform authorized corrections.
        </p>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[500px] text-left font-gta-condensed border-collapse">
            <thead>
              <tr className="bg-gta-brown text-gta-tan-light text-base uppercase">
                <th className="p-2">TEAM ID</th>
                <th className="p-2">SQUAD NAME</th>
                <th className="p-2 text-center">MEMBERS</th>
                <th className="p-2 text-center">STATUS</th>
                <th className="p-2 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gta-black text-base font-bold">
              {teams.map((t) => (
                <tr key={t.teamId} className="hover:bg-white bg-gta-beige">
                  <td className="p-2 font-mono text-sm">{t.teamId}</td>
                  <td className="p-2 text-gta-black uppercase">{t.teamName}</td>
                  <td className="p-2 text-center font-mono">{t.memberCount || 1}</td>
                  <td className="p-2 text-center">
                    <span className="text-xs bg-gta-green text-gta-black px-1.5 py-0.5 font-mono font-bold">
                      {t.status || 'ACTIVE'}
                    </span>
                  </td>
                  <td className="p-2 text-right">
                    <SanAndreasButton
                      size="sm"
                      variant="orange"
                      onClick={() => handleEdit(t)}
                    >
                      CORRECT
                    </SanAndreasButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Correction Modal */}
      <SanAndreasModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="ADMIN TEAM CORRECTION"
        subtitle={selectedTeam?.teamId}
      >
        <div className="space-y-4">
          <SanAndreasInput
            label="Correct Team Name"
            id="correct-team-name"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
          />

          <div className="p-3 bg-gta-charcoal border-2 border-gta-black text-white text-xs font-mono">
            <p className="text-gta-orange font-bold mb-1">ROSTER AUDIT INFO:</p>
            <p>ID: {selectedTeam?.teamId}</p>
            <p>CREATOR: {selectedTeam?.creatorUid}</p>
            <p>MEMBERS: {selectedTeam?.members?.map(m => m.name).join(', ') || 'Lead'}</p>
          </div>

          {feedback && (
            <p className="text-xs font-bold text-gta-green uppercase tracking-wide">
              {feedback}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <SanAndreasButton
              variant="black"
              size="md"
              onClick={() => setIsOpen(false)}
            >
              CLOSE
            </SanAndreasButton>
            <SanAndreasButton
              variant="orange"
              size="md"
              onClick={handleSaveCorrection}
            >
              SAVE CORRECTION
            </SanAndreasButton>
          </div>
        </div>
      </SanAndreasModal>
    </div>
  );
}
