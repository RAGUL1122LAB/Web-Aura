/**
 * WEB AURA 2K26 - Evaluator Team Search
 * 
 * Features:
 * - Search by Team ID or Team Name
 * - Debounced input
 * - Distinct "TEAM NOT FOUND" San Andreas retro state
 */

import React, { useState, useEffect } from 'react';
import { teamService } from '../../services/teamService';
import SanAndreasInput from '../common/SanAndreasInput';
import SanAndreasButton from '../common/SanAndreasButton';

export default function TeamSearch({ onSelectTeam, selectedTeamId }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        const found = teamService.searchTeams(query);
        setResults(found);
        setHasSearched(true);
      } else {
        setResults(teamService.getAllTeams());
        setHasSearched(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Initial load
  useEffect(() => {
    setResults(teamService.getAllTeams());
  }, []);

  return (
    <div className="border-3 border-gta-black bg-gta-beige p-4 gta-box-shadow select-none">
      <div className="bg-gta-black text-white px-3 py-2 border-b-2 border-gta-black mb-3 flex items-center justify-between">
        <h4 className="font-gta-condensed text-xl font-bold uppercase tracking-wider text-gta-orange">
          SQUAD DISPATCH SCANNER
        </h4>
        <span className="text-xs font-mono text-gta-tan">
          {results.length} REGISTERED TEAMS
        </span>
      </div>

      {/* Search Input */}
      <div className="mb-3">
        <SanAndreasInput
          id="team-search"
          placeholder="SEARCH BY TEAM ID (e.g. WA26-T001) OR SQUAD NAME..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Results List or TEAM NOT FOUND state */}
      <div className="max-h-60 overflow-y-auto space-y-2">
        {results.length > 0 ? (
          results.map((team) => {
            const isSelected = selectedTeamId === team.teamId;
            return (
              <div
                key={team.teamId}
                onClick={() => onSelectTeam(team)}
                className={`
                  p-3 border-2 border-gta-black cursor-pointer flex items-center justify-between
                  transition-none select-none
                  ${isSelected ? 'bg-gta-orange text-gta-black font-black' : 'bg-white hover:bg-gta-tan-light text-gta-black'}
                `}
              >
                <div>
                  <div className="font-gta-condensed text-lg uppercase font-bold leading-tight">
                    {team.teamName}
                  </div>
                  <div className="font-mono text-xs text-gta-brown font-semibold">
                    ID: {team.teamId} • {team.memberCount || 1} MEMBERS
                  </div>
                </div>

                <SanAndreasButton
                  size="sm"
                  variant={isSelected ? 'black' : 'orange'}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTeam(team);
                  }}
                >
                  {isSelected ? 'ACTIVE SQUAD' : 'EVALUATE'}
                </SanAndreasButton>
              </div>
            );
          })
        ) : (
          /* San Andreas Themed "TEAM NOT FOUND" State */
          <div className="p-6 bg-gta-charcoal border-2 border-gta-red text-center text-white">
            <div className="font-gta-condensed font-black text-xs text-gta-orange tracking-widest mb-1">[SEARCH FAILED]</div>
            <h5 className="font-gta-condensed text-2xl font-black uppercase text-gta-red tracking-wider">
              TEAM NOT FOUND
            </h5>
            <p className="font-body text-xs text-gta-tan mt-1">
              No matching squad found for "{query}". Verify the exact Team ID or Team Name.
            </p>
            <button
              onClick={() => setQuery('')}
              className="mt-3 px-3 py-1 bg-gta-orange text-gta-black font-gta-condensed font-bold uppercase text-xs border border-black"
            >
              CLEAR SEARCH FILTER
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
