/**
 * WEB AURA 2K26 - About Page
 * 
 * Contents:
 * - Club Name: Web Aura Tech Club
 * - About the Club
 * - Vision & Mission
 * - Department: Department of Computer Science & Engineering
 * - College: College of Engineering & Technology
 * - Contact Webmaster
 */

import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import SanAndreasPanel from '../../components/common/SanAndreasPanel';
import { EVENT_CONFIG } from '../../config/eventConfig';

export default function AboutPage() {
  return (
    <PageContainer>
      <div className="space-y-6 select-none">
        
        {/* Banner */}
        <div className="border-3 border-gta-black bg-gta-black text-white p-4 sm:p-6 gta-box-shadow">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b-2 border-gta-orange pb-3 mb-3">
            <div>
              <span className="text-xs bg-gta-orange text-gta-black font-gta-condensed font-black px-2 py-0.5 uppercase tracking-widest">
                ORGANIZATIONAL CHARTER
              </span>
              <h1 className="font-gta-title text-3xl sm:text-5xl text-white gta-text-shadow leading-none tracking-tight mt-1">
                ABOUT WEB AURA & TECH CLUB
              </h1>
            </div>
            <span className="font-gta-hud text-xl text-gta-green font-bold">
              EST. 2026
            </span>
          </div>

          <p className="font-body text-sm sm:text-base text-gta-tan-light max-w-2xl leading-relaxed">
            The official headquarters of collegiate technology innovation, full-stack development challenges, and competitive engineering hackathons.
          </p>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* About Club */}
          <SanAndreasPanel title="WEB AURA TECH CLUB" subtitle="COMMUNITY LEADERSHIP" variant="beige">
            <div className="space-y-3 text-sm text-gta-black font-medium leading-relaxed">
              <p>
                <strong>WEB AURA</strong> is the flagship annual student-run technology initiative organized by the Department of Computer Science and Engineering.
              </p>
              <p>
                Founded on the principles of rigorous technical craftsmanship, Web Aura bridges the gap between academic computation and real-world system engineering. We foster a competitive yet collaborative environment where student developers architect, evaluate, and deploy scalable digital systems.
              </p>
              <div className="p-3 bg-white border-2 border-gta-black font-gta-condensed text-base font-bold text-gta-brown uppercase">
                MOTTO: "DESIGN. DEVELOP. DEPLOY."
              </div>
            </div>
          </SanAndreasPanel>

          {/* Department & Institution */}
          <SanAndreasPanel title="ACADEMIC AFFILIATION" subtitle="FACULTY & DEPARTMENT" variant="beige">
            <div className="space-y-3 text-sm text-gta-black font-medium leading-relaxed">
              <div>
                <span className="text-xs font-gta-condensed font-bold uppercase text-gta-orange bg-gta-black px-1.5 py-0.5">
                  DEPARTMENT
                </span>
                <h4 className="font-gta-condensed text-xl font-black uppercase text-gta-black mt-1">
                  Department of Computer Science & Engineering
                </h4>
              </div>

              <div>
                <span className="text-xs font-gta-condensed font-bold uppercase text-gta-blue bg-gta-black px-1.5 py-0.5">
                  INSTITUTION
                </span>
                <h4 className="font-gta-condensed text-xl font-black uppercase text-gta-black mt-1">
                  College of Engineering & Technology
                </h4>
              </div>

              <p className="text-xs text-gta-brown">
                Supported by senior faculty jury members, laboratory technical assistants, and industry alumni evaluators.
              </p>
            </div>
          </SanAndreasPanel>

          {/* Vision */}
          <SanAndreasPanel title="OUR VISION" subtitle="THE HORIZON" variant="beige">
            <div className="space-y-2 text-sm text-gta-black font-medium leading-relaxed">
              <p>
                To establish a benchmark standard for collegiate technical hackathons where students master the full lifecycle of software engineering — from pixel-perfect accessible frontend designs to hardened, transactionally safe cloud architectures.
              </p>
            </div>
          </SanAndreasPanel>

          {/* Mission */}
          <SanAndreasPanel title="OUR MISSION" subtitle="EXECUTION DIRECTIVES" variant="beige">
            <ul className="space-y-2 text-sm text-gta-black font-medium list-none">
              <li className="flex items-start gap-2">
                <span className="text-gta-orange font-bold text-base leading-none">◆</span>
                <span>Provide transparent, rubric-driven evaluation across presentation and cloud deployment.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gta-orange font-bold text-base leading-none">◆</span>
                <span>Enforce industry best practices in source control, database security, and modularity.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gta-orange font-bold text-base leading-none">◆</span>
                <span>Celebrate student innovation with real-time broadcasting and merit-based recognition.</span>
              </li>
            </ul>
          </SanAndreasPanel>

        </div>

        {/* Contact Webmaster Section */}
        <div className="border-3 border-gta-black bg-gta-charcoal text-white p-4 sm:p-5 gta-box-shadow flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-gta-condensed text-xl font-bold uppercase text-gta-orange">
              CONTACT WEBMASTER & DISPATCH HELPDESK
            </div>
            <p className="text-xs text-gta-tan mt-0.5">
              Experiencing technical issues, scoring discrepancies, or squad verification inquiries?
            </p>
          </div>
          <a 
            href={`mailto:${EVENT_CONFIG.webmasterEmail}`}
            className="px-4 py-2 bg-gta-orange text-gta-black font-gta-condensed font-black text-base uppercase border-2 border-black hover:bg-gta-orange-light"
          >
            [ CONTACT WEBMASTER ]
          </a>
        </div>

      </div>
    </PageContainer>
  );
}
