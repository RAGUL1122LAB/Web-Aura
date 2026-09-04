/**
 * WEB AURA 2K26 - Mock Real-time Store
 * 
 * Provides full reactive real-time database capabilities, local persistence,
 * PubSub broadcasting, and seed data.
 * Used automatically when Firebase environment credentials are not supplied,
 * or as a robust offline test harness.
 */

import { EVENT_CONFIG } from '../config/eventConfig';

const STORAGE_KEY = 'web_aura_2k26_data_v1';
const LISTENERS = new Set();

const SEED_DATA = {
  users: {
    'admin_root': {
      uid: 'admin_root',
      name: 'System Administrator',
      email: 'admin@webaura.internal',
      role: 'ADMIN',
      profileComplete: true,
      teamId: null,
      createdAt: '2026-09-01T00:00:00Z',
      updatedAt: '2026-09-01T00:00:00Z'
    },
    'eval_chief': {
      uid: 'eval_chief',
      name: 'Senior Jury Evaluator',
      email: 'evaluator@webaura.internal',
      role: 'EVALUATOR',
      profileComplete: true,
      teamId: null,
      createdAt: '2026-09-01T00:00:00Z',
      updatedAt: '2026-09-01T00:00:00Z'
    },
    'part_cj': {
      uid: 'part_cj',
      name: 'Carl Johnson',
      email: 'participant@webaura.internal',
      role: 'PARTICIPANT',
      profileComplete: true,
      teamId: 'WA26-T001',
      createdAt: '2026-09-01T00:00:00Z',
      updatedAt: '2026-09-01T00:00:00Z'
    }
  },
  teams: {
    'WA26-T001': {
      teamId: 'WA26-T001',
      teamName: 'GROVE ENGINES',
      creatorUid: 'part_cj',
      memberUids: ['part_cj'],
      members: [
        { uid: 'part_cj', name: 'Carl Johnson', email: 'participant@webaura.internal', role: 'Team Lead' },
        { uid: 'p_sweet', name: 'Sweet Johnson', email: 'sweet@grove.internal', role: 'Member' }
      ],
      memberCount: 2,
      createdAt: '2026-09-01T10:00:00Z',
      updatedAt: '2026-09-01T10:00:00Z',
      status: 'ACTIVE'
    },
    'WA26-T002': {
      teamId: 'WA26-T002',
      teamName: 'SAN FIERRO COMPILES',
      creatorUid: 'p_wu',
      memberUids: ['p_wu'],
      members: [
        { uid: 'p_wu', name: 'Wu Zi Mu', email: 'wuzi@triads.internal', role: 'Team Lead' },
        { uid: 'p_guppy', name: 'Little Lion', email: 'lion@triads.internal', role: 'Member' }
      ],
      memberCount: 2,
      createdAt: '2026-09-01T11:00:00Z',
      updatedAt: '2026-09-01T11:00:00Z',
      status: 'ACTIVE'
    },
    'WA26-T003': {
      teamId: 'WA26-T003',
      teamName: 'LAS VENTURAS ALGORITHMS',
      creatorUid: 'p_madd',
      memberUids: ['p_madd'],
      members: [
        { uid: 'p_madd', name: 'Madd Dogg', email: 'madd@rhymes.internal', role: 'Team Lead' }
      ],
      memberCount: 1,
      createdAt: '2026-09-01T12:00:00Z',
      updatedAt: '2026-09-01T12:00:00Z',
      status: 'ACTIVE'
    },
    'WA26-T004': {
      teamId: 'WA26-T004',
      teamName: 'RED COUNTY SCRIPTING',
      creatorUid: 'p_catalina',
      memberUids: ['p_catalina'],
      members: [
        { uid: 'p_catalina', name: 'Catalina Vargas', email: 'cat@fernbrook.internal', role: 'Team Lead' }
      ],
      memberCount: 1,
      createdAt: '2026-09-01T13:00:00Z',
      updatedAt: '2026-09-01T13:00:00Z',
      status: 'ACTIVE'
    }
  },
  evaluations: {
    'eval_WA26-T001_r1': {
      id: 'eval_WA26-T001_r1',
      teamId: 'WA26-T001',
      roundId: 1,
      evaluatorId: 'eval_chief',
      questionScores: { q1: 10, q2: 10, q3: 9, q4: 10, q5: 9 },
      roundTotal: 48,
      updatedAt: '2026-09-04T10:00:00Z'
    },
    'eval_WA26-T001_r2': {
      id: 'eval_WA26-T001_r2',
      teamId: 'WA26-T001',
      roundId: 2,
      evaluatorId: 'eval_chief',
      questionScores: { q1: 10, q2: 10, q3: 10, q4: 10, q5: 9 },
      roundTotal: 49,
      updatedAt: '2026-09-04T10:15:00Z'
    },
    'eval_WA26-T002_r1': {
      id: 'eval_WA26-T002_r1',
      teamId: 'WA26-T002',
      roundId: 1,
      evaluatorId: 'eval_chief',
      questionScores: { q1: 10, q2: 10, q3: 10, q4: 10, q5: 9 },
      roundTotal: 49,
      updatedAt: '2026-09-04T10:20:00Z'
    },
    'eval_WA26-T002_r2': {
      id: 'eval_WA26-T002_r2',
      teamId: 'WA26-T002',
      roundId: 2,
      evaluatorId: 'eval_chief',
      questionScores: { q1: 10, q2: 9, q3: 10, q4: 10, q5: 9 },
      roundTotal: 48,
      updatedAt: '2026-09-04T10:25:00Z'
    },
    'eval_WA26-T003_r1': {
      id: 'eval_WA26-T003_r1',
      teamId: 'WA26-T003',
      roundId: 1,
      evaluatorId: 'eval_chief',
      questionScores: { q1: 9, q2: 9, q3: 9, q4: 10, q5: 9 },
      roundTotal: 46,
      updatedAt: '2026-09-04T10:30:00Z'
    },
    'eval_WA26-T003_r2': {
      id: 'eval_WA26-T003_r2',
      teamId: 'WA26-T003',
      roundId: 2,
      evaluatorId: 'eval_chief',
      questionScores: { q1: 9, q2: 9, q3: 9, q4: 9, q5: 9 },
      roundTotal: 45,
      updatedAt: '2026-09-04T10:35:00Z'
    },
    'eval_WA26-T004_r1': {
      id: 'eval_WA26-T004_r1',
      teamId: 'WA26-T004',
      roundId: 1,
      evaluatorId: 'eval_chief',
      questionScores: { q1: 8, q2: 8, q3: 9, q4: 8, q5: 9 },
      roundTotal: 42,
      updatedAt: '2026-09-04T10:40:00Z'
    },
    'eval_WA26-T004_r2': {
      id: 'eval_WA26-T004_r2',
      teamId: 'WA26-T004',
      roundId: 2,
      evaluatorId: 'eval_chief',
      questionScores: { q1: 8, q2: 9, q3: 8, q4: 9, q5: 9 },
      roundTotal: 43,
      updatedAt: '2026-09-04T10:45:00Z'
    }
  },
  eventSettings: {
    eventStartAt: EVENT_CONFIG.eventStartIso,
    eventState: 'PRE_EVENT', // PRE_EVENT, LIVE, COMPLETED, WINNER_REVEALED
    participantLeaderboardVisible: true,
    round1ScoreVisible: false,
    round2ScoreVisible: false,
    totalScoreVisible: false,
    winnerRevealActive: false,
    winnerRevealAt: null
  },
  winners: [],
  teamChangeAudit: []
};

// Initialize or load state
function getDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
      return JSON.parse(JSON.stringify(SEED_DATA));
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading mock database:', e);
    return JSON.parse(JSON.stringify(SEED_DATA));
  }
}

function saveDb(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    notifyListeners();
  } catch (e) {
    console.error('Error saving mock database:', e);
  }
}

function notifyListeners() {
  const currentDb = getDb();
  LISTENERS.forEach(callback => {
    try {
      callback(currentDb);
    } catch (e) {
      console.error('Listener callback error:', e);
    }
  });
}

// Cross-tab synchronization
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      notifyListeners();
    }
  });
}

export const MockStore = {
  subscribe(callback) {
    LISTENERS.add(callback);
    callback(getDb());
    return () => LISTENERS.delete(callback);
  },

  getData() {
    return getDb();
  },

  resetToSeed() {
    saveDb(SEED_DATA);
    return SEED_DATA;
  },

  // USERS
  getUser(uid) {
    const db = getDb();
    return db.users[uid] || null;
  },

  getUserByEmail(email) {
    const db = getDb();
    const cleanEmail = email.toLowerCase().trim();
    return Object.values(db.users).find(u => u.email.toLowerCase() === cleanEmail) || null;
  },

  saveUser(user) {
    const db = getDb();
    const existing = db.users[user.uid] || {};
    const updated = {
      ...existing,
      ...user,
      updatedAt: new Date().toISOString()
    };
    db.users[user.uid] = updated;
    saveDb(db);
    return updated;
  },

  // TEAMS
  getAllTeams() {
    const db = getDb();
    return Object.values(db.teams);
  },

  getTeam(teamId) {
    const db = getDb();
    return db.teams[teamId] || null;
  },

  createTeam(teamName, creatorUser) {
    const db = getDb();
    // Generate unique ID in pattern WA26-T001...
    const count = Object.keys(db.teams).length + 1;
    const teamId = `WA26-T${String(count).padStart(3, '0')}`;

    const newTeam = {
      teamId,
      teamName: teamName.trim().toUpperCase(),
      creatorUid: creatorUser.uid,
      memberUids: [creatorUser.uid],
      members: [
        {
          uid: creatorUser.uid,
          name: creatorUser.name || 'Anonymous Leader',
          email: creatorUser.email,
          role: 'Team Lead'
        }
      ],
      memberCount: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'ACTIVE'
    };

    db.teams[teamId] = newTeam;
    
    // Associate user
    if (db.users[creatorUser.uid]) {
      db.users[creatorUser.uid].teamId = teamId;
      db.users[creatorUser.uid].profileComplete = true;
      db.users[creatorUser.uid].updatedAt = new Date().toISOString();
    }

    saveDb(db);
    return newTeam;
  },

  joinTeam(teamId, user) {
    const db = getDb();
    const team = db.teams[teamId];
    if (!team) {
      throw new Error('TEAM NOT FOUND. Verify the Team ID.');
    }

    if (!team.memberUids.includes(user.uid)) {
      team.memberUids.push(user.uid);
      team.members.push({
        uid: user.uid,
        name: user.name || 'Team Member',
        email: user.email,
        role: 'Member'
      });
      team.memberCount = team.memberUids.length;
      team.updatedAt = new Date().toISOString();
    }

    if (db.users[user.uid]) {
      db.users[user.uid].teamId = teamId;
      db.users[user.uid].profileComplete = true;
      db.users[user.uid].updatedAt = new Date().toISOString();
    }

    saveDb(db);
    return team;
  },

  // EVALUATIONS
  getEvaluationsForTeam(teamId) {
    const db = getDb();
    return Object.values(db.evaluations).filter(e => e.teamId === teamId);
  },

  getAllEvaluations() {
    const db = getDb();
    return Object.values(db.evaluations);
  },

  saveEvaluation({ teamId, roundId, evaluatorId, questionScores, roundTotal }) {
    const db = getDb();
    const evalId = `eval_${teamId}_r${roundId}`;
    
    db.evaluations[evalId] = {
      id: evalId,
      teamId,
      roundId: Number(roundId),
      evaluatorId,
      questionScores,
      roundTotal,
      updatedAt: new Date().toISOString()
    };

    saveDb(db);
    return db.evaluations[evalId];
  },

  // EVENT SETTINGS
  getEventSettings() {
    const db = getDb();
    return db.eventSettings;
  },

  updateEventSettings(updates) {
    const db = getDb();
    db.eventSettings = {
      ...db.eventSettings,
      ...updates
    };
    saveDb(db);
    return db.eventSettings;
  },

  // WINNERS
  getWinners() {
    const db = getDb();
    return db.winners || [];
  },

  triggerWinnerReveal(topThree) {
    const db = getDb();
    db.winners = topThree;
    db.eventSettings.winnerRevealActive = true;
    db.eventSettings.winnerRevealAt = new Date().toISOString();
    db.eventSettings.eventState = 'WINNER_REVEALED';
    saveDb(db);
    return topThree;
  },

  // ADMIN TEAM CORRECTION
  adminUpdateTeam(teamId, updates, adminUid) {
    const db = getDb();
    if (!db.teams[teamId]) {
      throw new Error('Team does not exist');
    }
    db.teams[teamId] = {
      ...db.teams[teamId],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    db.teamChangeAudit.push({
      auditId: `audit_${Date.now()}`,
      performedByAdminUid: adminUid,
      teamId,
      updates,
      timestamp: new Date().toISOString()
    });

    saveDb(db);
    return db.teams[teamId];
  }
};
