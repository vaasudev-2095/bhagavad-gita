import React, { useState } from 'react';
import { wisdomTopics } from '../data/wisdomTopics';
import { 
  Activity, 
  Compass, 
  Heart, 
  Target, 
  Shield, 
  Flame, 
  Award, 
  Smile, 
  ArrowRight,
  BookOpen,
  Sparkles
} from 'lucide-react';

const iconMap = {
  Activity,
  Compass,
  Heart,
  Target,
  Shield,
  Flame,
  Award,
  Smile
};

export const WisdomLife = ({ onOpenVerse }) => {
  const [selectedTopicId, setSelectedTopicId] = useState(wisdomTopics[0].id);

  const activeTopic = wisdomTopics.find((t) => t.id === selectedTopicId) || wisdomTopics[0];
  const IconComponent = iconMap[activeTopic.icon] || Compass;

  return (
    <section className="section-wrapper" id="wisdom" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} color="#D4AF37" />
            <span>PRACTICAL APPLICATION • जीवन दर्शन</span>
          </div>
          <h2 className="section-title">Wisdom for Everyday Life</h2>
          <p className="section-subtitle">
            The Bhagavad Gita is not an abstract theory, but an indispensable handbook for the inner battlefield of modern daily life.
          </p>

          <div className="golden-divider">
            <div className="line" />
            <span className="symbol">✦ ॐ ✦</span>
            <div className="line" />
          </div>
        </div>

        {/* Categories Pill Buttons / Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '0.85rem',
            marginBottom: '3rem'
          }}
        >
          {wisdomTopics.map((topic) => {
            const isSelected = topic.id === selectedTopicId;
            const Icon = iconMap[topic.icon] || Compass;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.1rem 0.75rem',
                  borderRadius: '16px',
                  border: isSelected ? '1.5px solid #D4AF37' : '1px solid rgba(212, 175, 55, 0.22)',
                  backgroundColor: isSelected ? '#FFFDF5' : '#FFFFFF',
                  color: isSelected ? '#A67C00' : '#47443E',
                  boxShadow: isSelected ? '0 6px 20px rgba(166, 124, 0, 0.12)' : '0 2px 8px rgba(0,0,0,0.02)',
                  transition: 'all 200ms ease',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? '#FAF0D7' : '#F7F4EA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.6rem',
                    color: '#A67C00'
                  }}
                >
                  <Icon size={18} />
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.25 }}>
                  {topic.title}
                </span>
                <span style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: '0.75rem', color: '#8A8577', marginTop: '0.2rem' }}>
                  {topic.sanskritTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Topic Detailed Card */}
        <div
          style={{
            backgroundColor: '#FFFDF5',
            borderRadius: '24px',
            border: '1.5px solid rgba(212, 175, 55, 0.35)',
            boxShadow: '0 12px 35px -5px rgba(166, 124, 0, 0.08)',
            padding: 'clamp(1.75rem, 4vw, 3rem)',
            position: 'relative'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }} className="wisdom-detail-grid">
            
            {/* Left Column: Concept & Modern Guidance */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#FAF0D7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#A67C00'
                  }}
                >
                  <IconComponent size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: '#292929', fontWeight: 700 }}>
                    {activeTopic.title}
                  </h3>
                  <span style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: '0.95rem', color: '#A67C00', fontWeight: 600 }}>
                    {activeTopic.sanskritTitle}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '1.05rem', color: '#3D3D3D', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {activeTopic.description}
              </p>

              {/* Practical Modern Life Application Box */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '1.35rem 1.6rem',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#A67C00', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  PRACTICAL APPLICATION
                </div>
                <p style={{ fontSize: '0.96rem', color: '#4A463E', lineHeight: 1.65 }}>
                  {activeTopic.practicalAdvice}
                </p>
              </div>

              {/* Associated Verses Quick Links */}
              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6B685F', display: 'block', marginBottom: '0.6rem' }}>
                  Associated Verses in the Gita:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {activeTopic.associatedVerses.map((ref) => {
                    const [ch, v] = ref.split('.');
                    return (
                      <button
                        key={ref}
                        onClick={() => onOpenVerse(Number(ch), v)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.35rem 0.85rem',
                          borderRadius: '9999px',
                          border: '1px solid #D4AF37',
                          backgroundColor: '#FFFFFF',
                          color: '#A67C00',
                          fontFamily: "'Cinzel', serif",
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          transition: 'all 150ms ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#FAF0D7';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                        }}
                      >
                        <BookOpen size={12} />
                        <span>BG {ref}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Anchoring Scripture Verse */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '1.75rem',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 16px rgba(166, 124, 0, 0.05)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#A67C00', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    KEY SCRIPTURE ANCHOR
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      backgroundColor: '#FAF0D7',
                      color: '#A67C00',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px'
                    }}
                  >
                    BG {activeTopic.keyVerseRef}
                  </span>
                </div>

                {/* Shloka */}
                <p
                  style={{
                    fontFamily: "'Tiro Devanagari Sanskrit', serif",
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#292929',
                    lineHeight: 1.7,
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}
                >
                  {activeTopic.sampleSanskrit}
                </p>

                {/* Translation */}
                <p style={{ fontSize: '0.96rem', color: '#575249', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '1.5rem', textAlign: 'center' }}>
                  "{activeTopic.translation}"
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={() => {
                    const [ch, v] = activeTopic.keyVerseRef.split('.');
                    onOpenVerse(Number(ch), v);
                  }}
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
                >
                  <span>Explore Verse BG {activeTopic.keyVerseRef} in Reader</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 900px) {
          .wisdom-detail-grid {
            grid-template-columns: 1.25fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
