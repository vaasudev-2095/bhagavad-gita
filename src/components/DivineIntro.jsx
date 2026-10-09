import React, { useEffect, useState } from 'react';
import { storageService } from '../utils/storageService';

/**
 * Opening Experience — Divine Intro
 * Cinematic intro animation with sacred geometry mandala stroke reveal,
 * golden ambient glow, and divine Sanskrit typography.
 */
export const DivineIntro = ({ onComplete }) => {
  const [fadingOut, setFadingOut] = useState(false);

  const handleSkip = () => {
    setFadingOut(true);
    storageService.setIntroSeen();
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  useEffect(() => {
    // Auto transition after 3.6s
    const timer = setTimeout(() => {
      handleSkip();
    }, 3600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#FFFDF5',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadingOut ? 0 : 1,
        transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: fadingOut ? 'none' : 'auto',
        overflow: 'hidden'
      }}
      role="dialog"
      aria-label="Divine Opening Experience"
    >
      {/* Golden central atmospheric glow */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.22) 0%, rgba(255, 217, 102, 0.1) 40%, transparent 70%)',
          animation: 'introGlowPulse 3s ease-in-out infinite alternate',
          pointerEvents: 'none'
        }}
      />

      {/* Sacred Mandala SVG with stroke animation */}
      <div style={{ position: 'relative', width: '220px', height: '220px', marginBottom: '2rem' }}>
        <svg
          viewBox="0 0 200 200"
          style={{
            width: '100%',
            height: '100%',
            animation: 'introRotateMandala 24s linear infinite'
          }}
        >
          {/* Outer circle */}
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1.5"
            strokeDasharray="600"
            strokeDashoffset="600"
            style={{ animation: 'introDrawStroke 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' }}
          />
          {/* Inner petal ring */}
          <circle
            cx="100"
            cy="100"
            r="68"
            fill="none"
            stroke="#FFD966"
            strokeWidth="1"
            strokeDasharray="450"
            strokeDashoffset="450"
            style={{ animation: 'introDrawStroke 2.4s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s forwards' }}
          />
          {/* 8-fold sacred geometric petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <path
              key={i}
              d={`M 100 100 C ${100 + 40 * Math.cos((angle - 20) * Math.PI / 180)} ${100 + 40 * Math.sin((angle - 20) * Math.PI / 180)}, ${100 + 75 * Math.cos(angle * Math.PI / 180)} ${100 + 75 * Math.sin(angle * Math.PI / 180)}, ${100 + 85 * Math.cos(angle * Math.PI / 180)} ${100 + 85 * Math.sin(angle * Math.PI / 180)}`}
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.2"
              strokeDasharray="150"
              strokeDashoffset="150"
              style={{
                animation: `introDrawStroke 2s cubic-bezier(0.2, 0.8, 0.2, 1) ${0.2 + i * 0.08}s forwards`
              }}
            />
          ))}
          {/* Center Sacred Om */}
          <text
            x="100"
            y="114"
            textAnchor="middle"
            fill="#A67C00"
            fontSize="42"
            fontFamily="'Tiro Devanagari Sanskrit', serif"
            style={{
              opacity: 0,
              animation: 'introFadeIn 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.8s forwards'
            }}
          >
            ॐ
          </text>
        </svg>
      </div>

      {/* Sanskrit title */}
      <h1
        style={{
          fontFamily: "'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif",
          fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
          fontWeight: 700,
          color: '#292929',
          letterSpacing: '0.04em',
          textAlign: 'center',
          opacity: 0,
          transform: 'translateY(16px)',
          animation: 'introRevealTitle 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s forwards'
        }}
      >
        श्रीमद्भगवद्गीता
      </h1>

      {/* Expanding golden horizontal divider */}
      <div
        style={{
          width: '0px',
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
          margin: '1rem 0',
          animation: 'introExpandLine 1.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.9s forwards'
        }}
      />

      {/* English title */}
      <p
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          fontWeight: 600,
          letterSpacing: '0.28em',
          color: '#A67C00',
          textTransform: 'uppercase',
          textAlign: 'center',
          opacity: 0,
          transform: 'translateY(10px)',
          animation: 'introRevealTitle 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) 1.2s forwards'
        }}
      >
        Bhagavad Gita
      </p>

      <p
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '0.82rem',
          letterSpacing: '0.12em',
          color: '#6B685F',
          marginTop: '0.5rem',
          opacity: 0,
          animation: 'introFadeIn 1s ease 1.6s forwards'
        }}
      >
        A Divine Digital Experience
      </p>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          padding: '0.65rem 1.8rem',
          borderRadius: '9999px',
          border: '1.5px solid #D4AF37',
          backgroundColor: '#FFFFFF',
          color: '#A67C00',
          fontFamily: "'Cinzel', serif",
          fontSize: '0.85rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          boxShadow: '0 4px 14px rgba(212, 175, 55, 0.2)',
          transition: 'all 200ms ease',
          opacity: 1
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#FFFDF5';
          e.currentTarget.style.borderColor = '#D4AF37';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#FFFFFF';
          e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.35)';
        }}
      >
        Enter Website →
      </button>

      <style>{`
        @keyframes introDrawStroke {
          to { stroke-dashoffset: 0; }
        }
        @keyframes introFadeIn {
          to { opacity: 1; }
        }
        @keyframes introRevealTitle {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes introExpandLine {
          to { width: 260px; }
        }
        @keyframes introRotateMandala {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes introGlowPulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.15); opacity: 0.95; }
        }
      `}</style>
    </div>
  );
};
