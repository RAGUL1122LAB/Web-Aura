/**
 * WEB AURA 2K26 - Team Management Service
 * 
 * Rules:
 * - Unique Team ID generated automatically (e.g. WA26-T001)
 * - Fixed team membership: normal participant cannot switch or leave team.
 * - Admin has authorized correction capability.
 */

import { MockStore } from '../firebase/mockStore';

export const teamService = {
  // Get all active teams
  getAllTeams() {
    return MockStore.getAllTeams();
  },

  // Get single team by ID
  getTeamById(teamId) {
    if (!teamId) return null;
    return MockStore.getTeam(teamId.trim().toUpperCase());
  },

  // Create team with unique ID
  createTeam(teamName, creatorUser) {
    if (!teamName || teamName.trim().length < 3) {
      throw new Error('Team name must be at least 3 characters.');
    }
    if (!creatorUser || !creatorUser.uid) {
      throw new Error('Authenticated user required to create a team.');
    }

    return MockStore.createTeam(teamName, creatorUser);
  },

  // Join existing team with validation
  joinTeam(teamId, user) {
    if (!teamId || !teamId.trim()) {
      throw new Error('Please enter a valid Team ID.');
    }
    const cleanId = teamId.trim().toUpperCase();
    const team = MockStore.getTeam(cleanId);
    
    if (!team) {
      throw new Error(`TEAM NOT FOUND. No team registered under ID: ${cleanId}`);
    }

    return MockStore.joinTeam(cleanId, user);
  },

  // Search teams by ID or Name (used by Evaluator and Admin)
  searchTeams(query) {
    if (!query || !query.trim()) {
      return MockStore.getAllTeams();
    }
    const q = query.toLowerCase().trim();
    return MockStore.getAllTeams().filter(t => 
      t.teamId.toLowerCase().includes(q) ||
      t.teamName.toLowerCase().includes(q)
    );
  },

  // Admin correction
  adminCorrectTeam(teamId, updates, adminUid) {
    return MockStore.adminUpdateTeam(teamId, updates, adminUid);
  }
};
