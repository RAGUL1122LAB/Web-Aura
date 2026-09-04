/**
 * WEB AURA 2K26 - Participant Signup Page
 * 
 * Rules:
 * - New signups are strictly PARTICIPANTS (no client role dropdown)
 * - Redirects to Onboarding on first login
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import SanAndreasInput from '../../components/common/SanAndreasInput';
import SanAndreasButton from '../../components/common/SanAndreasButton';
import { useAuth } from '../../context/AuthContext';
import { soundEffects } from '../../utils/soundEffects';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.');
      soundEffects.playError();
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      soundEffects.playError();
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      soundEffects.playError();
      return;
    }

    try {
      setLoading(true);
      setError('');
      await signup(name, email, password);
      soundEffects.playRespect();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed.');
      soundEffects.playError();
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await loginWithGoogle();
      soundEffects.playRespect();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Google sign-in failed.');
      soundEffects.playError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-md mx-auto">
        <div className="border-4 border-gta-black bg-gta-beige gta-box-shadow select-none">
          {/* Header */}
          <div className="bg-gta-black text-white p-4 border-b-3 border-gta-black flex items-center justify-between">
            <div>
              <span className="text-[10px] bg-gta-orange text-gta-black font-bold px-1.5 py-0.5 uppercase tracking-wider">
                SQUAD RECRUITMENT
              </span>
              <h2 className="font-gta-condensed text-3xl font-black uppercase text-white mt-0.5 leading-none">
                PARTICIPANT SIGN UP
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
              label="Full Name"
              id="signup-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Carl Johnson"
              required
            />

            <SanAndreasInput
              label="College / Participant Email"
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. cj@grove.internal"
              required
            />

            <SanAndreasInput
              label="Create Password"
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              required
            />

            <SanAndreasInput
              label="Confirm Password"
              id="signup-confirm"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
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
                {loading ? 'REGISTERING SQUAD...' : '★ CREATE PARTICIPANT ACCOUNT ★'}
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

            <div className="text-center pt-2 text-xs font-bold text-gta-brown uppercase">
              Already registered?{' '}
              <Link to="/login" className="text-gta-orange hover:underline">
                [ LOG IN HERE ]
              </Link>
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}
