import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  Trash2, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  RotateCcw,
  Sparkles 
} from 'lucide-react';
import { storageService } from '../utils/storageService';
import { chaptersData } from '../data/chaptersData';

export const BookmarksDrawer = ({ isOpen, onClose, onSelectVerse }) => {
  const [activeTab, setActiveTab] = useState('bookmarks'); // 'bookmarks' | 'progress'
  const bookmarks = storageService.getBookmarks();
  const lastRead = storageService.getLastRead();
  const completedChapters = storageService.getCompletedChapters();

  if (!isOpen) return null;

  const handleRemove = (verseId, e) => {
    e.stopPropagation();
    storageService.toggleBookmark({ id: verseId });
    // Force re-render by local state toggle if needed
    setActiveTab(activeTab);
  };

  const progressPercent = Math.round((completedChapters.length / 18) * 100);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(41, 41, 41, 0.6)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'opacity 300ms ease'
      }}
      onClick={onClose}
      role="dialog"
      aria-label="Bookmarks and Reading Progress"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: '-8px 0 35px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1.5px solid #D4AF37'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FFFDF5'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Bookmark size={20} color="#A67C00" />
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.15rem', color: '#292929', fontWeight: 700 }}>
              Your Spiritual Journal
            </h3>
          </div>

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
          >
            <X size={16} />
          </button>
        </div>

        {/* Resume Reading Quick Banner */}
        <div
          style={{
            padding: '1rem 1.5rem',
            backgroundColor: '#FAF0D7',
            borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#8A6800', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              RESUME READING
            </span>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#292929' }}>
              Chapter {lastRead.chapter}, Verse {lastRead.verse}
            </div>
          </div>

          <button
            onClick={() => {
              onSelectVerse(lastRead.chapter, lastRead.verse);
              onClose();
            }}
            className="btn-primary"
            style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}
          >
            <span>Resume</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Tab Buttons */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
            backgroundColor: '#FFFDF5'
          }}
        >
          <button
            onClick={() => setActiveTab('bookmarks')}
            style={{
              flex: 1,
              padding: '0.85rem',
              fontFamily: "'Cinzel', serif",
              fontSize: '0.85rem',
              fontWeight: 700,
              color: activeTab === 'bookmarks' ? '#A67C00' : '#8A8577',
              borderBottom: activeTab === 'bookmarks' ? '2.5px solid #D4AF37' : 'none',
              backgroundColor: activeTab === 'bookmarks' ? '#FFFFFF' : 'transparent'
            }}
          >
            Saved Verses ({bookmarks.length})
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            style={{
              flex: 1,
              padding: '0.85rem',
              fontFamily: "'Cinzel', serif",
              fontSize: '0.85rem',
              fontWeight: 700,
              color: activeTab === 'progress' ? '#A67C00' : '#8A8577',
              borderBottom: activeTab === 'progress' ? '2.5px solid #D4AF37' : 'none',
              backgroundColor: activeTab === 'progress' ? '#FFFFFF' : 'transparent'
            }}
          >
            Chapters Read ({completedChapters.length}/18)
          </button>
        </div>

        {/* Tab Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          
          {/* TAB 1: BOOKMARKS */}
          {activeTab === 'bookmarks' && (
            <div>
              {bookmarks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
                  <Bookmark size={36} color="#D4AF37" style={{ opacity: 0.5, marginBottom: '0.75rem' }} />
                  <h4 style={{ fontSize: '1.05rem', color: '#292929', marginBottom: '0.4rem' }}>
                    No Saved Verses Yet
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#6B685F', lineHeight: 1.6 }}>
                    As you read through the scripture, click the bookmark icon on any verse to build your personal collection of sacred wisdom.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {bookmarks.map((bm) => (
                    <div
                      key={bm.id}
                      onClick={() => {
                        onSelectVerse(bm.chapter, bm.verse);
                        onClose();
                      }}
                      style={{
                        padding: '1.15rem',
                        borderRadius: '14px',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        backgroundColor: '#FFFDF5',
                        cursor: 'pointer',
                        transition: 'all 200ms ease',
                        position: 'relative'
                      }}
                      className="bookmark-item"
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.82rem', fontWeight: 700, color: '#A67C00' }}>
                          CHAPTER {bm.chapter}, VERSE {bm.verse}
                        </span>
                        <button
                          onClick={(e) => handleRemove(bm.id, e)}
                          title="Remove bookmark"
                          style={{ color: '#A8A294', padding: '0.2rem' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {bm.sanskrit && (
                        <p style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif", fontSize: '0.98rem', color: '#292929', marginBottom: '0.35rem', lineHeight: 1.5 }}>
                          {bm.sanskrit.split('\n')[0]}
                        </p>
                      )}

                      <p style={{ fontSize: '0.84rem', color: '#575249', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {bm.translation}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: READING PROGRESS */}
          {activeTab === 'progress' && (
            <div>
              {/* Progress Summary Card */}
              <div
                style={{
                  backgroundColor: '#FFFDF5',
                  padding: '1.25rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '2.2rem', fontWeight: 800, color: '#A67C00' }}>
                  {progressPercent}%
                </div>
                <div style={{ fontSize: '0.85rem', color: '#524F48', fontWeight: 600 }}>
                  {completedChapters.length} of 18 Chapters Completed
                </div>
                <div style={{ width: '100%', height: '7px', backgroundColor: '#F0EAD6', borderRadius: '9999px', overflow: 'hidden', marginTop: '0.75rem' }}>
                  <div
                    style={{
                      width: `${progressPercent}%`,
                      height: '100%',
                      backgroundColor: '#D4AF37',
                      borderRadius: '9999px'
                    }}
                  />
                </div>
              </div>

              {/* 18 Chapters Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {chaptersData.map((ch) => {
                  const isDone = completedChapters.includes(ch.num);
                  return (
                    <div
                      key={ch.num}
                      onClick={() => {
                        onSelectVerse(ch.num, 1);
                        onClose();
                      }}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: '12px',
                        border: isDone ? '1px solid #81C784' : '1px solid rgba(212, 175, 55, 0.2)',
                        backgroundColor: isDone ? '#E8F5E9' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: isDone ? '#2E7D32' : '#A67C00' }}>
                          Ch {ch.num}: {ch.sanskrit}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6B685F' }}>
                          {ch.english} ({ch.verses} verses)
                        </div>
                      </div>

                      {isDone ? (
                        <CheckCircle2 size={18} color="#2E7D32" />
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#8A8577' }}>Read →</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            backgroundColor: '#FFFDF5',
            fontSize: '0.78rem',
            color: '#8A8577',
            textAlign: 'center'
          }}
        >
          Data is saved safely to your local browser storage.
        </div>
      </div>

      <style>{`
        .bookmark-item:hover {
          background-color: #FFFFFF !important;
          border-color: #D4AF37 !important;
          box-shadow: 0 4px 14px rgba(166, 124, 0, 0.1) !important;
        }
      `}</style>
    </div>
  );
};
