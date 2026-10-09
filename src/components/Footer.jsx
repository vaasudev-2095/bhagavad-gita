import React from 'react';
import { Sparkles, Heart, ArrowUp, RotateCcw } from 'lucide-react';
import { chaptersData } from '../data/chaptersData';

export const Footer = ({ onSelectChapter, onReplayIntro, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#FFFDF5',
        borderTop: '1.5px solid rgba(212, 175, 55, 0.35)',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
        position: 'relative'
      }}
    >
      <div className="container">
        
        {/* Main Footer Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Column 1: Brand & Closing Blessing */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #D4AF37',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#A67C00',
                  fontFamily: "'Tiro Devanagari Sanskrit', serif",
                  fontSize: '1.3rem',
                  fontWeight: 700
                }}
              >
                ॐ
              </div>
              <div>
                <div style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif", fontSize: '1.05rem', fontWeight: 700, color: '#292929' }}>
                  श्रीमद्भगवद्गीता
                </div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.12em', color: '#A67C00' }}>
                  BHAGAVAD GITA
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', color: '#575249', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>
              "May the wisdom of the Gita inspire clarity, courage, and equanimity in everyday life."
            </p>

            <button
              onClick={onReplayIntro}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                backgroundColor: '#FFFFFF',
                color: '#A67C00',
                fontSize: '0.8rem',
                fontFamily: "'Cinzel', serif",
                fontWeight: 600,
                transition: 'all 200ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FAF0D7';
                e.currentTarget.style.borderColor = '#D4AF37';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.35)';
              }}
            >
              <RotateCcw size={13} />
              <span>Replay Divine Opening Intro</span>
            </button>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: '0.95rem', fontWeight: 700, color: '#292929', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>
              Explore the Scripture
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { label: 'Explore 18 Chapters', action: () => onNavigate('chapters') },
                { label: 'Read Scripture Verse by Verse', action: () => onNavigate('reader') },
                { label: 'Wisdom for Everyday Life', action: () => onNavigate('wisdom') },
                { label: 'Core Philosophy & Teachings', action: () => onNavigate('teachings') },
                { label: 'About the Kurukshetra Dialogue', action: () => onNavigate('about') }
              ].map((link, idx) => (
                <button
                  key={idx}
                  onClick={link.action}
                  style={{
                    textAlign: 'left',
                    fontSize: '0.88rem',
                    color: '#6B685F',
                    transition: 'color 150ms ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#A67C00'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#6B685F'}
                >
                  <span style={{ color: '#D4AF37', fontSize: '0.75rem' }}>✦</span>
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: 18 Chapters Quick Grid */}
          <div>
            <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: '0.95rem', fontWeight: 700, color: '#292929', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>
              Chapters Directory
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.4rem' }}>
              {chaptersData.map((ch) => (
                <button
                  key={ch.num}
                  onClick={() => onSelectChapter(ch.num)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    color: '#A67C00',
                    fontFamily: "'Cinzel', serif",
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 150ms ease'
                  }}
                  title={`Chapter ${ch.num}: ${ch.sanskrit} - ${ch.english}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#D4AF37';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#A67C00';
                  }}
                >
                  {ch.num}
                </button>
              ))}
            </div>
          </div>

          {/* Column 4: Credits & Resource Attribution */}
          <div>
            <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: '0.95rem', fontWeight: 700, color: '#292929', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>
              Scripture Attributions
            </h4>
            <div style={{ fontSize: '0.82rem', color: '#6B685F', lineHeight: 1.65, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p>
                <strong>Text & Translations:</strong> Sri Swami Sivananda (The Divine Life Society), Bhagavad Gita As It Is (Bhaktivedanta Book Trust).
              </p>
              <p>
                <strong>Study Guides:</strong> Gauranga Priya Das & Swami Ramsukhdas (Gita Sadhak Sanjeevani).
              </p>
              <p>
                <strong>Authentic Visual Resources:</strong> Preserved Kurukshetra manuscripts and temple illustrations from project resources.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: '#8A8577'
          }}
        >
          <div>
            ॥ ॐ तत्सत् ॥ • Srimad Bhagavad Gita — A Divine Digital Experience
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>Dedicated to Truth, Peace & Universal Dharma</span>
            <button
              onClick={scrollToTop}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: '#A67C00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 200ms ease'
              }}
              title="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
