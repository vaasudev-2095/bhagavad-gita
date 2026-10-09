# Bhagavad Gita — A Divine Digital Experience: Context & Memory

## Project Overview
A modern, spiritually immersive, and fully responsive web application for the **Bhagavad Gita (श्रीमद्भगवद्गीता)**, inspired by the timeless teachings delivered by Bhagavan Sri Krishna to Arjuna on the battlefield of Kurukshetra.

## Design Philosophy & Color Palette
- **Pure White (`#FFFFFF`):** Primary background and content surfaces.
- **Golden (`#D4AF37`):** Primary accent, borders, highlights, emblems.
- **Divine Yellow (`#FFD966`):** Secondary interactive accents, soft glows.
- **Deep Gold (`#A67C00`):** Headings, emphasis, active navigation, badges.
- **Warm Ivory (`#FFFDF5`):** Alternate reading background, sacred containers.
- **Charcoal (`#292929`):** Primary typography for optimal contrast and readability.

## Typography
- **Classical Serifs:** `Cinzel`, `Cinzel Decorative` (Headings, titles, badges).
- **Sanskrit / Devanagari:** `Tiro Devanagari Sanskrit`, `Noto Serif Devanagari`.
- **Modern UI & English:** `Plus Jakarta Sans` (16px base, responsive scales).

## Resources & Extracted Assets
Extracted from authentic PDF books in `d:\bhagvad-gita\resources`:
1. `bgita.pdf` (Swami Sivananda, Divine Life Society) — Source of all 700 verses, chapter summaries, commentaries, prayers.
2. `bhagavad-gita-as-it-is.pdf` (A.C. Bhaktivedanta Swami Prabhupada, BBT) — Source of structure, translations, purports, historical quotes (Gandhi, Thoreau, Emerson).
3. `Bhagavad-Gita-Notes-Gauranga-Priya-Das.pdf` — Source of study guide notes, thematic breakdown.
4. `krishna-arjuna-chariot.png` (`public/assets/krishna-arjuna-chariot.png`) — High-resolution Kurukshetra chariot painting with Lord Krishna and Arjuna.
5. `gita-cover.jpg`, `swami-sivananda.jpg` (`public/assets/`).

## Architecture & Data
- `src/data/chaptersData.js`: All 18 chapters with Sanskrit Devanagari titles, transliteration, English titles, verse count, and verified summaries.
- `src/data/versesData.js`: 700 verses with chapter, verse, speaker, Sanskrit, transliteration, English translation, Hindi translation, commentary, and Life Wisdom tags.
- `src/data/wisdomTopics.js`: 8 everyday wisdom categories (Karma & Action, Knowledge & Wisdom, Devotion & Surrender, Meditation & Discipline, Fear & Courage, Anger & Attachment, Purpose & Duty, Peace of Mind).
- `src/data/philosophyTopics.js`: 7 Yogic paths and doctrines (Karma, Bhakti, Jnana, Dhyana, Dharma, Atman, Samatvam) + historical tributes from Gandhi, Thoreau, Emerson, and Sivananda.
- `src/utils/audioService.js`: Web Audio API Tanpura drone synthesizer (C# tuning, 138.59 Hz, harmonics, pluck simulation) + Web Speech API Sanskrit/Hindi recitation.
- `src/utils/storageService.js`: localStorage persistence for bookmarks, last read position, completed chapters, and reading preferences (font size, motion).

## Components Implemented & Verified
- [x] `ParticlesBackground.jsx`: Canvas floating golden particles with reduced motion support.
- [x] `DivineIntro.jsx`: Cinematic mandala stroke animation with sacred Devanagari typography reveal.
- [x] `Navbar.jsx`: Sticky blur navigation with search, Tanpura sound toggle, bookmarks badge, mobile menu.
- [x] `HeroSection.jsx`: Kurukshetra artwork, headline, Sanskrit quote card, quick statistics.
- [x] `DailyVerse.jsx`: Deterministic daily contemplation card with audio recitation, copy, share, bookmark.
- [x] `ChapterCard.jsx` & `ChapterGrid.jsx`: 18 chapters grid with filters (All, Karma, Bhakti, Jnana) and reading progress.
- [x] `WisdomLife.jsx`: 8 interactive practical categories connected to verses.
- [x] `PhilosophySection.jsx`: Master-detail view of Yogic paths + historical citations.
- [x] `VerseReader.jsx`: Dedicated scripture reading experience with chapter/verse navigation, Sanskrit, transliteration, English, Hindi, commentary, font-size adjuster, zen mode, copy, share, bookmark.
- [x] `SearchModal.jsx`: Full-text search dialog across all 700 verses with highlighted results and filters.
- [x] `BookmarksDrawer.jsx`: Slide-out drawer for saved verses, reading progress resume, completed chapters.
- [x] `AboutSection.jsx`: Historical & philosophical context of Mahabharata & Kurukshetra.
- [x] `Footer.jsx`: Brand links, credits, attributions, closing blessing, intro replay.
- [x] `App.jsx` & `main.jsx`: Main application controller and routing.

## Build & Server Status
- **Production Build:** `npm run build` completed successfully (`dist/` generated with 0 errors).
- **Vite Dev Server:** Running actively at `http://localhost:5173/` (and local network IP `http://172.24.52.72:5173/`).
- **White Screen Resolution:**
  1. Fixed missing `Footer` component import in `App.jsx` which had caused a React runtime ReferenceError.
  2. Terminated stale process on port 5174 and pinned dev server to port 5173.
  3. Made the cinematic `DivineIntro` an opt-in overlay (`✦ Divine Intro` button in the Navbar & Footer) so the homepage, hero artwork, and verses render immediately on load without any blank delay. Verified with headless Chrome capture.
