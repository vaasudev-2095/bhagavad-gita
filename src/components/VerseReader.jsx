import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Share2, 
  Copy, 
  Check, 
  Volume2, 
  Maximize2, 
  Minimize2, 
  List, 
  CheckCircle, 
  ArrowLeft,
  Sparkles,
  Search,
  Type
} from 'lucide-react';
import { chaptersData } from '../data/chaptersData';
import { versesData } from '../data/versesData';
import { divineAudio } from '../utils/audioService';
import { storageService } from '../utils/storageService';

export const VerseReader = ({ 
  initialChapter = 1, 
  initialVerse = '1', 
  onBackToHome, 
  onOpenSearch 
}) => {
  const [currentChapter, setCurrentChapter] = useState(Number(initialChapter) || 1);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [fontSize, setFontSize] = useState('md'); // sm, md, lg, xl
  const [zenMode, setZenMode] = useState(false);
  const [verseListOpen, setVerseListOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Verses of current chapter
  const chapterVerses = versesData.filter((v) => v.chapter === currentChapter);
  const chapterMeta = chaptersData.find((c) => c.num === currentChapter) || chaptersData[0];

  // Set initial verse on mount or prop changes
  useEffect(() => {
    if (initialChapter) {
      setCurrentChapter(Number(initialChapter));
    }
  }, [initialChapter]);

  useEffect(() => {
    if (initialVerse && chapterVerses.length > 0) {
      const idx = chapterVerses.findIndex((v) => String(v.verse) === String(initialVerse));
      if (idx !== -1) {
        setCurrentVerseIndex(idx);
      } else {
        setCurrentVerseIndex(0);
      }
    } else {
      setCurrentVerseIndex(0);
    }
  }, [initialVerse, currentChapter]);

  const verse = chapterVerses[currentVerseIndex] || chapterVerses[0] || {};
  const isBookmarked = verse.id ? storageService.isBookmarked(verse.id) : false;
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  useEffect(() => {
    if (verse.id) {
      setBookmarked(storageService.isBookmarked(verse.id));
      storageService.setLastRead(currentChapter, verse.verse);
    }
  }, [verse]);

  // Keyboard navigation: Left/Right arrows
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'KeyL') {
        handleNextVerse();
      } else if (e.key === 'ArrowLeft' || e.key === 'KeyH') {
        handlePrevVerse();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentVerseIndex, chapterVerses.length]);

  const handleNextVerse = () => {
    if (currentVerseIndex < chapterVerses.length - 1) {
      setCurrentVerseIndex(currentVerseIndex + 1);
    } else if (currentChapter < 18) {
      // Advance to next chapter verse 1
      setCurrentChapter(currentChapter + 1);
      setCurrentVerseIndex(0);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevVerse = () => {
    if (currentVerseIndex > 0) {
      setCurrentVerseIndex(currentVerseIndex - 1);
    } else if (currentChapter > 1) {
      // Go to previous chapter last verse
      const prevChVerses = versesData.filter((v) => v.chapter === currentChapter - 1);
      setCurrentChapter(currentChapter - 1);
      setCurrentVerseIndex(prevChVerses.length - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookmarkToggle = () => {
    if (!verse.id) return;
    storageService.toggleBookmark(verse);
    setBookmarked(!bookmarked);
  };

  const handleCopy = () => {
    const textToCopy = `॥ श्रीमद्भगवद्गीता - अध्याय ${verse.chapter}, श्लोक ${verse.verse} ॥\n\n${verse.sanskrit}\n\n[Transliteration]\n${verse.transliteration}\n\n[English Translation]\n${verse.translation}${verse.hindi ? `\n\n[हिन्दी भावार्थ]\n${verse.hindi}` : ''}${verse.commentary ? `\n\n[Commentary]\n${verse.commentary}` : ''}\n\n- Bhagavad Gita App`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      } catch {}
    } else {
      handleCopy();
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
      setTimeout(() => setIsSpeaking(false), 10000);
    }
  };

  const completedChapters = storageService.getCompletedChapters();
  const isChapterCompleted = completedChapters.includes(currentChapter);
  const handleToggleComplete = () => {
    storageService.toggleChapterCompleted(currentChapter);
  };

  // Font sizing CSS values
  const fontSizeValues = {
    sm: { sanskrit: '1.25rem', body: '0.95rem' },
    md: { sanskrit: '1.5rem', body: '1.1rem' },
    lg: { sanskrit: '1.8rem', body: '1.25rem' },
    xl: { sanskrit: '2.1rem', body: '1.4rem' }
  };

  const progressPercent = chapterVerses.length > 0 
    ? Math.round(((currentVerseIndex + 1) / chapterVerses.length) * 100) 
    : 0;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FFFDF5',
        paddingTop: zenMode ? '1.5rem' : '5.5rem',
        paddingBottom: '5rem',
        transition: 'padding-top 300ms ease'
      }}
    >
      {/* Top Reading Bar */}
      <div
        style={{
          position: 'sticky',
          top: zenMode ? 0 : '4.5rem',
          zIndex: 900,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          padding: '0.75rem 0',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
          
          {/* Chapter Selector & Back Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {!zenMode && (
              <button
                onClick={onBackToHome}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  backgroundColor: '#FFFFFF',
                  color: '#6B685F',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}
              >
                <ArrowLeft size={14} />
                <span>Home</span>
              </button>
            )}

            {/* Chapter Select Dropdown */}
            <select
              value={currentChapter}
              onChange={(e) => {
                setCurrentChapter(Number(e.target.value));
                setCurrentVerseIndex(0);
              }}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '0.88rem',
                fontWeight: 700,
                color: '#A67C00',
                padding: '0.45rem 0.95rem',
                borderRadius: '9999px',
                border: '1.5px solid #D4AF37',
                backgroundColor: '#FFFDF5',
                cursor: 'pointer',
                outline: 'none'
              }}
              aria-label="Select Chapter"
            >
              {chaptersData.map((ch) => (
                <option key={ch.num} value={ch.num}>
                  Ch {ch.num}: {ch.sanskrit} ({ch.verses}v)
                </option>
              ))}
            </select>
          </div>

          {/* Center Verse Stepper & Verse List Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handlePrevVerse}
              disabled={currentChapter === 1 && currentVerseIndex === 0}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                backgroundColor: '#FFFFFF',
                color: (currentChapter === 1 && currentVerseIndex === 0) ? '#C4BCAB' : '#A67C00',
                cursor: (currentChapter === 1 && currentVerseIndex === 0) ? 'not-allowed' : 'pointer'
              }}
              title="Previous Verse (Left Arrow)"
              aria-label="Previous Verse"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => setVerseListOpen(!verseListOpen)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                backgroundColor: '#FAF0D7',
                border: '1px solid #D4AF37',
                fontFamily: "'Cinzel', serif",
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#A67C00',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              title="Click to jump to any verse in this chapter"
            >
              <List size={14} />
              <span>Verse {verse.verse} / {chapterVerses.length}</span>
            </button>

            <button
              onClick={handleNextVerse}
              disabled={currentChapter === 18 && currentVerseIndex === chapterVerses.length - 1}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                backgroundColor: '#FFFFFF',
                color: (currentChapter === 18 && currentVerseIndex === chapterVerses.length - 1) ? '#C4BCAB' : '#A67C00',
                cursor: (currentChapter === 18 && currentVerseIndex === chapterVerses.length - 1) ? 'not-allowed' : 'pointer'
              }}
              title="Next Verse (Right Arrow)"
              aria-label="Next Verse"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Right Action Controls: Font size, Zen mode, Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            
            {/* Font Size Cycle */}
            <div
              style={{
                display: 'flex',
                backgroundColor: '#F5EEDC',
                borderRadius: '9999px',
                padding: '2px'
              }}
            >
              {['sm', 'md', 'lg', 'xl'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setFontSize(sz)}
                  style={{
                    padding: '0.25rem 0.55rem',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: fontSize === sz ? 700 : 500,
                    backgroundColor: fontSize === sz ? '#FFFFFF' : 'transparent',
                    color: fontSize === sz ? '#A67C00' : '#6B685F',
                    boxShadow: fontSize === sz ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                  title={`Text size ${sz.toUpperCase()}`}
                >
                  {sz.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Zen Distraction-Free Mode Toggle */}
            <button
              onClick={() => setZenMode(!zenMode)}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                backgroundColor: zenMode ? '#FAF0D7' : '#FFFFFF',
                color: '#A67C00'
              }}
              title={zenMode ? "Exit Zen Mode" : "Enter Distraction-Free Zen Mode"}
              aria-label="Toggle Zen Mode"
            >
              {zenMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            {/* In-reader Search Trigger */}
            <button
              onClick={onOpenSearch}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                backgroundColor: '#FFFFFF',
                color: '#A67C00'
              }}
              title="Search Scripture"
              aria-label="Search Scripture"
            >
              <Search size={16} />
            </button>

          </div>

        </div>

        {/* Chapter Verse Progress Bar */}
        <div style={{ width: '100%', height: '3px', backgroundColor: '#F0EAD6', marginTop: '0.5rem' }}>
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              backgroundColor: '#D4AF37',
              transition: 'width 250ms ease'
            }}
          />
        </div>
      </div>

      {/* Verses Picker Grid Drawer */}
      {verseListOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1.5px solid #D4AF37',
            padding: '1.5rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
          }}
        >
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.9rem', fontWeight: 700, color: '#A67C00' }}>
                Jump to Verse in Chapter {currentChapter} ({chapterVerses.length} total)
              </span>
              <button
                onClick={() => setVerseListOpen(false)}
                style={{ fontSize: '0.8rem', color: '#6B685F', padding: '0.2rem 0.6rem', border: '1px solid #D4AF37', borderRadius: '4px' }}
              >
                Close ✕
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto', padding: '0.5rem 0' }}>
              {chapterVerses.map((v, idx) => {
                const isActive = idx === currentVerseIndex;
                return (
                  <button
                    key={v.id || idx}
                    onClick={() => {
                      setCurrentVerseIndex(idx);
                      setVerseListOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 800 : 500,
                      border: isActive ? '1.5px solid #D4AF37' : '1px solid rgba(212, 175, 55, 0.25)',
                      backgroundColor: isActive ? '#FAF0D7' : '#FFFFFF',
                      color: isActive ? '#A67C00' : '#292929',
                      boxShadow: isActive ? '0 2px 8px rgba(212, 175, 55, 0.2)' : 'none'
                    }}
                  >
                    {v.verse}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Scripture Container */}
      <div className="container" style={{ maxWidth: '860px', marginTop: '2.5rem' }}>
        
        {/* Chapter Overview Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.82rem', fontWeight: 700, color: '#A67C00', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            CHAPTER {chapterMeta.num} • {chapterMeta.translit}
          </span>
          <h1 style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif", fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#292929', margin: '0.4rem 0' }}>
            {chapterMeta.sanskrit}
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#6B685F', fontStyle: 'italic' }}>
            {chapterMeta.english}
          </p>
          <div className="golden-divider" style={{ margin: '1rem auto 0' }}>
            <div className="line" />
            <span className="symbol">✦ ॐ ✦</span>
            <div className="line" />
          </div>
        </div>

        {/* Verse Card */}
        <article
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1.5px solid rgba(212, 175, 55, 0.35)',
            boxShadow: '0 10px 35px -5px rgba(166, 124, 0, 0.08)',
            padding: 'clamp(1.75rem, 4vw, 3.25rem)',
            position: 'relative'
          }}
        >
          {/* Top Verse Controls Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '1.25rem',
              marginBottom: '1.75rem',
              borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#A67C00',
                  letterSpacing: '0.08em'
                }}
              >
                BG {verse.chapter}.{verse.verse}
              </span>
              {verse.themes && verse.themes.length > 0 && (
                <span
                  style={{
                    marginLeft: '0.75rem',
                    fontSize: '0.75rem',
                    backgroundColor: '#FAF0D7',
                    color: '#8A6800',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    fontWeight: 600
                  }}
                >
                  {verse.themes[0]}
                </span>
              )}
            </div>

            {/* Control buttons: pronounce, bookmark, copy, share */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <button
                onClick={handleRecite}
                title={isSpeaking ? "Stop recitation" : "Recite Sanskrit verse"}
                aria-label="Recite verse"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '9999px',
                  border: isSpeaking ? '1px solid #D4AF37' : '1px solid rgba(212, 175, 55, 0.3)',
                  backgroundColor: isSpeaking ? '#FAF0D7' : '#FFFFFF',
                  color: '#A67C00',
                  fontSize: '0.78rem',
                  fontWeight: 600
                }}
              >
                <Volume2 size={15} />
                <span>{isSpeaking ? 'Playing' : 'Pronounce'}</span>
              </button>

              <button
                onClick={handleBookmarkToggle}
                title={bookmarked ? "Remove bookmark" : "Save bookmark"}
                aria-label="Bookmark verse"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  backgroundColor: bookmarked ? '#FAF0D7' : '#FFFFFF',
                  color: bookmarked ? '#A67C00' : '#8A8577'
                }}
              >
                <Bookmark size={15} fill={bookmarked ? "#A67C00" : "none"} />
              </button>

              <button
                onClick={handleCopy}
                title="Copy verse"
                aria-label="Copy verse"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  backgroundColor: '#FFFFFF',
                  color: copied ? '#2E7D32' : '#8A8577'
                }}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>

              <button
                onClick={handleShare}
                title="Share verse"
                aria-label="Share verse"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  backgroundColor: '#FFFFFF',
                  color: '#8A8577'
                }}
              >
                <Share2 size={15} />
              </button>
            </div>
          </div>

          {/* Speaker heading if available */}
          {verse.speakerDev ? (
            <div
              style={{
                textAlign: 'center',
                fontFamily: "'Tiro Devanagari Sanskrit', serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#A67C00',
                marginBottom: '1.25rem'
              }}
            >
              ॥ {verse.speakerDev} ॥
            </div>
          ) : verse.speaker ? (
            <div
              style={{
                textAlign: 'center',
                fontFamily: "'Cinzel', serif",
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#A67C00',
                marginBottom: '1.25rem',
                letterSpacing: '0.04em'
              }}
            >
              {verse.speaker}
            </div>
          ) : null}

          {/* Sanskrit Verse in Devanagari */}
          <div
            style={{
              padding: '1.75rem',
              backgroundColor: '#FFFDF5',
              borderRadius: '16px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              marginBottom: '2rem'
            }}
          >
            <p
              className="sanskrit-verse"
              style={{
                fontSize: fontSizeValues[fontSize].sanskrit,
                whiteSpace: 'pre-line'
              }}
            >
              {verse.sanskrit}
            </p>
          </div>

          {/* Roman Transliteration */}
          {verse.transliteration && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#A67C00', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '0.4rem' }}>
                ROMAN TRANSLITERATION
              </div>
              <p
                className="transliteration-text"
                style={{ fontSize: `calc(${fontSizeValues[fontSize].body} * 0.95)` }}
              >
                {verse.transliteration}
              </p>
            </div>
          )}

          <div className="golden-divider" style={{ margin: '1.5rem auto' }}>
            <div className="line" />
            <span className="symbol">✦</span>
            <div className="line" />
          </div>

          {/* English Translation */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#A67C00', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              ENGLISH TRANSLATION
            </div>
            <p
              style={{
                fontSize: fontSizeValues[fontSize].body,
                color: '#292929',
                lineHeight: 1.8,
                fontWeight: 500
              }}
            >
              {verse.translation}
            </p>
          </div>

          {/* Hindi Translation if available */}
          {verse.hindi && (
            <div
              style={{
                marginBottom: '2rem',
                padding: '1.25rem 1.5rem',
                backgroundColor: '#FAF6EA',
                borderRadius: '14px',
                borderLeft: '4px solid #D4AF37'
              }}
            >
              <div style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: '0.85rem', fontWeight: 700, color: '#A67C00', marginBottom: '0.35rem' }}>
                हिन्दी भावार्थ
              </div>
              <p
                style={{
                  fontFamily: "'Noto Serif Devanagari', serif",
                  fontSize: `calc(${fontSizeValues[fontSize].body} * 0.96)`,
                  color: '#292929',
                  lineHeight: 1.75
                }}
              >
                {verse.hindi}
              </p>
            </div>
          )}

          {/* Detailed Commentary / Purport if available */}
          {verse.commentary && (
            <div
              style={{
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(212, 175, 55, 0.2)'
              }}
            >
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#A67C00', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                SPIRITUAL COMMENTARY & EXPLANATION
              </div>
              <p
                style={{
                  fontSize: `calc(${fontSizeValues[fontSize].body} * 0.92)`,
                  color: '#4F4C44',
                  lineHeight: 1.75
                }}
              >
                {verse.commentary}
              </p>
            </div>
          )}

          {/* Bottom Verse Navigation Steppers */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '3rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(212, 175, 55, 0.25)',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <button
              onClick={handlePrevVerse}
              disabled={currentChapter === 1 && currentVerseIndex === 0}
              className="btn-secondary"
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}
            >
              <ChevronLeft size={16} />
              <span>Previous Verse</span>
            </button>

            <button
              onClick={handleToggleComplete}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 1.15rem',
                borderRadius: '9999px',
                border: isChapterCompleted ? '1.5px solid #4CAF50' : '1px solid rgba(212, 175, 55, 0.3)',
                backgroundColor: isChapterCompleted ? '#E8F5E9' : '#FFFFFF',
                color: isChapterCompleted ? '#2E7D32' : '#6B685F',
                fontSize: '0.82rem',
                fontWeight: 600,
                transition: 'all 200ms ease'
              }}
            >
              <CheckCircle size={15} color={isChapterCompleted ? "#2E7D32" : "#A67C00"} />
              <span>{isChapterCompleted ? "Chapter Completed ✓" : "Mark Chapter Read"}</span>
            </button>

            <button
              onClick={handleNextVerse}
              disabled={currentChapter === 18 && currentVerseIndex === chapterVerses.length - 1}
              className="btn-primary"
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}
            >
              <span>Next Verse</span>
              <ChevronRight size={16} />
            </button>
          </div>

        </article>

      </div>
    </div>
  );
};
