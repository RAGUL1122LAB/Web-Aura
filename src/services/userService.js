/**
 * WEB AURA 2K26 - User Profile Service
 */

import { MockStore } from '../firebase/mockStore';

export const userService = {
  getUser(uid) {
    return MockStore.getUser(uid);
  },

  updateProfile(uid, profileData) {
    const existing = MockStore.getUser(uid);
    if (!existing) {
      throw new Error('User record not found');
    }
    
    // Security check: cannot modify own role
    const { role, ...safeUpdates } = profileData;

    return MockStore.saveUser({
      ...existing,
      ...safeUpdates,
      updatedAt: new Date().toISOString()
    });
  },

  completeOnboarding(uid, details) {
    const existing = MockStore.getUser(uid);
    return MockStore.saveUser({
      ...existing,
      ...details,
      profileComplete: true,
      updatedAt: new Date().toISOString()
    });
  }
};
