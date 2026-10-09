import React, { useState } from 'react';
import { philosophyTopics, historicalQuotes } from '../data/philosophyTopics';
import { BookOpen, Sparkles, Quote, ChevronRight, Award } from 'lucide-react';

export const PhilosophySection = ({ onOpenVerse }) => {
  const [selectedTopicId, setSelectedTopicId] = useState(philosophyTopics[0].id);
  const activeTopic = philosophyTopics.find((t) => t.id === selectedTopicId) || philosophyTopics[0];

  return (
    <section className="section-wrapper" id="teachings" style={{ backgroundColor: '#FFFDF5' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} color="#D4AF37" />
            <span>CORE PHILOSOPHICAL DOCTRINES • तत्त्वज्ञान</span>
          </div>
          <h2 className="section-title">Philosophy & Teachings</h2>
          <p className="section-subtitle">
            The fundamental pathways of Indian philosophy harmonized into a complete spiritual synthesis by Lord Krishna on the battlefield.
          </p>

          <div className="golden-divider">
            <div className="line" />
            <span className="symbol">✦ ॐ ✦</span>
            <div className="line" />
          </div>
        </div>

        {/* Interactive Master-Detail Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            alignItems: 'start',
            marginBottom: '5rem'
          }}
          className="philosophy-grid"
        >
          {/* Navigation Pill List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {philosophyTopics.map((topic) => {
              const isSelected = topic.id === selectedTopicId;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.15rem 1.4rem',
                    borderRadius: '16px',
                    border: isSelected ? '1.5px solid #D4AF37' : '1px solid rgba(212, 175, 55, 0.2)',
                    backgroundColor: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)',
                    color: isSelected ? '#A67C00' : '#292929',
                    boxShadow: isSelected ? '0 6px 22px rgba(166, 124, 0, 0.12)' : '0 1px 4px rgba(0,0,0,0.02)',
                    textAlign: 'left',
                    transition: 'all 200ms ease'
                  }}
                  className="philo-nav-btn"
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', fontWeight: 700 }}>
                        {topic.name}
                      </span>
                      <span style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: '0.85rem', color: '#A67C00' }}>
                        {topic.sanskritName}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6B685F', marginTop: '0.2rem' }}>
                      {topic.tagline}
                    </div>
                  </div>
                  <ChevronRight size={18} color={isSelected ? "#A67C00" : "#C4BCAB"} />
                </button>
              );
            })}
          </div>

          {/* Active Philosophical Doctrine Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1.5px solid rgba(212, 175, 55, 0.35)',
              boxShadow: '0 12px 35px -5px rgba(166, 124, 0, 0.08)',
              padding: 'clamp(1.75rem, 4vw, 3rem)',
              position: 'relative'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.82rem', fontWeight: 700, color: '#A67C00', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  THE PHILOSOPHICAL PATH
                </span>
                <h3 style={{ fontSize: '1.85rem', color: '#292929', fontWeight: 800, marginTop: '0.2rem' }}>
                  {activeTopic.name} • <span style={{ fontFamily: "'Noto Serif Devanagari', serif", color: '#A67C00' }}>{activeTopic.sanskritName}</span>
                </h3>
                <p style={{ fontSize: '0.98rem', color: '#8A8577', fontStyle: 'italic', marginTop: '0.2rem' }}>
                  {activeTopic.tagline}
                </p>
              </div>

              <button
                onClick={() => {
                  const [ch, v] = activeTopic.primaryVerse.split('.');
                  onOpenVerse(Number(ch), v);
                }}
                className="btn-secondary"
                style={{ padding: '0.55rem 1.15rem', fontSize: '0.82rem' }}
              >
                <BookOpen size={14} />
                <span>Read BG {activeTopic.primaryVerse}</span>
              </button>
            </div>

            {/* In-depth Summary */}
            <p style={{ fontSize: '1.08rem', color: '#3D3D3D', lineHeight: 1.75, marginBottom: '2rem' }}>
              {activeTopic.summary}
            </p>

            {/* Core Pillars / Concepts */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#A67C00', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
                FOUNDATIONAL PRINCIPLES
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {activeTopic.keyConcepts.map((concept, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.8rem 1.1rem',
                      backgroundColor: '#FFFDF5',
                      borderRadius: '12px',
                      border: '1px solid rgba(212, 175, 55, 0.25)'
                    }}
                  >
                    <span style={{ color: '#D4AF37', fontWeight: 700 }}>✦</span>
                    <span style={{ fontSize: '0.92rem', color: '#33312B', fontWeight: 500 }}>
                      {concept}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Original Scripture Block */}
            <div
              style={{
                backgroundColor: '#FFFDF5',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                borderLeft: '4px solid #D4AF37'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#A67C00', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  ORIGINAL SCRIPTURE VERSE • BG {activeTopic.primaryVerse}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Tiro Devanagari Sanskrit', serif",
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#292929',
                  lineHeight: 1.7,
                  marginBottom: '0.75rem'
                }}
              >
                {activeTopic.scriptureQuote}
              </p>
              <p style={{ fontSize: '0.95rem', color: '#6B685F', fontStyle: 'italic', lineHeight: 1.6 }}>
                "{activeTopic.quoteTranslation}"
              </p>
            </div>

          </div>
        </div>

        {/* Global Endorsements & Historical Citations from Resources */}
        <div style={{ marginTop: '2rem' }}>
          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.82rem', fontWeight: 700, color: '#A67C00', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              GLOBAL TRIBUTES & TESTIMONIES
            </span>
            <h3 style={{ fontSize: '1.85rem', color: '#292929', marginTop: '0.35rem' }}>
              Voices Across Ages & Civilizations
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#6B685F', maxWidth: '640px', margin: '0.5rem auto 0' }}>
              Verifiable citations recorded in the authentic commentary editions of the Bhagavad Gita.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {historicalQuotes.map((item, i) => (
              <div
                key={i}
                className="gita-card"
                style={{
                  padding: '1.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px'
                }}
              >
                <div>
                  <Quote size={28} color="#D4AF37" style={{ marginBottom: '1rem', opacity: 0.8 }} />
                  <p style={{ fontSize: '0.92rem', color: '#3D3D3D', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                    "{item.quote}"
                  </p>
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.95rem', fontWeight: 700, color: '#A67C00' }}>
                    {item.author}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#6B685F', marginTop: '0.15rem' }}>
                    {item.role}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#8A8577', fontStyle: 'italic', marginTop: '0.15rem' }}>
                    {item.source}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 960px) {
          .philosophy-grid {
            grid-template-columns: 360px 1fr !important;
          }
        }
        .philo-nav-btn:hover {
          border-color: #D4AF37 !important;
          background-color: #FFFFFF !important;
        }
      `}</style>
    </section>
  );
};
