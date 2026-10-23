let audioContext;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!audioContext) audioContext = new AudioContext();
  return audioContext;
}

export function unlockAudio() {
  const context = getAudioContext();
  if (context?.state === "suspended") context.resume().catch(() => {});
}

function tone(frequency, startAt, duration, volume = 0.08, type = "sine") {
  const context = getAudioContext();
  if (!context) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration + 0.02);
}

export function playCountdownTick(secondsLeft) {
  const context = getAudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  const urgency = Math.max(0, 45 - secondsLeft) / 45;
  tone(620 + urgency * 460, context.currentTime, 0.16, 0.42 + urgency * 0.4, "triangle");
}

export function playLifelineSound(lifeline) {
  const context = getAudioContext();
  if (!context) return;
  const now = context.currentTime;

  if (lifeline === "fifty") {
    tone(880, now, 0.16, 0.06, "triangle");
    tone(660, now + 0.18, 0.22, 0.06, "triangle");
  } else if (lifeline === "phone") {
    // Original telephone-like double ring, not a recording from a TV broadcast.
    [0, 0.58].forEach((offset) => {
      tone(440, now + offset, 0.34, 0.045, "sine");
      tone(480, now + offset, 0.34, 0.045, "sine");
    });
  } else if (lifeline === "audience") {
    // A short, original rising fanfare to suggest the audience joining in.
    [392, 494, 587, 784].forEach((frequency, index) => {
      tone(frequency, now + index * 0.12, 0.34, 0.025, "sine");
    });
  }
}
