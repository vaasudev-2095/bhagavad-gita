import React from 'react';
import { BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ChapterCard = ({ chapter, isCompleted, onSelectChapter }) => {
  return (
    <div
      onClick={() => onSelectChapter(chapter.num)}
      className="gita-card chapter-card"
      style={{
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        height: '100%'
      }}
    >
      <div>
        {/* Top meta row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: isCompleted ? '#E8F5E9' : '#FFFDF5',
              border: isCompleted ? '1.5px solid #4CAF50' : '1.5px solid #D4AF37',
              color: isCompleted ? '#2E7D32' : '#A67C00',
              fontFamily: "'Cinzel', serif",
              fontSize: '0.9rem',
              fontWeight: 700
            }}
          >
            {chapter.num}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontSize: '0.78rem',
                color: '#6B685F',
                backgroundColor: '#F5EEDC',
                padding: '0.2rem 0.65rem',
                borderRadius: '9999px',
                fontWeight: 600
              }}
            >
              {chapter.verses} Verses
            </span>

            {isCompleted && (
              <CheckCircle2 size={18} color="#2E7D32" title="Chapter marked as completed" />
            )}
          </div>
        </div>

        {/* Sanskrit Title */}
        <h3
          style={{
            fontFamily: "'Tiro Devanagari Sanskrit', serif",
            fontSize: '1.35rem',
            fontWeight: 700,
            color: '#292929',
            marginBottom: '0.25rem',
            lineHeight: 1.3
          }}
        >
          {chapter.sanskrit}
        </h3>

        {/* English Title & Transliteration */}
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.82rem', fontWeight: 600, color: '#A67C00', letterSpacing: '0.04em', marginBottom: '0.85rem' }}>
          {chapter.translit}
        </div>

        <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#3D3D3D', marginBottom: '0.65rem' }}>
          {chapter.english}
        </p>

        {/* Description snippet */}
        <p
          style={{
            fontSize: '0.86rem',
            color: '#6B685F',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: '1.25rem'
          }}
        >
          {chapter.summary}
        </p>
      </div>

      {/* Bottom Action Row */}
      <div
        style={{
          paddingTop: '1rem',
          borderTop: '1px solid rgba(212, 175, 55, 0.18)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span style={{ fontSize: '0.82rem', color: '#A67C00', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <BookOpen size={14} />
          <span>Read Chapter</span>
        </span>

        <span
          className="card-arrow"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: '#FAF0D7',
            color: '#A67C00',
            transition: 'transform 200ms ease'
          }}
        >
          <ArrowRight size={14} />
        </span>
      </div>

      <style>{`
        .chapter-card:hover .card-arrow {
          transform: translateX(4px);
          background-color: #D4AF37;
          color: #FFFFFF;
        }
      `}</style>
    </div>
  );
};
