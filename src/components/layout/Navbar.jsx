/**
 * WEB AURA 2K26 - San Andreas Navigation & Header
 * 
 * Direct recreation of the header and navigation bar from the reference image:
 * - Upper warm orange header with dual GTA-style logos and HUD
 * - Solid black navigation bar with bracketed links: [HOME] [EVENT] [LEADERBOARD] ...
 * - Zero rounded corners, zero gradients, solid colors
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { soundEffects } from '../../utils/soundEffects';
import SanAndreasHUD from '../common/SanAndreasHUD';

export default function Navbar() {
  const location = useLocation();
  const { currentUser, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    soundEffects.playClick();
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="relative w-full bg-gta-orange border-b-4 border-gta-black select-none">
      {/* Header Area Above Navigation with Integrated Wall Poster Background */}
      <div className="relative w-full overflow-hidden">
        {/* Layer 1: Clear Wall Poster Image (100% Opacity, Original Colors, No Overlay) */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
          aria-hidden="true"
        >
          <img 
            src="/images/header_wall_poster.png"
            alt="GTA San Andreas Wall Poster"
            className="w-full h-full object-cover object-center opacity-100"
          />
        </div>

        {/* Layer 3: Foreground Header Content (Branding, Center Arch & San Andreas HUD) */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Left Branding: WEB AURA with Palm Silhouette in San Andreas Style */}
          <Link 
            to="/" 
            onClick={handleNavClick}
            className="flex items-center gap-2.5 group text-decoration-none"
          >
            {/* Stylized Palm Tree Silhouette */}
            <div className="text-3xl sm:text-4xl text-gta-black font-black leading-none drop-shadow-[2px_2px_0px_#000]">
              🌴
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-gta-title text-2xl sm:text-3xl text-white tracking-normal leading-none gta-text-shadow-lg flex items-center gap-1.5">
                <span>WEB</span>
                <span>AURA</span>
              </span>
              <span className="font-diploma text-base sm:text-lg text-white tracking-wider leading-none gta-text-shadow mt-1">
                San Andreas Edition
              </span>
            </div>
          </Link>

          {/* Center Logo: 2K26 Arch */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="font-gta-title text-3xl text-white gta-text-shadow-lg leading-none tracking-tight">
              2K26
            </div>
            <div className="font-gta-condensed text-[11px] font-bold text-gta-black uppercase tracking-widest">
              DESIGN • DEVELOP • DEPLOY
            </div>
          </div>

          {/* Right HUD: Authentic CJ/S health, armor, cash, weapon box */}
          <div className="flex items-center gap-2">
            <SanAndreasHUD />
            
            {/* Mobile hamburger toggle (Sharp rectangular) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden ml-2 px-2.5 py-1.5 bg-gta-black text-gta-orange border-2 border-gta-black font-gta-condensed font-bold text-base uppercase"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? '✕ CLOSE' : '☰ MENU'}
            </button>
          </div>
        </div>
      </div>

      {/* Layer 4: Main Horizontal Navigation Bar (Black background with bracketed orange links) */}
      <nav className="relative z-20 w-full bg-gta-black border-t-3 border-b-3 border-gta-black">
        <div className="max-w-6xl mx-auto px-2">
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-wrap">
            <NavLink to="/" active={isActive('/')} onClick={handleNavClick}>
              [HOME]
            </NavLink>
            <div className="text-gta-brown font-bold select-none">|</div>
            <NavLink to="/event" active={isActive('/event')} onClick={handleNavClick}>
              [EVENT]
            </NavLink>
            <div className="text-gta-brown font-bold select-none">|</div>
            <NavLink to="/leaderboard" active={isActive('/leaderboard')} onClick={handleNavClick}>
              [LEADERBOARD]
            </NavLink>
            <div className="text-gta-brown font-bold select-none">|</div>
            <NavLink to="/gallery" active={isActive('/gallery')} onClick={handleNavClick}>
              [GALLERY]
            </NavLink>
            <div className="text-gta-brown font-bold select-none">|</div>
            <NavLink to="/about" active={isActive('/about')} onClick={handleNavClick}>
              [ABOUT]
            </NavLink>
            
            {/* Dynamic Role Navigation */}
            {currentUser && role === 'PARTICIPANT' && (
              <>
                <div className="text-gta-brown font-bold select-none">|</div>
                <NavLink to="/dashboard" active={isActive('/dashboard')} onClick={handleNavClick} highlight>
                  [MY DASHBOARD]
                </NavLink>
              </>
            )}

            {currentUser && role === 'EVALUATOR' && (
              <>
                <div className="text-gta-brown font-bold select-none">|</div>
                <NavLink to="/evaluator" active={isActive('/evaluator')} onClick={handleNavClick} highlight>
                  [EVALUATOR HQ]
                </NavLink>
              </>
            )}

            {currentUser && role === 'ADMIN' && (
              <>
                <div className="text-gta-brown font-bold select-none">|</div>
                <NavLink to="/admin" active={isActive('/admin')} onClick={handleNavClick} highlight>
                  [ADMIN CONTROL]
                </NavLink>
              </>
            )}

            {/* Auth Action */}
            <div className="text-gta-brown font-bold select-none">|</div>
            {currentUser ? (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  logout();
                }}
                className="px-3 py-2 text-gta-red hover:text-white font-gta-condensed text-base font-bold uppercase tracking-wider hover:bg-gta-brown cursor-pointer"
              >
                [LOGOUT]
              </button>
            ) : (
              <NavLink to="/login" active={isActive('/login') || isActive('/signup')} onClick={handleNavClick}>
                [LOGIN / SIGN UP]
              </NavLink>
            )}
          </div>

          {/* Mobile Collapsible Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-2 flex flex-col border-t border-gta-gray">
              <MobileNavLink to="/" active={isActive('/')} onClick={handleNavClick}>[HOME]</MobileNavLink>
              <MobileNavLink to="/event" active={isActive('/event')} onClick={handleNavClick}>[EVENT]</MobileNavLink>
              <MobileNavLink to="/leaderboard" active={isActive('/leaderboard')} onClick={handleNavClick}>[LEADERBOARD]</MobileNavLink>
              <MobileNavLink to="/gallery" active={isActive('/gallery')} onClick={handleNavClick}>[GALLERY]</MobileNavLink>
              <MobileNavLink to="/about" active={isActive('/about')} onClick={handleNavClick}>[ABOUT]</MobileNavLink>
              {currentUser && role === 'PARTICIPANT' && (
                <MobileNavLink to="/dashboard" active={isActive('/dashboard')} onClick={handleNavClick}>[MY DASHBOARD]</MobileNavLink>
              )}
              {currentUser && role === 'EVALUATOR' && (
                <MobileNavLink to="/evaluator" active={isActive('/evaluator')} onClick={handleNavClick}>[EVALUATOR HQ]</MobileNavLink>
              )}
              {currentUser && role === 'ADMIN' && (
                <MobileNavLink to="/admin" active={isActive('/admin')} onClick={handleNavClick}>[ADMIN CONTROL]</MobileNavLink>
              )}
              {currentUser ? (
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 text-left font-gta-condensed font-bold text-gta-red uppercase text-base hover:bg-gta-brown"
                >
                  [LOGOUT]
                </button>
              ) : (
                <MobileNavLink to="/login" active={isActive('/login')} onClick={handleNavClick}>[LOGIN / SIGN UP]</MobileNavLink>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

function NavLink({ to, active, onClick, highlight = false, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        px-3.5 py-2 font-gta-condensed text-base font-bold uppercase tracking-wider
        transition-none cursor-pointer
        ${active 
          ? 'bg-gta-orange text-gta-black font-extrabold' 
          : highlight
          ? 'text-gta-green hover:bg-gta-brown hover:text-white'
          : 'text-gta-orange hover:bg-gta-brown hover:text-white'
        }
      `}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, active, onClick, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        px-4 py-2 font-gta-condensed text-base font-bold uppercase tracking-wider
        ${active ? 'bg-gta-orange text-gta-black' : 'text-gta-orange hover:bg-gta-brown'}
      `}
    >
      {children}
    </Link>
  );
}
