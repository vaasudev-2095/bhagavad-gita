import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  BookOpen, 
  Sparkles, 
  Compass, 
  Settings 
} from 'lucide-react';
import { divineAudio } from '../utils/audioService';

export const Navbar = ({ 
  onOpenSearch, 
  onOpenBookmarks, 
  bookmarkCount = 0,
  activeView = 'home',
  onNavigate,
  motionEnabled = true,
  onToggleMotion,
  onPlayIntro
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const unsubscribeAudio = divineAudio.subscribe((playing) => {
      setIsAudioPlaying(playing);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribeAudio();
    };
  }, []);

  const handleAudioToggle = () => {
    divineAudio.toggleDrone();
  };

  const navLinks = [
    { id: 'home', label: 'Home', href: '#hero' },
    { id: 'chapters', label: 'Chapters', href: '#chapters' },
    { id: 'reader', label: 'Read Scripture', isAction: true },
    { id: 'wisdom', label: 'Everyday Wisdom', href: '#wisdom' },
    { id: 'teachings', label: 'Teachings & Philosophy', href: '#teachings' },
    { id: 'about', label: 'About the Gita', href: '#about' }
  ];

  const handleLinkClick = (link) => {
    setMobileMenuOpen(false);
    if (link.isAction) {
      onNavigate('reader');
    } else {
      onNavigate('home');
      setTimeout(() => {
        const target = document.querySelector(link.href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 253, 245, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.25)' : '1px solid rgba(212, 175, 55, 0.12)',
        boxShadow: scrolled ? '0 4px 20px -2px rgba(166, 124, 0, 0.08)' : 'none',
        transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.5rem' }}>
        
        {/* Logo & Website Title */}
        <button
          onClick={() => onNavigate('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textAlign: 'left' }}
          aria-label="Bhagavad Gita Home"
        >
          {/* Golden Emblem */}
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFFDF5 0%, #FAF0D7 100%)',
              border: '1.5px solid #D4AF37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#A67C00',
              fontFamily: "'Tiro Devanagari Sanskrit', serif",
              fontSize: '1.4rem',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(212, 175, 55, 0.22)'
            }}
          >
            ॐ
          </div>
          <div>
            <div style={{ fontFamily: "'Tiro Devanagari Sanskrit', serif", fontSize: '1.05rem', fontWeight: 700, color: '#292929', lineHeight: 1.2 }}>
              श्रीमद्भगवद्गीता
            </div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', color: '#A67C00' }}>
              BHAGAVAD GITA
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'none', alignItems: 'center', gap: '1.8rem' }} className="desktop-links">
          {navLinks.map((link) => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link)}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.04em',
                  color: isActive ? '#A67C00' : '#292929',
                  position: 'relative',
                  padding: '0.5rem 0',
                  transition: 'color 200ms ease'
                }}
                className="nav-link-btn"
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: '#D4AF37',
                      borderRadius: '2px'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          
          {/* Divine Opening Experience Trigger */}
          <button
            onClick={onPlayIntro}
            aria-label="Experience Divine Opening Animation"
            title="Experience Divine Opening Animation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.48rem 0.85rem',
              borderRadius: '9999px',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              backgroundColor: '#FFFDF5',
              color: '#A67C00',
              fontSize: '0.82rem',
              fontFamily: "'Cinzel', serif",
              fontWeight: 600,
              transition: 'all 200ms ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FAF0D7';
              e.currentTarget.style.borderColor = '#D4AF37';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFDF5';
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.35)';
            }}
          >
            <Sparkles size={14} color="#D4AF37" />
            <span style={{ display: 'none' }} className="search-text-label">Divine Intro</span>
          </button>

          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search verses"
            title="Search verses (Ctrl+K)"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.48rem 0.85rem',
              borderRadius: '9999px',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              backgroundColor: '#FFFFFF',
              color: '#3D3D3D',
              fontSize: '0.82rem',
              transition: 'all 200ms ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#D4AF37';
              e.currentTarget.style.backgroundColor = '#FFFDF5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.35)';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
          >
            <Search size={15} color="#A67C00" />
            <span style={{ display: 'none' }} className="search-text-label">Search</span>
            <kbd style={{ fontSize: '0.7rem', padding: '0.1rem 0.35rem', borderRadius: '4px', background: '#F5EEDC', color: '#7A5B00' }}>⌘K</kbd>
          </button>

          {/* Meditative Drone Sound Toggle */}
          <button
            onClick={handleAudioToggle}
            aria-label={isAudioPlaying ? "Mute Tanpura Meditative Drone" : "Play Tanpura Meditative Drone"}
            title={isAudioPlaying ? "Mute Tanpura Ambiance" : "Play Tanpura Meditative Ambiance"}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: isAudioPlaying ? '1.5px solid #D4AF37' : '1px solid rgba(212, 175, 55, 0.3)',
              backgroundColor: isAudioPlaying ? '#FFFDF5' : '#FFFFFF',
              color: isAudioPlaying ? '#A67C00' : '#6B685F',
              boxShadow: isAudioPlaying ? '0 0 12px rgba(212, 175, 55, 0.35)' : 'none',
              transition: 'all 250ms ease'
            }}
          >
            {isAudioPlaying ? (
              <Volume2 size={17} color="#A67C00" />
            ) : (
              <VolumeX size={17} color="#8A8577" />
            )}
          </button>

          {/* Bookmarks Drawer Button */}
          <button
            onClick={onOpenBookmarks}
            aria-label="View Saved Bookmarks"
            title="Saved Verses"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              backgroundColor: '#FFFFFF',
              color: '#A67C00',
              position: 'relative',
              transition: 'all 200ms ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#D4AF37';
              e.currentTarget.style.backgroundColor = '#FFFDF5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
          >
            <Bookmark size={17} color="#A67C00" />
            {bookmarkCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#A67C00',
                  color: '#FFFFFF',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}
              >
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              backgroundColor: '#FFFFFF',
              color: '#292929'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1.5px solid #D4AF37',
            padding: '1.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            animation: 'fadeInMenu 250ms ease-out'
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link)}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '1rem',
                fontWeight: 600,
                textAlign: 'left',
                padding: '0.75rem 0.5rem',
                borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
                color: activeView === link.id ? '#A67C00' : '#292929',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{link.label}</span>
              <span style={{ color: '#D4AF37' }}>→</span>
            </button>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#6B685F' }}>Ambient Animation</span>
            <button
              onClick={onToggleMotion}
              style={{
                fontSize: '0.8rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                border: '1px solid #D4AF37',
                color: motionEnabled ? '#A67C00' : '#6B685F'
              }}
            >
              {motionEnabled ? 'Enabled' : 'Paused'}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-links { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          .search-text-label { display: inline !important; }
        }
        @keyframes fadeInMenu {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav-link-btn:hover {
          color: #A67C00 !important;
        }
      `}</style>
    </nav>
  );
};
