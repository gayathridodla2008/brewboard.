// BrewBoard - Web Audio API & Speech Synthesis Engine

class AudioManager {
  constructor() {
    this.audioCtx = null;
    this.speechSynth = window.speechSynthesis || null;
    this.isMuted = false;
    this.isVoiceEnabled = true;
    this.hasUserInteracted = false;
    this.selectedVoice = null;

    // Listen for voices ready
    if (this.speechSynth) {
      if (this.speechSynth.onvoiceschanged !== undefined) {
        this.speechSynth.onvoiceschanged = () => this.initVoice();
      }
      this.initVoice();
    }
  }

  ensureAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    this.hasUserInteracted = true;
  }

  initVoice() {
    if (!this.speechSynth) return;
    const voices = this.speechSynth.getVoices();
    // Prefer natural English voices (US, GB, or IN)
    this.selectedVoice = voices.find(v => v.lang.includes('en-IN')) ||
                         voices.find(v => v.lang.includes('en-US') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Zira'))) ||
                         voices.find(v => v.lang.startsWith('en')) ||
                         voices[0] || null;
  }

  // Dual-tone melodic airport/counter announcement chime
  playReadyChime() {
    if (this.isMuted) return;
    try {
      this.ensureAudioContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;

      // Tone 1: High crisp bell (G5 - ~784 Hz)
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(783.99, now);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.6);

      // Tone 2: Harmonious chime resolving higher (C6 - ~1046.5 Hz)
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1046.50, now + 0.18);
      gain2.gain.setValueAtTime(0.35, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.9);

      // Subtle warm undertone
      const osc3 = this.audioCtx.createOscillator();
      const gain3 = this.audioCtx.createGain();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(523.25, now + 0.18); // C5
      gain3.gain.setValueAtTime(0.15, now + 0.18);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc3.connect(gain3);
      gain3.connect(this.audioCtx.destination);
      osc3.start(now + 0.18);
      osc3.stop(now + 0.8);

    } catch (e) {
      console.warn("Chime playback error:", e);
    }
  }

  // Quick success click / tap sound for kiosk checkout
  playTapSound() {
    if (this.isMuted) return;
    try {
      this.ensureAudioContext();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      // ignore
    }
  }

  // Voice announcement using Web Speech API: "Token 35 is ready at Counter 1"
  announceOrderReady(token, counter = "Counter 1") {
    this.playReadyChime();

    if (!this.isVoiceEnabled || this.isMuted || !this.speechSynth) return;

    // Format token cleanly for speech (e.g. "#B-42" -> "Token B 42" or "Token 42")
    const cleanToken = token.replace('#', 'Token ').replace('-', ' ');
    const speechText = `${cleanToken} is ready for pickup at ${counter}.`;

    setTimeout(() => {
      try {
        if (this.speechSynth.speaking) {
          this.speechSynth.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(speechText);
        utterance.rate = 0.95; // slightly slower for cafeteria clarity
        utterance.pitch = 1.05;
        if (this.selectedVoice) {
          utterance.voice = this.selectedVoice;
        }
        this.speechSynth.speak(utterance);
      } catch (err) {
        console.warn("Speech synthesis error:", err);
      }
    }, 450); // slight pause right after the 2-tone chime
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  toggleVoice() {
    this.isVoiceEnabled = !this.isVoiceEnabled;
    return this.isVoiceEnabled;
  }
}

export const audio = new AudioManager();
