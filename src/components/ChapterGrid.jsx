import React, { useState } from 'react';
import { ChapterCard } from './ChapterCard';
import { chaptersData } from '../data/chaptersData';
import { storageService } from '../utils/storageService';
import { Compass, BookCheck } from 'lucide-react';

export const ChapterGrid = ({ onSelectChapter }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const completedChapters = storageService.getCompletedChapters();

  const filterTabs = [
    { id: 'all', label: 'All 18 Chapters' },
    { id: 'karma', label: 'Karma Yoga (1–6)', range: [1, 6] },
    { id: 'bhakti', label: 'Bhakti Yoga (7–12)', range: [7, 12] },
    { id: 'jnana', label: 'Jnana Yoga (13–18)', range: [13, 18] }
  ];

  const filteredChapters = chaptersData.filter((ch) => {
    if (activeFilter === 'all') return true;
    const tab = filterTabs.find((t) => t.id === activeFilter);
    if (!tab || !tab.range) return true;
    return ch.num >= tab.range[0] && ch.num <= tab.range[1];
  });

  const progressPercent = Math.round((completedChapters.length / 18) * 100);

  return (
    <section className="section-wrapper" id="chapters" style={{ backgroundColor: '#FFFDF5' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Compass size={14} color="#D4AF37" />
            <span>अष्टादशोऽध्यायः • THE 18 SACRED DISCOURSES</span>
          </div>
          <h2 className="section-title">Explore the 18 Chapters</h2>
          <p className="section-subtitle">
            Journey through the eighteen spiritual stages of self-realization, as Bhagavan Sri Krishna systematically unfolds the science of life, yoga, and ultimate freedom.
          </p>

          <div className="golden-divider">
            <div className="line" />
            <span className="symbol">✦ ॐ ✦</span>
            <div className="line" />
          </div>

          {/* Reading Progress Tracker Bar */}
          <div
            style={{
              maxWidth: '500px',
              margin: '0 auto 2.5rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '1rem 1.4rem',
              border: '1px solid rgba(212, 175, 55, 0.28)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#292929', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <BookCheck size={16} color="#A67C00" />
                <span>Overall Scripture Progress</span>
              </span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#A67C00' }}>
                {completedChapters.length} of 18 Chapters ({progressPercent}%)
              </span>
            </div>
            <div style={{ width: '100%', height: '7px', backgroundColor: '#F0EAD6', borderRadius: '9999px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #D4AF37 0%, #A67C00 100%)',
                  borderRadius: '9999px',
                  transition: 'width 400ms ease'
                }}
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.6rem',
              marginBottom: '2rem'
            }}
          >
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  style={{
                    padding: '0.55rem 1.25rem',
                    borderRadius: '9999px',
                    fontFamily: "'Cinzel', serif",
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    border: isActive ? '1.5px solid #D4AF37' : '1px solid rgba(212, 175, 55, 0.25)',
                    backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                    color: isActive ? '#A67C00' : '#6B685F',
                    boxShadow: isActive ? '0 4px 14px rgba(212, 175, 55, 0.18)' : 'none',
                    transition: 'all 200ms ease'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 18 Chapters Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {filteredChapters.map((chapter) => (
            <ChapterCard
              key={chapter.num}
              chapter={chapter}
              isCompleted={completedChapters.includes(chapter.num)}
              onSelectChapter={onSelectChapter}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
