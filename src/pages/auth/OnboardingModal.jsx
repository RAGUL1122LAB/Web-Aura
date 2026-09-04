/**
 * WEB AURA 2K26 - Participant Onboarding Modal
 * 
 * Rules:
 * - Collects profile info (Department, Year, Phone)
 * - Offers:
 *   1. CREATE TEAM (System generates unique Team ID e.g. WA26-T001)
 *   2. JOIN TEAM (Validates Team ID, shows squad details, confirms join)
 * - Fixed team membership upon completion
 */

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { teamService } from '../../services/teamService';
import { userService } from '../../services/userService';
import { soundEffects } from '../../utils/soundEffects';
import SanAndreasInput from '../../components/common/SanAndreasInput';
import SanAndreasButton from '../../components/common/SanAndreasButton';

export default function OnboardingModal({ isOpen, onComplete }) {
  const { currentUser, refreshUser } = useAuth();

  const [step, setStep] = useState('PROFILE'); // 'PROFILE' | 'TEAM_CHOICE' | 'CREATE_TEAM' | 'JOIN_TEAM'
  
  // Profile fields
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [year, setYear] = useState('3rd Year');
  const [phone, setPhone] = useState('');
  
  // Team fields
  const [teamName, setTeamName] = useState('');
  const [teamIdInput, setTeamIdInput] = useState('');
  const [foundTeam, setFoundTeam] = useState(null);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Handle Profile Submission -> Move to Team Choice
  const handleProfileNext = (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError('Please provide a contact phone number for squad coordination.');
      soundEffects.playError();
      return;
    }
    setError('');
    soundEffects.playClick();
    setStep('TEAM_CHOICE');
  };

  // Handle Create Team
  const handleCreateTeamSubmit = async (e) => {
    e.preventDefault();
    if (!teamName.trim() || teamName.trim().length < 3) {
      setError('Team name must be at least 3 characters.');
      soundEffects.playError();
      return;
    }

    try {
      setLoading(true);
      setError('');
      // Save profile info first
      userService.updateProfile(currentUser.uid, { department, year, phone });
      
      // Create team
      const newTeam = teamService.createTeam(teamName, currentUser);
      soundEffects.playMissionPassed();
      
      refreshUser();
      if (onComplete) onComplete(newTeam);
    } catch (err) {
      setError(err.message || 'Failed to create team.');
      soundEffects.playError();
    } finally {
      setLoading(false);
    }
  };

  // Handle Join Team Search & Confirm
  const handleSearchTeam = () => {
    if (!teamIdInput.trim()) {
      setError('Enter a Team ID to search.');
      soundEffects.playError();
      return;
    }
    try {
      const cleanId = teamIdInput.trim().toUpperCase();
      const team = teamService.getTeamById(cleanId);
      if (!team) {
        setError(`TEAM NOT FOUND. No squad registered with ID: ${cleanId}`);
        setFoundTeam(null);
        soundEffects.playError();
        return;
      }
      setError('');
      setFoundTeam(team);
      soundEffects.playClick();
    } catch (err) {
      setError(err.message);
      soundEffects.playError();
    }
  };

  const handleConfirmJoin = async () => {
    if (!foundTeam) return;
    try {
      setLoading(true);
      setError('');
      userService.updateProfile(currentUser.uid, { department, year, phone });
      const joined = teamService.joinTeam(foundTeam.teamId, currentUser);
      soundEffects.playRespect();
      refreshUser();
      if (onComplete) onComplete(joined);
    } catch (err) {
      setError(err.message || 'Failed to join team.');
      soundEffects.playError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 select-none">
      <div className="w-full max-w-lg bg-gta-beige border-4 border-gta-black gta-box-shadow-lg">
        {/* Header */}
        <div className="bg-gta-black text-white p-4 border-b-3 border-gta-black flex items-center justify-between">
          <div>
            <span className="text-[10px] bg-gta-orange text-gta-black font-bold px-1.5 py-0.5 uppercase tracking-wider">
              NEW RECRUIT REGISTRATION
            </span>
            <h3 className="font-gta-condensed text-2xl sm:text-3xl font-black uppercase text-white mt-0.5 leading-none">
              PARTICIPANT ONBOARDING
            </h3>
          </div>
          <span className="text-2xl">🌴</span>
        </div>

        <div className="p-5">
          {error && (
            <div className="p-3 mb-4 bg-red-100 border-2 border-gta-red text-gta-red font-gta-condensed text-sm font-bold uppercase tracking-wider">
              ⚠ {error}
            </div>
          )}

          {/* STEP 1: Profile Info */}
          {step === 'PROFILE' && (
            <form onSubmit={handleProfileNext} className="space-y-4">
              <p className="text-xs text-gta-brown font-semibold leading-relaxed">
                Welcome to WEB AURA 2K26, <strong>{currentUser?.name}</strong>! Let's set up your participant credentials before team assignment.
              </p>

              <SanAndreasInput
                label="Department"
                id="onboard-dept"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />

              <div className="flex flex-col gap-1.5">
                <label className="font-gta-condensed uppercase tracking-wider text-base font-bold text-gta-black">
                  Year of Study
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white text-gta-black font-semibold text-base border-3 border-gta-black focus:outline-none"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>

              <SanAndreasInput
                label="Contact Phone Number"
                id="onboard-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                required
              />

              <div className="pt-2">
                <SanAndreasButton
                  type="submit"
                  variant="orange"
                  size="lg"
                  className="w-full"
                >
                  NEXT: SQUAD SETUP →
                </SanAndreasButton>
              </div>
            </form>
          )}

          {/* STEP 2: Team Choice */}
          {step === 'TEAM_CHOICE' && (
            <div className="space-y-4 text-center">
              <h4 className="font-gta-condensed text-2xl font-black uppercase text-gta-black">
                SELECT YOUR SQUAD PATH
              </h4>
              <p className="text-xs text-gta-brown font-semibold max-w-sm mx-auto">
                Every participant must be associated with an official squad for Round 1 & Round 2 evaluations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Create Team Option */}
                <div 
                  onClick={() => { soundEffects.playClick(); setStep('CREATE_TEAM'); }}
                  className="p-5 border-3 border-gta-black bg-white hover:bg-gta-tan-light cursor-pointer text-left gta-box-shadow-sm transition-none"
                >
                  <div className="text-3xl mb-2">⭐</div>
                  <h5 className="font-gta-condensed text-xl font-black uppercase text-gta-black">
                    CREATE NEW TEAM
                  </h5>
                  <p className="text-xs text-gta-brown font-medium mt-1">
                    Found a squad, get an auto-generated unique Team ID (e.g. WA26-T001), and invite members.
                  </p>
                  <div className="mt-3">
                    <span className="text-xs bg-gta-black text-gta-orange font-gta-condensed font-bold px-2 py-1 uppercase">
                      [ BECOME SQUAD LEAD ]
                    </span>
                  </div>
                </div>

                {/* Join Team Option */}
                <div 
                  onClick={() => { soundEffects.playClick(); setStep('JOIN_TEAM'); }}
                  className="p-5 border-3 border-gta-black bg-white hover:bg-gta-tan-light cursor-pointer text-left gta-box-shadow-sm transition-none"
                >
                  <div className="text-3xl mb-2">🤝</div>
                  <h5 className="font-gta-condensed text-xl font-black uppercase text-gta-black">
                    JOIN EXISTING TEAM
                  </h5>
                  <p className="text-xs text-gta-brown font-medium mt-1">
                    Have a Team ID from your leader? Enter the code to join your squad roster.
                  </p>
                  <div className="mt-3">
                    <span className="text-xs bg-gta-orange text-gta-black font-gta-condensed font-bold px-2 py-1 uppercase border border-black">
                      [ ENTER SQUAD ID ]
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep('PROFILE')}
                  className="text-xs font-bold text-gta-brown uppercase hover:underline"
                >
                  ← BACK TO PROFILE INFO
                </button>
              </div>
            </div>
          )}

          {/* STEP 3A: Create Team */}
          {step === 'CREATE_TEAM' && (
            <form onSubmit={handleCreateTeamSubmit} className="space-y-4">
              <h4 className="font-gta-condensed text-2xl font-black uppercase text-gta-black">
                CREATE SQUAD
              </h4>
              <p className="text-xs text-gta-brown font-semibold">
                Enter your official squad name. The system will automatically generate your authoritative Team ID.
              </p>

              <SanAndreasInput
                label="Squad / Team Name"
                id="create-team-name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. GROVE DEVELOPERS"
                required
              />

              <div className="p-3 bg-gta-charcoal border-2 border-gta-black text-white text-xs font-mono">
                <p className="text-gta-orange font-bold">★ MEMBERSHIP NOTICE:</p>
                <p>Team membership is fixed once created. You will represent this squad for both Round 1 & Round 2.</p>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <SanAndreasButton
                  type="button"
                  variant="black"
                  size="md"
                  onClick={() => setStep('TEAM_CHOICE')}
                >
                  BACK
                </SanAndreasButton>

                <SanAndreasButton
                  type="submit"
                  variant="orange"
                  size="lg"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'INITIALIZING SQUAD...' : '★ CONFIRM & LAUNCH SQUAD ★'}
                </SanAndreasButton>
              </div>
            </form>
          )}

          {/* STEP 3B: Join Team */}
          {step === 'JOIN_TEAM' && (
            <div className="space-y-4">
              <h4 className="font-gta-condensed text-2xl font-black uppercase text-gta-black">
                JOIN SQUAD
              </h4>
              <p className="text-xs text-gta-brown font-semibold">
                Enter the exact Team ID provided by your Squad Lead (e.g. WA26-T001).
              </p>

              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <SanAndreasInput
                    label="Team ID"
                    id="join-team-id"
                    value={teamIdInput}
                    onChange={(e) => setTeamIdInput(e.target.value)}
                    placeholder="WA26-T..."
                  />
                </div>
                <SanAndreasButton
                  type="button"
                  variant="orange"
                  size="md"
                  onClick={handleSearchTeam}
                >
                  VALIDATE
                </SanAndreasButton>
              </div>

              {/* Verified Team Card */}
              {foundTeam && (
                <div className="p-4 bg-white border-3 border-gta-green space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-gta-green text-gta-black font-black px-1.5 py-0.5 uppercase">
                      ✓ SQUAD VERIFIED
                    </span>
                    <span className="font-mono text-sm font-bold text-gta-black">
                      {foundTeam.teamId}
                    </span>
                  </div>
                  <h5 className="font-gta-condensed text-2xl font-black uppercase text-gta-black">
                    {foundTeam.teamName}
                  </h5>
                  <div className="text-xs text-gta-brown">
                    <strong>Current Members:</strong> {foundTeam.members?.map(m => m.name).join(', ') || 'Lead'}
                  </div>

                  <div className="pt-2">
                    <SanAndreasButton
                      type="button"
                      variant="green"
                      size="lg"
                      onClick={handleConfirmJoin}
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? 'JOINING...' : '★ CONFIRM MEMBERSHIP & JOIN SQUAD ★'}
                    </SanAndreasButton>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep('TEAM_CHOICE')}
                  className="text-xs font-bold text-gta-brown uppercase hover:underline"
                >
                  ← BACK TO SELECTION
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
