/**
 * WEB AURA 2K26 - Event State & Settings Service
 */

import { MockStore } from '../firebase/mockStore';
import { EVENT_CONFIG } from '../config/eventConfig';

export const eventService = {
  getSettings() {
    return MockStore.getEventSettings();
  },

  // Calculate dynamic event state based on authoritative date/time & manual overrides
  getCurrentStatus() {
    const settings = MockStore.getEventSettings();
    const eventStartTime = new Date(EVENT_CONFIG.eventStartIso).getTime();
    const now = Date.now();

    // If Admin explicitly set state to WINNER_REVEALED or COMPLETED, honor it
    if (settings.eventState === 'WINNER_REVEALED') return 'WINNER_REVEALED';
    if (settings.eventState === 'COMPLETED') return 'COMPLETED';

    // Check if event start time (7 Sept 2026, 9:00 AM) has passed
    if (now >= eventStartTime) {
      return 'LIVE';
    }

    return settings.eventState || 'PRE_EVENT';
  },

  // Admin controls score visibility
  updateScoreVisibility({ round1, round2, total }) {
    const updates = {};
    if (round1 !== undefined) updates.round1ScoreVisible = Boolean(round1);
    if (round2 !== undefined) updates.round2ScoreVisible = Boolean(round2);
    if (total !== undefined) updates.totalScoreVisible = Boolean(total);
    return MockStore.updateEventSettings(updates);
  },

  // Admin sets event state manually
  setEventState(newState) {
    return MockStore.updateEventSettings({ eventState: newState });
  }
};
