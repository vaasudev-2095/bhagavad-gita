import React, { useState } from 'react';
import { Share2, Copy, Check, Volume2, ArrowRight, Bookmark, Sparkles } from 'lucide-react';
import { versesData } from '../data/versesData';
import { chaptersData } from '../data/chaptersData';
import { divineAudio } from '../utils/audioService';
import { storageService } from '../utils/storageService';

export const DailyVerse = ({ onReadVerse }) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Deterministic daily verse selection based on current date
  const celebratedVerses = versesData.filter(v => v.isCelebrated);
  const today = new Date();
  const dateHash = today.getFullYear() * 372 + (today.getMonth() + 1) * 31 + today.getDate();
  const dailyVerseIndex = dateHash % celebratedVerses.length;
  const verse = celebratedVerses[dailyVerseIndex] || celebratedVerses[0];

  const chapterMeta = chaptersData.find(c => c.num === verse.chapter) || {};
  const isBookmarked = storageService.isBookmarked(verse.id);
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handleCopy = () => {
    const textToCopy = `॥ श्रीमद्भगवद्गीता - अध्याय ${verse.chapter}, श्लोक ${verse.verse} ॥\n\n${verse.sanskrit}\n\n[Transliteration]\n${verse.transliteration}\n\n[English Meaning]\n${verse.translation}${verse.hindi ? `\n\n[हिन्दी अनुवाद]\n${verse.hindi}` : ''}\n\n- Bhagavad Gita App`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleShare = async () => {
    const shareData = {
      title: `Bhagavad Gita - Chapter ${verse.chapter}, Verse ${verse.verse}`,
      text: `${verse.sanskrit}\n\n"${verse.translation}"`,
      url: window.location.href
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or unsupported
      }
    } else {
      handleCopy();
      setShared(true);
      setTimeout(() => setShared(false), 2200);
    }
  };

  const handleRecite = () => {
    if (isSpeaking) {
      divineAudio.stopSpeaking();
      setIsSpeaking(false);
    } else {
      const text = verse.hindi ? `${verse.sanskrit}। ${verse.hindi}` : `${verse.sanskrit}. ${verse.translation}`;
      divineAudio.speakText(text, 'hi-IN');
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 8000);
    }
  };

  const handleBookmarkToggle = () => {
    storageService.toggleBookmark(verse);
    setBookmarked(!bookmarked);
  };

  return (
    <section className="section-wrapper" id="daily-verse" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} color="#D4AF37" />
            <span>DAILY DIVINE CONTEMPLATION</span>
          </div>
          <h2 className="section-title">Verse of the Day</h2>
          <p className="section-subtitle">
            A timeless reflection for {formattedDate}, selected to bring serenity, courage, and discernment to your day.
          </p>
          <div className="golden-divider">
            <div className="line" />
            <span className="symbol">✦ ॐ ✦</span>
            <div className="line" />
          </div>
        </div>

        {/* Dedicated Daily Verse Card */}
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            backgroundColor: '#FFFDF5',
            borderRadius: '24px',
            border: '1.5px solid rgba(212, 175, 55, 0.4)',
            boxShadow: '0 12px 40px -10px rgba(166, 124, 0, 0.1)',
            padding: 'clamp(1.75rem, 4vw, 3rem)',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="daily-verse-container"
        >
          {/* Subtle Decorative Background Mandala Watermark */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '260px',
              height: '260px',
              opacity: 0.05,
              pointerEvents: 'none',
              transform: 'rotate(15deg)'
            }}
          >
            <svg viewBox="0 0 100 100" fill="#D4AF37">
              <circle cx="50" cy="50" r="45" stroke="#A67C00" strokeWidth="2" fill="none" />
              <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" stroke="#A67C00" strokeWidth="1" />
            </svg>
          </div>

          {/* Reference Header Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: '#A67C00',
                  textTransform: 'uppercase'
                }}
              >
                Chapter {verse.chapter} • Verse {verse.verse}
              </span>
              <h3 style={{ fontSize: '1.15rem', color: '#292929', marginTop: '0.2rem' }}>
                {chapterMeta.sanskrit || `Chapter ${verse.chapter}`} ({chapterMeta.english || ''})
              </h3>
            </div>

            {/* Top controls: recite, bookmark, share, copy */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={handleRecite}
                title={isSpeaking ? "Stop recitation" : "Recite Sanskrit verse"}
                aria-label="Recite verse"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '9999px',
                  border: isSpeaking ? '1px solid #D4AF37' : '1px solid rgba(212, 175, 55, 0.25)',
                  backgroundColor: isSpeaking ? '#FAF0D7' : '#FFFFFF',
                  color: '#A67C00',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  transition: 'all 200ms ease'
                }}
              >
                <Volume2 size={16} />
                <span>{isSpeaking ? 'Playing' : 'Pronounce'}</span>
              </button>

              <button
                onClick={handleBookmarkToggle}
                title={bookmarked ? "Remove bookmark" : "Save to bookmarks"}
                aria-label="Bookmark verse"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  backgroundColor: bookmarked ? '#FAF0D7' : '#FFFFFF',
                  color: bookmarked ? '#A67C00' : '#8A8577',
                  transition: 'all 200ms ease'
                }}
              >
                <Bookmark size={16} fill={bookmarked ? "#A67C00" : "none"} />
              </button>

              <button
                onClick={handleCopy}
                title="Copy verse"
                aria-label="Copy verse text"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  backgroundColor: '#FFFFFF',
                  color: copied ? '#2E7D32' : '#8A8577',
                  transition: 'all 200ms ease'
                }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>

              <button
                onClick={handleShare}
                title="Share verse"
                aria-label="Share verse"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  backgroundColor: '#FFFFFF',
                  color: shared ? '#2E7D32' : '#8A8577',
                  transition: 'all 200ms ease'
                }}
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {/* Speaker label if present */}
          {verse.speakerDev && (
            <div
              style={{
                textAlign: 'center',
                fontFamily: "'Tiro Devanagari Sanskrit', serif",
                fontSize: '1.15rem',
                fontWeight: 600,
                color: '#A67C00',
                marginBottom: '1rem'
              }}
            >
              ॥ {verse.speakerDev} ॥
            </div>
          )}

          {/* Sanskrit Shloka in Devanagari */}
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              marginBottom: '1.75rem'
            }}
          >
            <p className="sanskrit-verse" style={{ whiteSpace: 'pre-line' }}>
              {verse.sanskrit}
            </p>
          </div>

          {/* Transliteration */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#A67C00', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '0.4rem' }}>
              ROMAN TRANSLITERATION
            </div>
            <p className="transliteration-text">
              {verse.transliteration}
            </p>
          </div>

          <div className="golden-divider" style={{ margin: '1.5rem auto' }}>
            <div className="line" />
            <span className="symbol">✦</span>
            <div className="line" />
          </div>

          {/* English Translation */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#A67C00', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              ENGLISH MEANING
            </div>
            <p style={{ fontSize: '1.15rem', color: '#292929', lineHeight: 1.75, fontWeight: 500 }}>
              {verse.translation}
            </p>
          </div>

          {/* Hindi Meaning if available */}
          {verse.hindi && (
            <div style={{ marginBottom: '2rem', padding: '1.25rem', backgroundColor: '#FAF6EA', borderRadius: '12px', borderLeft: '3px solid #D4AF37' }}>
              <div style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: '0.82rem', fontWeight: 700, color: '#A67C00', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                हिन्दी भावार्थ
              </div>
              <p style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: '1.05rem', color: '#292929', lineHeight: 1.7 }}>
                {verse.hindi}
              </p>
            </div>
          )}

          {/* Bottom CTA to read full verse with commentary */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button
              onClick={() => onReadVerse(verse.chapter, verse.verse)}
              className="btn-primary"
              style={{ padding: '0.85rem 2rem' }}
            >
              <span>Read Full Verse & Commentary</span>
              <ArrowRight size={17} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
