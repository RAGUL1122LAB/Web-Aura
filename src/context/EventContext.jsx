/**
 * WEB AURA 2K26 - Real-time Event Context
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MockStore } from '../firebase/mockStore';
import { leaderboardService } from '../services/leaderboardService';
import { eventService } from '../services/eventService';
import { winnerService } from '../services/winnerService';
import { soundEffects } from '../utils/soundEffects';

const EventContext = createContext(null);

export function EventProvider({ children }) {
  const [settings, setSettings] = useState(MockStore.getEventSettings());
  const [leaderboard, setLeaderboard] = useState(leaderboardService.getLeaderboardData().teams);
  const [winners, setWinners] = useState(MockStore.getWinners());
  const [eventStatus, setEventStatus] = useState(eventService.getCurrentStatus());

  useEffect(() => {
    // Subscribe to store updates (PubSub & localStorage sync)
    const unsubscribe = MockStore.subscribe(() => {
      const freshSettings = MockStore.getEventSettings();
      const freshLeaderboard = leaderboardService.getLeaderboardData().teams;
      const freshWinners = MockStore.getWinners();
      const status = eventService.getCurrentStatus();

      setSettings(freshSettings);
      setLeaderboard(freshLeaderboard);
      setWinners(freshWinners);
      setEventStatus(status);
    });

    // Check timer every 10 seconds to transition PRE_EVENT -> LIVE when 7 Sept 2026 9:00 AM arrives
    const interval = setInterval(() => {
      const status = eventService.getCurrentStatus();
      setEventStatus(status);
    }, 10000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const updateVisibility = (updates) => {
    eventService.updateScoreVisibility(updates);
    soundEffects.playClick();
  };

  const updateEventState = (state) => {
    eventService.setEventState(state);
    soundEffects.playClick();
  };

  const triggerWinnerReveal = () => {
    soundEffects.playMissionPassed();
    return winnerService.triggerReveal();
  };

  return (
    <EventContext.Provider value={{
      settings,
      leaderboard,
      winners,
      eventStatus,
      isLive: eventStatus === 'LIVE' || eventStatus === 'COMPLETED' || eventStatus === 'WINNER_REVEALED',
      isWinnerRevealed: settings.winnerRevealActive || eventStatus === 'WINNER_REVEALED',
      updateVisibility,
      updateEventState,
      triggerWinnerReveal
    }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const ctx = useContext(EventContext);
  if (!ctx) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return ctx;
}
