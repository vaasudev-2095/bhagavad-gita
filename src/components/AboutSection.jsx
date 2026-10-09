import React from 'react';
import { BookOpen, Sparkles, Shield, Compass, Landmark, Heart } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section className="section-wrapper" id="about" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Landmark size={14} color="#D4AF37" />
            <span>SACRED HERITAGE & ORIGINS • गीता माहात्म्य</span>
          </div>
          <h2 className="section-title">About the Bhagavad Gita</h2>
          <p className="section-subtitle">
            Regarded as the crown jewel of Indian spiritual philosophy, the Bhagavad Gita occurs within the Bhishma Parva of the ancient epic Mahabharata.
          </p>

          <div className="golden-divider">
            <div className="line" />
            <span className="symbol">✦ ॐ ✦</span>
            <div className="line" />
          </div>
        </div>

        {/* Narrative Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: '4rem'
          }}
          className="about-grid"
        >
          {/* Left Column: Authentic Artwork Frame */}
          <div>
            <div
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1.5px solid rgba(212, 175, 55, 0.4)',
                boxShadow: '0 16px 40px -10px rgba(166, 124, 0, 0.15)',
                position: 'relative',
                backgroundColor: '#FFFDF5'
              }}
            >
              <img
                src="/assets/gita-cover.jpg"
                alt="Bhagavad Gita As It Is scripture cover edition"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  maxHeight: '480px',
                  objectFit: 'cover'
                }}
              />
              <div
                style={{
                  padding: '1.25rem',
                  backgroundColor: '#FFFFFF',
                  borderTop: '1px solid rgba(212, 175, 55, 0.2)'
                }}
              >
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.92rem', fontWeight: 700, color: '#A67C00' }}>
                  Authentic Manuscript Tradition
                </div>
                <div style={{ fontSize: '0.8rem', color: '#6B685F' }}>
                  700 Shlokas • 18 Adhyayas • Compiled by Maharshi Veda Vyasa
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Historical & Philosophical Narrative */}
          <div>
            <h3 style={{ fontSize: '1.85rem', color: '#292929', fontWeight: 800, marginBottom: '1.25rem' }}>
              The Setting: Kurukshetra & The Crisis of Arjuna
            </h3>

            <p style={{ fontSize: '1.02rem', color: '#4A463E', lineHeight: 1.75, marginBottom: '1.2rem' }}>
              The dialogue opens on the plain of <strong>Dharmakshetra Kurukshetra</strong>, where two colossal armies—the righteous Pandavas and the ambitious Kauravas—stand assembled for a war to restore cosmic balance.
            </p>

            <p style={{ fontSize: '1.02rem', color: '#4A463E', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              Arjuna, the greatest archer of his age, commands his divine charioteer Lord Krishna to place their chariot between the opposing ranks. Seeing beloved teachers, revered elders like Bhishma, cousins, and friends, Arjuna is stricken with acute existential grief (<em>Vishada</em>), dropping his Gandiva bow and refusing to fight.
            </p>

            {/* Three Hexads (Shatkas) Structure Box */}
            <div
              style={{
                backgroundColor: '#FFFDF5',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#A67C00', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                THE TRIPLE STRUCTURE (TRI-SHATKA)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <strong style={{ color: '#292929', display: 'block', fontSize: '0.9rem' }}>Karma Shatka (Ch. 1–6)</strong>
                  <span style={{ fontSize: '0.8rem', color: '#6B685F' }}>Focuses on the nature of the individual soul (Tvam) and selfless action.</span>
                </div>
                <div>
                  <strong style={{ color: '#292929', display: 'block', fontSize: '0.9rem' }}>Bhakti Shatka (Ch. 7–12)</strong>
                  <span style={{ fontSize: '0.8rem', color: '#6B685F' }}>Reveals the cosmic glory of God (Tat) and universal devotion.</span>
                </div>
                <div>
                  <strong style={{ color: '#292929', display: 'block', fontSize: '0.9rem' }}>Jnana Shatka (Ch. 13–18)</strong>
                  <span style={{ fontSize: '0.8rem', color: '#6B685F' }}>Synthesizes non-dual knowledge (Asi), liberation, and ultimate surrender.</span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', color: '#6B685F', lineHeight: 1.7 }}>
              Through eighteen stages, Krishna elevates Arjuna from personal despondency to transcendental clarity, culminating in the sublime call of <em>Sharanagati</em>: unreserved surrender to divine love and fearless fulfillment of his duty.
            </p>
          </div>
        </div>

        {/* The Enduring Global Relevance Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {[
            {
              icon: Compass,
              title: "Ethical Clarity in Crisis",
              desc: "Provides an actionable framework for moral decision-making when duties conflict and emotions overwhelm reason."
            },
            {
              icon: Shield,
              title: "Fearlessness & Purpose",
              desc: "Fosters profound inner strength by distinguishing between the imperishable soul and the transient physical vehicle."
            },
            {
              icon: Heart,
              title: "Universal Compassion",
              desc: "Teaches the practitioner to behold the divine spark in all beings with equanimity, dignity, and love."
            },
            {
              icon: Sparkles,
              title: "Living Yoga in Everyday Life",
              desc: "Demystifies yoga from monastic seclusion into active, dynamic, consecrated excellence in the modern world."
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFDF5',
                  padding: '1.6rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#FAF0D7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#A67C00',
                    marginBottom: '1rem'
                  }}
                >
                  <Icon size={20} />
                </div>
                <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.05rem', color: '#292929', marginBottom: '0.5rem', fontWeight: 700 }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#6B685F', lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        @media (min-width: 960px) {
          .about-grid {
            grid-template-columns: 0.85fr 1.15fr !important;
          }
        }
      `}</style>
    </section>
  );
};
