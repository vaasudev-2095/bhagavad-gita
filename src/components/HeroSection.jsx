import React from 'react';
import { ArrowRight, BookOpen, Sparkles, Feather } from 'lucide-react';

export const HeroSection = ({ onExploreChapters, onBeginReading, onOpenVerse }) => {
  return (
    <header
      id="hero"
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '6.5rem',
        paddingBottom: '4rem',
        backgroundColor: '#FFFDF5',
        backgroundImage: 'radial-gradient(ellipse at 50% 20%, rgba(255, 217, 102, 0.12) 0%, transparent 75%)',
        overflow: 'hidden'
      }}
    >
      {/* Ambient background light orbs */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(255, 217, 102, 0.04) 55%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3.5rem', alignItems: 'center' }} className="hero-grid">
          
          {/* Left / Top Column: Content */}
          <div style={{ maxWidth: '640px' }} className="hero-content-col">
            
            {/* Spiritual Pill Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.42rem 1.15rem',
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                color: '#A67C00',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                marginBottom: '1.5rem',
                boxShadow: '0 2px 10px rgba(166, 124, 0, 0.05)'
              }}
            >
              <Sparkles size={14} color="#D4AF37" />
              <span>THE ETERNAL SONG OF GOD • कुरुक्षेत्र सम्वाद</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.3rem, 4.6vw, 3.75rem)',
                fontWeight: 800,
                color: '#292929',
                lineHeight: 1.18,
                letterSpacing: '-0.025em',
                marginBottom: '1.4rem'
              }}
            >
              Discover the <span style={{ color: '#A67C00', position: 'relative' }}>
                Eternal Wisdom
                <svg
                  style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: 0,
                    width: '100%',
                    height: '8px',
                    overflow: 'visible'
                  }}
                  viewBox="0 0 200 8"
                  fill="none"
                >
                  <path
                    d="M2 6 C 50 1, 150 1, 198 6"
                    stroke="#D4AF37"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span> of the Bhagavad Gita
            </h1>

            {/* Supporting Text */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
                color: '#524F48',
                lineHeight: 1.75,
                marginBottom: '2rem'
              }}
            >
              Ancient wisdom for the questions of modern life. Explore the timeless dialogue between 
              Lord Krishna and Arjuna, one verse at a time.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <button
                onClick={onExploreChapters}
                className="btn-primary"
                style={{ fontSize: '1rem', padding: '0.95rem 2.2rem' }}
              >
                <span>Explore the Gita</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onBeginReading}
                className="btn-secondary"
                style={{ fontSize: '1rem', padding: '0.95rem 2.2rem' }}
              >
                <BookOpen size={18} color="#A67C00" />
                <span>Begin Reading</span>
              </button>
            </div>

            {/* Verified Sanskrit Quote Card */}
            <div
              onClick={() => onOpenVerse(2, '47')}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                boxShadow: '0 4px 20px rgba(166, 124, 0, 0.06)',
                cursor: 'pointer',
                transition: 'all 250ms ease',
                position: 'relative'
              }}
              className="hero-quote-card"
              title="Click to read Chapter 2, Verse 47 in full"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#A67C00', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  FEATURED VERSE • BG 2.47
                </span>
                <span style={{ fontSize: '0.75rem', color: '#8A8577' }}>Read Verse →</span>
              </div>
              <p
                style={{
                  fontFamily: "'Tiro Devanagari Sanskrit', serif",
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#292929',
                  lineHeight: 1.6,
                  marginBottom: '0.4rem'
                }}
              >
                कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥
              </p>
              <p style={{ fontSize: '0.88rem', color: '#6B685F', fontStyle: 'italic', lineHeight: 1.5 }}>
                "Thy right is to work only, but never with its fruits; let not the fruits of actions be thy motive."
              </p>
            </div>

          </div>

          {/* Right / Bottom Column: Layered Krishna-Arjuna Chariot Artwork */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }} className="hero-image-col">
            
            {/* Background Decorative Frame */}
            <div
              style={{
                position: 'relative',
                maxWidth: '480px',
                width: '100%',
                borderRadius: '24px',
                padding: '10px',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.4) 0%, rgba(255, 217, 102, 0.2) 100%)',
                boxShadow: '0 20px 50px -10px rgba(166, 124, 0, 0.22)',
                transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="hero-frame"
            >
              <div
                style={{
                  borderRadius: '18px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  position: 'relative'
                }}
              >
                <img
                  src="/assets/krishna-arjuna-chariot.png"
                  alt="Lord Krishna giving the Bhagavad Gita teachings to Arjuna on the golden chariot at Kurukshetra"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover',
                    maxHeight: '560px',
                    filter: 'contrast(1.02) saturate(1.04)'
                  }}
                  loading="eager"
                />

                {/* Golden corner flourishes */}
                <div style={{ position: 'absolute', top: 12, left: 12, width: 24, height: 24, borderTop: '2px solid #D4AF37', borderLeft: '2px solid #D4AF37' }} />
                <div style={{ position: 'absolute', top: 12, right: 12, width: 24, height: 24, borderTop: '2px solid #D4AF37', borderRight: '2px solid #D4AF37' }} />
                <div style={{ position: 'absolute', bottom: 12, left: 12, width: 24, height: 24, borderBottom: '2px solid #D4AF37', borderLeft: '2px solid #D4AF37' }} />
                <div style={{ position: 'absolute', bottom: 12, right: 12, width: 24, height: 24, borderBottom: '2px solid #D4AF37', borderRight: '2px solid #D4AF37' }} />

                {/* Caption badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.25rem 1rem 0.85rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
                    color: '#FFFDF5',
                    textAlign: 'center'
                  }}
                >
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', color: '#FFD966' }}>
                    भगवान् श्रीकृष्ण एवं धनुर्धर अर्जुन
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#E8E3D5', opacity: 0.9 }}>
                    Kurukshetra Battlefield • Authentic Scripture Resource
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Four Key Pillars Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginTop: '4rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(212, 175, 55, 0.2)'
          }}
        >
          {[
            { num: '18', label: 'Sacred Chapters', desc: 'From Despondency to Supreme Liberation' },
            { num: '700', label: 'Immortal Verses', desc: 'Authentic Sanskrit Shlokas & Meanings' },
            { num: '3', label: 'Yogic Paths', desc: 'Karma, Bhakti, and Jnana Yoga' },
            { num: '5000+', label: 'Years of Wisdom', desc: 'Timeless spiritual dialogue for modern humanity' }
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.25rem',
                borderRadius: '14px',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: '1.85rem', fontWeight: 800, color: '#A67C00', lineHeight: 1.1 }}>
                {stat.num}
              </div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.9rem', fontWeight: 600, color: '#292929', margin: '0.25rem 0' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#6B685F' }}>
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
        .hero-quote-card:hover {
          transform: translateY(-2px);
          border-color: #D4AF37 !important;
          box-shadow: 0 8px 24px rgba(166, 124, 0, 0.12) !important;
        }
        .hero-frame:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </header>
  );
};
