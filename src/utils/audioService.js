/**
 * Divine Audio Service
 * Built-in Web Audio API Tanpura drone synthesizer & speech recitation.
 * Creates an authentic meditative temple ambience with no external audio file dependencies.
 */

class AudioService {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.droneInterval = null;
    this.masterGain = null;
    this.volume = 0.35;
    this.listeners = new Set();
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying, this.volume));
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  // Play a single resonant plucked string note with warm harmonics
  pluckString(frequency, startTime, duration = 3.2) {
    if (!this.ctx || !this.masterGain) return;

    // Fundamental oscillator
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Warm overtone oscillator (octave harmonic)
    const overtone = this.ctx.createOscillator();
    const overtoneGain = this.ctx.createGain();

    // Gentle warm low-pass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(850, startTime);
    filter.frequency.exponentialRampToValueAtTime(320, startTime + duration);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(frequency, startTime);

    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(frequency * 2, startTime);

    // Natural exponential pluck envelope
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.35, startTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    overtoneGain.gain.setValueAtTime(0.001, startTime);
    overtoneGain.gain.linearRampToValueAtTime(0.18, startTime + 0.06);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.7);

    osc.connect(gain);
    overtone.connect(overtoneGain);
    gain.connect(filter);
    overtoneGain.connect(filter);
    filter.connect(this.masterGain);

    osc.start(startTime);
    overtone.start(startTime);
    osc.stop(startTime + duration);
    overtone.stop(startTime + duration);
  }

  toggleDrone() {
    if (this.isPlaying) {
      this.stopDrone();
    } else {
      this.startDrone();
    }
    return this.isPlaying;
  }

  startDrone() {
    this.initContext();
    if (!this.ctx) return;
    this.isPlaying = true;
    this.notify();

    // Classical Indian Tanpura tuning: Pa - Sa - Sa - Sa(lower)
    // In C# (138.59 Hz)
    const baseSa = 138.59;
    const pa = baseSa * 1.5; // Fifth (G#3)
    const highSa = baseSa * 2; // C#4
    const lowSa = baseSa;     // C#3

    const notes = [pa, highSa, highSa, lowSa];
    let noteIdx = 0;

    const schedulePluck = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const freq = notes[noteIdx % notes.length];
      this.pluckString(freq, now, 3.4);
      noteIdx++;
    };

    schedulePluck();
    this.droneInterval = setInterval(schedulePluck, 1100);
  }

  stopDrone() {
    this.isPlaying = false;
    if (this.droneInterval) {
      clearInterval(this.droneInterval);
      this.droneInterval = null;
    }
    this.notify();
  }

  // Recite text using Web Speech API (with Hindi/Sanskrit preference if available)
  speakText(text, lang = 'hi-IN') {
    if (!('speechSynthesis' in window)) return false;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.88; // gentle, peaceful contemplative pace
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const targetVoice = voices.find((v) => v.lang.startsWith('hi') || v.lang.startsWith('sa')) ||
                        voices.find((v) => v.lang.startsWith('en-IN')) ||
                        voices[0];
    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const divineAudio = new AudioService();
