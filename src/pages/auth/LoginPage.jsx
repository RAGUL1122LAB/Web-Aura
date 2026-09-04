/**
 * WEB AURA 2K26 - Login Page
 * 
 * Strict San Andreas aesthetic:
 * - Email / Password Login
 * - Continue with Google
 * - Quick Demo Credentials Switcher for instant evaluator/admin/participant testing
 * - Sanitized error states
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import SanAndreasInput from '../../components/common/SanAndreasInput';
import SanAndreasButton from '../../components/common/SanAndreasButton';
import { useAuth } from '../../context/AuthContext';
import { soundEffects } from '../../utils/soundEffects';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please fill in both email and password.');
      soundEffects.playError();
      return;
    }

    try {
      setLoading(true);
      setError('');
      const user = await login(email, password);
      soundEffects.playRespect();
      
      // Navigate based on trusted role
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else if (user.role === 'EVALUATOR') {
        navigate('/evaluator');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
      soundEffects.playError();
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const user = await loginWithGoogle();
      soundEffects.playRespect();
      if (user.role === 'ADMIN') navigate('/admin');
      else if (user.role === 'EVALUATOR') navigate('/evaluator');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Google sign-in failed.');
      soundEffects.playError();
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo account filler for rapid pairing/testing
  const fillDemoAccount = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
    soundEffects.playClick();
  };

  return (
    <PageContainer>
      <div className="max-w-md mx-auto">
        <div className="border-4 border-gta-black bg-gta-beige gta-box-shadow select-none">
          {/* Header */}
          <div className="bg-gta-black text-white p-4 border-b-3 border-gta-black flex items-center justify-between">
            <div>
              <span className="text-[10px] bg-gta-orange text-gta-black font-bold px-1.5 py-0.5 uppercase tracking-wider">
                SECURE TERMINAL
              </span>
              <h2 className="font-gta-condensed text-3xl font-black uppercase text-white mt-0.5 leading-none">
                WEB AURA LOGIN
              </h2>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {error && (
              <div className="p-3 bg-red-100 border-2 border-gta-red text-gta-red font-gta-condensed text-sm font-bold uppercase tracking-wider">
                ⚠ {error}
              </div>
            )}

            <SanAndreasInput
              label="Email Address"
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. participant@webaura.internal"
              required
            />

            <SanAndreasInput
              label="Password"
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <div className="pt-2 flex flex-col gap-3">
              <SanAndreasButton
                type="submit"
                variant="orange"
                size="lg"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'AUTHENTICATING...' : '★ LOG IN TO TERMINAL ★'}
              </SanAndreasButton>

              <SanAndreasButton
                type="button"
                variant="black"
                size="md"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full"
              >
                CONTINUE WITH GOOGLE
              </SanAndreasButton>
            </div>

            {/* Quick Demo Switcher Panel */}
            <div className="mt-4 pt-3 border-t-2 border-gta-black">
              <p className="text-xs font-gta-condensed font-bold uppercase tracking-wider text-gta-brown mb-2 text-center">
                ★ QUICK TEST ROLES (CLICK TO FILL) ★
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoAccount('participant@webaura.internal', 'password123')}
                  className="min-h-[40px] px-2 py-1.5 bg-gta-black text-gta-orange border border-black font-gta-condensed text-xs sm:text-sm font-bold uppercase hover:bg-gta-brown flex items-center justify-center cursor-pointer select-none"
                >
                  PARTICIPANT
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('evaluator@webaura.internal', 'evalPass2026')}
                  className="min-h-[40px] px-2 py-1.5 bg-gta-blue text-white border border-black font-gta-condensed text-xs sm:text-sm font-bold uppercase hover:bg-blue-800 flex items-center justify-center cursor-pointer select-none"
                >
                  EVALUATOR
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('admin@webaura.internal', 'adminSecret2026')}
                  className="min-h-[40px] px-2 py-1.5 bg-gta-red text-white border border-black font-gta-condensed text-xs sm:text-sm font-bold uppercase hover:bg-red-800 flex items-center justify-center cursor-pointer select-none"
                >
                  ADMIN
                </button>
              </div>
            </div>

            <div className="text-center pt-2 text-xs font-bold text-gta-brown uppercase">
              Don't have an account?{' '}
              <Link to="/signup" className="text-gta-orange hover:underline">
                [ SIGN UP HERE ]
              </Link>
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}
