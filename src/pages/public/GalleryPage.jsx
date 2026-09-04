/**
 * WEB AURA 2K26 - Gallery Page
 * 
 * Strict GTA: San Andreas visual language:
 * - Rectangular photo blocks with black borders
 * - Orange/brown labels
 * - Classic early-2000s fan-site photo layout
 * - Zero rounded corners, zero gradients
 */

import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import { EVENT_CONFIG } from '../../config/eventConfig';

export default function GalleryPage() {
  return (
    <PageContainer>
      <div className="space-y-6 select-none">
        
        {/* Banner */}
        <div className="border-3 border-gta-black bg-gta-black text-white p-4 sm:p-6 gta-box-shadow">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b-2 border-gta-orange pb-3 mb-3">
            <div>
              <span className="text-xs bg-gta-orange text-gta-black font-gta-condensed font-black px-2 py-0.5 uppercase tracking-widest">
                WAR ROOM SNAPSHOTS
              </span>
              <h1 className="font-gta-title text-3xl sm:text-5xl text-white gta-text-shadow leading-none tracking-tight mt-1">
                COMPETITION PHOTO GALLERY
              </h1>
            </div>
            <span className="font-gta-hud text-xl text-gta-green font-bold">
              EST. 2004 - 2026
            </span>
          </div>

          <p className="font-body text-sm text-gta-tan-light max-w-2xl">
            Archival captures from the Web Aura engineering labs, jury scoring rounds, code sprints, and podium celebrations across the state of San Andreas.
          </p>
        </div>

        {/* Rectangular Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {EVENT_CONFIG.galleryItems.map((item) => (
            <div 
              key={item.id}
              className="border-3 border-gta-black bg-gta-beige gta-box-shadow flex flex-col justify-between"
            >
              {/* Image Container with Retro Styling */}
              <div className="p-3">
                <div className="relative w-full h-48 bg-gta-brown border-2 border-gta-black overflow-hidden flex items-center justify-center p-3 text-center">
                  {/* Visual Retro Hackathon Silhouette Representation */}
                  <div className="font-mono text-xs text-gta-tan space-y-1">
                    <div className="text-3xl text-gta-orange">💻</div>
                    <div className="font-gta-condensed text-lg uppercase font-black text-white">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-gta-green font-bold">
                      CAMERA ARCHIVE #{item.id}04
                    </div>
                  </div>

                  {/* Corner Stamp */}
                  <div className="absolute top-2 right-2 bg-gta-black text-gta-orange border border-black text-[10px] font-bold px-1.5 py-0.5 uppercase">
                    {item.tag}
                  </div>
                </div>
              </div>

              {/* Caption Block */}
              <div className="p-3 bg-white border-t-2 border-gta-black">
                <h4 className="font-gta-condensed text-lg font-black uppercase text-gta-black leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-gta-brown font-medium mt-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </PageContainer>
  );
}
