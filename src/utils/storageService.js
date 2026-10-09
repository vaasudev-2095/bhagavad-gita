/**
 * Local Storage Service for Bookmarks, Reading Progress, and User Preferences
 */

const KEYS = {
  BOOKMARKS: 'gita_bookmarks_v1',
  LAST_READ: 'gita_last_read_v1',
  COMPLETED_CHAPTERS: 'gita_completed_chapters_v1',
  SETTINGS: 'gita_settings_v1',
  INTRO_SEEN: 'gita_intro_seen_v1'
};

export const storageService = {
  // Bookmarks
  getBookmarks() {
    try {
      const data = localStorage.getItem(KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  isBookmarked(verseId) {
    const list = this.getBookmarks();
    return list.some(b => b.id === verseId);
  },

  toggleBookmark(verse) {
    const list = this.getBookmarks();
    const index = list.findIndex(b => b.id === verse.id);
    let updated;
    if (index >= 0) {
      updated = list.filter(b => b.id !== verse.id);
    } else {
      updated = [
        {
          id: verse.id,
          chapter: verse.chapter,
          verse: verse.verse,
          transliteration: verse.transliteration,
          translation: verse.translation,
          sanskrit: verse.sanskrit,
          savedAt: new Date().toISOString()
        },
        ...list
      ];
    }
    localStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(updated));
    return updated;
  },

  // Last Read Position
  getLastRead() {
    try {
      const data = localStorage.getItem(KEYS.LAST_READ);
      return data ? JSON.parse(data) : { chapter: 1, verse: 1 };
    } catch {
      return { chapter: 1, verse: 1 };
    }
  },

  setLastRead(chapter, verse) {
    try {
      const payload = { chapter: Number(chapter), verse: String(verse), timestamp: new Date().toISOString() };
      localStorage.setItem(KEYS.LAST_READ, JSON.stringify(payload));
    } catch (e) {
      console.warn("Storage error", e);
    }
  },

  // Completed Chapters
  getCompletedChapters() {
    try {
      const data = localStorage.getItem(KEYS.COMPLETED_CHAPTERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleChapterCompleted(chapterNum) {
    const list = this.getCompletedChapters();
    const num = Number(chapterNum);
    const updated = list.includes(num) ? list.filter(c => c !== num) : [...list, num];
    localStorage.setItem(KEYS.COMPLETED_CHAPTERS, JSON.stringify(updated));
    return updated;
  },

  // Reading Settings
  getSettings() {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      return data ? JSON.parse(data) : {
        fontSize: 'md', // sm, md, lg, xl
        motionEnabled: true,
        zenMode: false
      };
    } catch {
      return { fontSize: 'md', motionEnabled: true, zenMode: false };
    }
  },

  saveSettings(settings) {
    try {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn("Storage error", e);
    }
  },

  // Intro Seen
  hasSeenIntro() {
    return localStorage.getItem(KEYS.INTRO_SEEN) === 'true';
  },

  setIntroSeen() {
    localStorage.setItem(KEYS.INTRO_SEEN, 'true');
  },

  resetIntro() {
    localStorage.removeItem(KEYS.INTRO_SEEN);
  }
};
