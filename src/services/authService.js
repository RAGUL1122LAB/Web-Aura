/**
 * WEB AURA 2K26 - Authentication Service
 * 
 * Supports Firebase Auth (Email/Password & Google) and MockStore.
 * Role is strictly derived from trusted database records (never client dropdown).
 */

import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../firebase/config';
import { MockStore } from '../firebase/mockStore';

// Local storage session key for mock auth
const MOCK_SESSION_KEY = 'webaura_mock_auth_user';

export const authService = {
  // Listen to auth state changes
  subscribeAuthState(callback) {
    if (isFirebaseConfigured && auth) {
      return onAuthStateChanged(auth, async (firebaseUser) => {
        if (!firebaseUser) {
          callback(null);
          return;
        }
        // Load trusted user profile from database
        const profile = MockStore.getUser(firebaseUser.uid) || {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || 'Participant',
          email: firebaseUser.email,
          role: 'PARTICIPANT',
          profileComplete: false,
          teamId: null
        };
        callback(profile);
      });
    } else {
      // Mock session listener
      const loadMockUser = () => {
        try {
          const raw = localStorage.getItem(MOCK_SESSION_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            const freshUser = MockStore.getUser(parsed.uid) || parsed;
            callback(freshUser);
          } else {
            callback(null);
          }
        } catch (e) {
          callback(null);
        }
      };

      loadMockUser();

      // Listen to storage events for cross-tab auth
      const handleStorage = (e) => {
        if (e.key === MOCK_SESSION_KEY) {
          loadMockUser();
        }
      };
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    }
  },

  // Login with Email & Password
  async loginWithEmail(email, password) {
    try {
      if (isFirebaseConfigured && auth) {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const user = MockStore.getUser(userCred.user.uid);
        return user || {
          uid: userCred.user.uid,
          email: userCred.user.email,
          role: 'PARTICIPANT'
        };
      } else {
        // Mock login
        const existing = MockStore.getUserByEmail(email);
        if (existing) {
          localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(existing));
          window.dispatchEvent(new Event('storage'));
          return existing;
        }

        // New participant login in mock mode
        const newUser = {
          uid: `user_${Date.now()}`,
          name: email.split('@')[0],
          email: email.toLowerCase(),
          role: 'PARTICIPANT',
          profileComplete: false,
          teamId: null,
          createdAt: new Date().toISOString()
        };
        MockStore.saveUser(newUser);
        localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(newUser));
        window.dispatchEvent(new Event('storage'));
        return newUser;
      }
    } catch (error) {
      throw new Error(this.sanitizeError(error));
    }
  },

  // Sign up with Email & Password
  async signupWithEmail(name, email, password) {
    try {
      if (isFirebaseConfigured && auth) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = {
          uid: userCred.user.uid,
          name: name.trim(),
          email: email.toLowerCase().trim(),
          role: 'PARTICIPANT', // strictly PARTICIPANT by default
          profileComplete: false,
          teamId: null,
          createdAt: new Date().toISOString()
        };
        MockStore.saveUser(newUser);
        return newUser;
      } else {
        const existing = MockStore.getUserByEmail(email);
        if (existing) {
          throw new Error('An account with this email already exists. Please log in.');
        }
        const newUser = {
          uid: `user_${Date.now()}`,
          name: name.trim(),
          email: email.toLowerCase().trim(),
          role: 'PARTICIPANT',
          profileComplete: false,
          teamId: null,
          createdAt: new Date().toISOString()
        };
        MockStore.saveUser(newUser);
        localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(newUser));
        window.dispatchEvent(new Event('storage'));
        return newUser;
      }
    } catch (error) {
      throw new Error(this.sanitizeError(error));
    }
  },

  // Continue with Google
  async loginWithGoogle() {
    try {
      if (isFirebaseConfigured && auth && googleProvider) {
        const result = await signInWithPopup(auth, googleProvider);
        let user = MockStore.getUser(result.user.uid);
        if (!user) {
          user = {
            uid: result.user.uid,
            name: result.user.displayName || 'Google Participant',
            email: result.user.email,
            role: 'PARTICIPANT',
            profileComplete: false,
            teamId: null,
            createdAt: new Date().toISOString()
          };
          MockStore.saveUser(user);
        }
        return user;
      } else {
        // Simulated Google login
        const email = 'google.participant@webaura.internal';
        let user = MockStore.getUserByEmail(email);
        if (!user) {
          user = {
            uid: `user_google_${Date.now()}`,
            name: 'Google Participant',
            email: email,
            role: 'PARTICIPANT',
            profileComplete: false,
            teamId: null,
            createdAt: new Date().toISOString()
          };
          MockStore.saveUser(user);
        }
        localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(user));
        window.dispatchEvent(new Event('storage'));
        return user;
      }
    } catch (error) {
      throw new Error(this.sanitizeError(error));
    }
  },

  // Logout
  async logout() {
    try {
      if (isFirebaseConfigured && auth) {
        await firebaseSignOut(auth);
      }
      localStorage.removeItem(MOCK_SESSION_KEY);
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Sanitize raw errors
  sanitizeError(error) {
    const code = error?.code || '';
    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
      return 'Invalid credentials. Check your email and password.';
    }
    if (code === 'auth/email-already-in-use') {
      return 'This email address is already registered. Please login.';
    }
    if (code === 'auth/weak-password') {
      return 'Password should be at least 6 characters.';
    }
    if (code === 'auth/popup-closed-by-user') {
      return 'Google sign-in popup was cancelled.';
    }
    return error.message || 'Authentication failed. Please try again.';
  }
};
