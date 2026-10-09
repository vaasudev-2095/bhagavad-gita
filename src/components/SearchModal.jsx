import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { versesData } from '../data/versesData';
import { chaptersData } from '../data/chaptersData';

export const SearchModal = ({ isOpen, onClose, onSelectVerse }) => {
  const [query, setQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedChapter('all');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search logic
  const filteredResults = versesData.filter((v) => {
    if (selectedChapter !== 'all' && v.chapter !== Number(selectedChapter)) {
      return false;
    }
    if (!trimmed) return false;

    // Direct chapter.verse match like "2.47"
    if (trimmed.includes('.')) {
      const parts = trimmed.split('.');
      if (String(v.chapter) === parts[0] && String(v.verse).startsWith(parts[1])) {
        return true;
      }
    }

    const matchText = [
      v.sanskrit,
      v.transliteration,
      v.translation,
      v.hindi || '',
      v.commentary || '',
      ...(v.themes || [])
    ].join(' ').toLowerCase();

    return matchText.includes(trimmed);
  }).slice(0, 40); // Cap at 40 top matches for instant UI rendering

  const popularSuggestions = ['karma', 'dharma', 'atman', 'peace', 'equanimity', 'meditation', '2.47', 'devotion', 'fear'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(41, 41, 41, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 'clamp(1rem, 5vw, 4rem) 1rem',
        overflowY: 'auto'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search Bhagavad Gita Scripture"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '740px',
          backgroundColor: '#FFFFFF',
          borderRadius: '22px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
          border: '1.5px solid #D4AF37',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
            backgroundColor: '#FFFDF5'
          }}
        >
          <Search size={22} color="#A67C00" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search verses, Sanskrit words, themes, or ref (e.g. 2.47, karma)..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: '1.05rem',
              color: '#292929',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ color: '#8A8577', padding: '0.2rem' }}
              title="Clear search"
            >
              <X size={18} />
            </button>
          )}

          {/* Chapter Filter Dropdown */}
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            style={{
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '8px',
              padding: '0.35rem 0.65rem',
              fontSize: '0.8rem',
              color: '#A67C00',
              backgroundColor: '#FFFFFF',
              fontFamily: "'Cinzel', serif",
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Chapters</option>
            {chaptersData.map((ch) => (
              <option key={ch.num} value={ch.num}>
                Ch {ch.num}: {ch.sanskrit}
              </option>
            ))}
          </select>

          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F5EEDC',
              color: '#A67C00'
            }}
            title="Close (Esc)"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results Container */}
        <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          
          {/* Empty Query State with Suggestions */}
          {!trimmed && (
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#A67C00', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
                POPULAR SCRIPTURAL SEARCHES
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
                {popularSuggestions.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: '9999px',
                      backgroundColor: '#FFFDF5',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      color: '#47443E',
                      fontSize: '0.85rem',
                      transition: 'all 150ms ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#D4AF37';
                      e.currentTarget.style.color = '#A67C00';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                      e.currentTarget.style.color = '#47443E';
                    }}
                  >
                    ✦ {item}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '0.88rem', color: '#8A8577', fontStyle: 'italic', textAlign: 'center' }}>
                Search across all 700 verses in Sanskrit, Roman transliteration, English, and Hindi.
              </p>
            </div>
          )}

          {/* No Matches Found State */}
          {trimmed && filteredResults.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFDF5',
                  border: '1px solid #D4AF37',
                  color: '#A67C00',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}
              >
                <Search size={24} />
              </div>
              <h4 style={{ fontSize: '1.2rem', color: '#292929', marginBottom: '0.4rem' }}>
                No verses found for "{query}"
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#6B685F', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                Try broader keywords like "yoga", "mind", "soul", "duty", or search by reference like "2.47".
              </p>
            </div>
          )}

          {/* Results List */}
          {filteredResults.length > 0 && (
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#A67C00', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                FOUND {filteredResults.length} MATCHING VERSES
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredResults.map((v) => {
                  const chMeta = chaptersData.find((c) => c.num === v.chapter) || {};
                  return (
                    <div
                      key={v.id}
                      onClick={() => {
                        onSelectVerse(v.chapter, v.verse);
                        onClose();
                      }}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '14px',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        backgroundColor: '#FFFDF5',
                        cursor: 'pointer',
                        transition: 'all 200ms ease'
                      }}
                      className="search-item"
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                        <span
                          style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: '#A67C00'
                          }}
                        >
                          CHAPTER {v.chapter}, VERSE {v.verse} • {chMeta.sanskrit}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#8A8577', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          Read <ArrowRight size={12} />
                        </span>
                      </div>

                      {/* Sanskrit Preview */}
                      <p
                        style={{
                          fontFamily: "'Tiro Devanagari Sanskrit', serif",
                          fontSize: '1.05rem',
                          color: '#292929',
                          marginBottom: '0.35rem',
                          lineHeight: 1.5
                        }}
                      >
                        {v.sanskrit}
                      </p>

                      {/* Translation Preview */}
                      <p style={{ fontSize: '0.88rem', color: '#575249', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {v.translation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer with Hint */}
        <div
          style={{
            padding: '0.85rem 1.5rem',
            backgroundColor: '#FAF6EA',
            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.78rem',
            color: '#8A8577'
          }}
        >
          <span>Use <kbd style={{ padding: '0.1rem 0.3rem', background: '#FFFFFF', borderRadius: '3px' }}>Esc</kbd> to exit</span>
          <span>Indexed with 700 Bhagavad Gita Verses</span>
        </div>
      </div>

      <style>{`
        .search-item:hover {
          background-color: #FFFFFF !important;
          border-color: #D4AF37 !important;
          box-shadow: 0 4px 14px rgba(166, 124, 0, 0.1) !important;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
};
