/**
 * WEB AURA 2K26 - Main Application Root
 * 100% GTA: San Andreas Visual Theme & Complete Real-Time Architecture
 */

import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/public/HomePage';
import EventPage from './pages/public/EventPage';
import LeaderboardPage from './pages/public/LeaderboardPage';
import GalleryPage from './pages/public/GalleryPage';
import AboutPage from './pages/public/AboutPage';
import WinnersPage from './pages/public/WinnersPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ParticipantDashboard from './pages/participant/ParticipantDashboard';
import EvaluatorDashboard from './pages/evaluator/EvaluatorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import SanAndreasButton from './components/common/SanAndreasButton';

// Scroll to top component on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// 404 Not Found Page (San Andreas "WASTED" Themed)
function NotFoundPage() {
  return (
    <div className="min-h-[70vh] bg-gta-black flex items-center justify-center p-4 select-none">
      <div className="max-w-md w-full border-4 border-gta-red bg-gta-black p-8 text-center gta-box-shadow-lg">
        <h1 className="font-gta-title text-5xl text-gta-red gta-text-shadow leading-none tracking-tight">
          WASTED
        </h1>
        <div className="font-gta-condensed text-2xl font-black uppercase text-gta-orange mt-2">
          404 — PAGE NOT FOUND
        </div>
        <p className="text-xs text-gta-tan font-body mt-2">
          You wandered into the wrong neighborhood of San Andreas. The requested URL does not exist.
        </p>
        <div className="mt-5">
          <Link to="/">
            <SanAndreasButton variant="orange" size="md">
              RESPAWN AT HOME
            </SanAndreasButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gta-black text-gta-black flex flex-col justify-between">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/winners" element={<WinnersPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/evaluator/login" element={<LoginPage />} />

          {/* Protected Participant Route */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['PARTICIPANT', 'ADMIN']}>
                <ParticipantDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Protected Evaluator Route */}
          <Route 
            path="/evaluator" 
            element={
              <ProtectedRoute allowedRoles={['EVALUATOR', 'ADMIN']}>
                <EvaluatorDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Protected Admin Route */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
