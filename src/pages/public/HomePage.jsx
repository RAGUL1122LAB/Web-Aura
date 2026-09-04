/**
 * WEB AURA 2K26 - Home Page
 * 
 * Strict GTA: San Andreas 2004 PS2/PC Fan-Site Composition
 * Matches reference image layout:
 * - Left/Hero column: Countdown timer + "CJ'S SAN ANDREAS HUB" / HeroSection + Essentials
 * - Right column: "GROVE STREET TIMES" / DispatchNews + "GANG WARS IN LS" showcase
 */

import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import HeroSection from '../../components/public/HeroSection';
import CountdownTimer from '../../components/public/CountdownTimer';
import DispatchNews from '../../components/public/DispatchNews';
import PodiumBanner from '../../components/leaderboard/PodiumBanner';

export default function HomePage() {
  return (
    <PageContainer>
      {/* Real-time Podium Banner appears if Admin triggers winner reveal */}
      <PodiumBanner />

      {/* Main 2-Column Grid Matching Reference Image Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (Span 7/8 on large desktop) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Game Countdown Timer (targeting 7 September 2026, 9:00 AM) */}
          <CountdownTimer />

          {/* Main Hero Showcase Panel (Recreates "CJ'S SAN ANDREAS HUB") */}
          <HeroSection />
        </div>

        {/* Right Sidebar Column (Span 4/5 on large desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Dispatch Bulletin (Recreates "GROVE STREET TIMES" & "GANG WARS IN LS") */}
          <DispatchNews />
        </div>

      </div>
    </PageContainer>
  );
}
