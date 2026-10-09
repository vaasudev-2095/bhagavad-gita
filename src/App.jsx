import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DailyVerse } from './components/DailyVerse';
import { ChapterGrid } from './components/ChapterGrid';
import { WisdomLife } from './components/WisdomLife';
import { PhilosophySection } from './components/PhilosophySection';
import { AboutSection } from './components/AboutSection';
import { VerseReader } from './components/VerseReader';
import { SearchModal } from './components/SearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { DivineIntro } from './components/DivineIntro';
import { ParticlesBackground } from './components/ParticlesBackground';
import { Footer } from './components/Footer';
import { storageService } from './utils/storageService';

export function App() {
  const [activeView, setActiveView] = useState('home'); // 'home' | 'reader'
  const [readerState, setReaderState] = useState({ chapter: 1, verse: '1' });
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  const refreshBookmarkCount = () => {
    setBookmarkCount(storageService.getBookmarks().length);
  };

  useEffect(() => {
    refreshBookmarkCount();
    const settings = storageService.getSettings();
    setMotionEnabled(settings.motionEnabled !== false);
  }, []);

  const handleOpenVerse = (chapter, verse = '1') => {
    setReaderState({ chapter: Number(chapter), verse: String(verse) });
    setActiveView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    refreshBookmarkCount();
  };

  const handleSelectChapter = (chapterNum) => {
    setReaderState({ chapter: Number(chapterNum), verse: '1' });
    setActiveView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    refreshBookmarkCount();
  };

  const handleNavigate = (view) => {
    setActiveView(view);
    if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'chapters') {
      setActiveView('home');
      setTimeout(() => {
        document.querySelector('#chapters')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (view === 'wisdom') {
      setActiveView('home');
      setTimeout(() => {
        document.querySelector('#wisdom')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (view === 'teachings') {
      setActiveView('home');
      setTimeout(() => {
        document.querySelector('#teachings')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (view === 'about') {
      setActiveView('home');
      setTimeout(() => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
    refreshBookmarkCount();
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMotion = () => {
    const nextState = !motionEnabled;
    setMotionEnabled(nextState);
    const settings = storageService.getSettings();
    storageService.saveSettings({ ...settings, motionEnabled: nextState });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      
      {/* Optional Cinematic Opening Experience */}
      {showIntro && (
        <DivineIntro onComplete={() => setShowIntro(false)} />
      )}

      {/* Floating Golden Particles */}
      <ParticlesBackground enabled={motionEnabled} />

      {/* Navigation Bar */}
      <Navbar
        activeView={activeView}
        bookmarkCount={bookmarkCount}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => {
          refreshBookmarkCount();
          setBookmarksOpen(true);
        }}
        onNavigate={handleNavigate}
        motionEnabled={motionEnabled}
        onToggleMotion={handleToggleMotion}
        onPlayIntro={handleReplayIntro}
      />

      {/* Main View Switching */}
      {activeView === 'reader' ? (
        <VerseReader
          initialChapter={readerState.chapter}
          initialVerse={readerState.verse}
          onBackToHome={() => handleNavigate('home')}
          onOpenSearch={() => setSearchOpen(true)}
        />
      ) : (
        <main>
          {/* Hero Section */}
          <HeroSection
            onExploreChapters={() => {
              document.querySelector('#chapters')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onBeginReading={() => handleOpenVerse(1, '1')}
            onOpenVerse={handleOpenVerse}
          />

          {/* Daily Verse Section */}
          <DailyVerse onReadVerse={handleOpenVerse} />

          {/* 18 Chapters Section */}
          <ChapterGrid onSelectChapter={handleSelectChapter} />

          {/* Wisdom for Everyday Life Section */}
          <WisdomLife onOpenVerse={handleOpenVerse} />

          {/* Philosophy & Teachings Section */}
          <PhilosophySection onOpenVerse={handleOpenVerse} />

          {/* About Section */}
          <AboutSection />
        </main>
      )}

      {/* Footer */}
      <Footer
        onSelectChapter={handleSelectChapter}
        onReplayIntro={handleReplayIntro}
        onNavigate={handleNavigate}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectVerse={handleOpenVerse}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={bookmarksOpen}
        onClose={() => {
          refreshBookmarkCount();
          setBookmarksOpen(false);
        }}
        onSelectVerse={handleOpenVerse}
      />

    </div>
  );
}

export default App;
