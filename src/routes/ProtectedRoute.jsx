/**
 * WEB AURA 2K26 - Protected Route Guard
 * 
 * Enforces role-based authorization:
 * - PARTICIPANT
 * - EVALUATOR
 * - ADMIN
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SanAndreasButton from '../components/common/SanAndreasButton';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { currentUser, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gta-black flex items-center justify-center p-4">
        <div className="border-3 border-gta-orange bg-gta-black p-6 text-white text-center font-gta-condensed">
          <div className="text-3xl animate-spin mb-2">★</div>
          <div className="text-xl uppercase tracking-widest text-gta-orange font-bold">
            LOADING SAN ANDREAS TERMINAL...
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return (
      <div className="min-h-[75vh] bg-gta-black flex items-center justify-center p-4 select-none">
        <div className="max-w-md w-full border-4 border-gta-red bg-gta-beige p-6 gta-box-shadow-lg text-center">
          <div className="text-4xl mb-2">⭐ ⭐ ⭐ ⭐ ⭐</div>
          <h3 className="font-gta-condensed text-3xl font-black uppercase text-gta-red">
            ACCESS DENIED
          </h3>
          <p className="font-body text-xs sm:text-sm text-gta-brown font-bold mt-2">
            Your current security clearance ({role}) is not authorized to access this command level. Requires: {allowedRoles.join(' or ')}.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <SanAndreasButton
              variant="black"
              size="md"
              onClick={() => window.history.back()}
            >
              ← RETURN
            </SanAndreasButton>
            <SanAndreasButton
              variant="orange"
              size="md"
              onClick={() => window.location.href = '/'}
            >
              GO TO HOME
            </SanAndreasButton>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
