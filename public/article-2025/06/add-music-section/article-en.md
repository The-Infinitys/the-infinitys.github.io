---
title: Music Player Now Available!
date: "2025-06-14"
description: "Been wrestling with bugs non-stop (´・ω・`)"
---

# Section of Music

Hi there! This is The Infinity's!

I create music as a hobby, and today I'm excited to announce that I've built a dedicated page to share my music with you all!

## Key Features

Our music player comes with the following features:

1. Basic Playback Controls
   - Play/Pause
   - Track seeking
   - Fast forward/Rewind
   - Next/Previous track navigation

2. Playback Speed Control
   - Adjustable from 0.5x to 2x speed

3. Equalizer Function
   - 5-band equalizer
   - Multiple presets
   - Custom settings available

4. Visualizer
   - Toggle between linear and circular display
   - Real-time audio waveform visualization

## Technical Implementation Details

### Audio Processing Implementation

```tsx
const audioCtxRef = useRef<AudioContext | null>(null);
const elementSource = audioCtxRef.current.createMediaElementSource(
  audioRef.current
);
```

We're utilizing the Web Audio API to create an audio context, which enables us to process and analyze audio signals.

### Equalizer Implementation

```tsx
const eqFilters: BiquadFilterNode[] = [
  audioCtxRef.current.createBiquadFilter(),
  // ...
];

const frequencies = [60, 250, 1000, 4000, 16000];
```

The equalizer employs BiquadFilterNodes for each of the five frequency bands (from bass to treble).
Each filter is assigned a specific center frequency and can be adjusted using the gain parameter.

### Visualizer Rendering

```tsx
const renderFrame = () => {
  analyserNode.getByteFrequencyData(dataArray);
  // ...
  animationFrameRef.current = requestAnimationFrame(renderFrame);
};
```

We're using an AnalyserNode to analyze audio data in real-time and rendering the waveform using the Canvas API.
The requestAnimationFrame ensures smooth animation performance.

### Playback Control Implementation

```tsx
const handleTogglePlay = () => {
  if (!audioRef.current || !audioCtxRef.current) return;
  
  if (audioCtxRef.current.state === "suspended") {
    audioCtxRef.current.resume();
    setPlayState("play");
  }
  // ...
};
```

The playback control combines HTMLAudioElement and AudioContext to manage audio playback.
State management is handled appropriately based on user interactions.

### Playlist Functionality

```tsx
const handleNextTrack = () => {
  if (!musicList || musicList.length === 0) return;
  const nextId = getNextTrackId();
  window.location.href = `/music/${nextId}`;
};
```

The playlist system determines the next or previous track based on the current track index
and handles navigation to the appropriate URL.

## Conclusion

By combining the Web Audio API and Canvas API, we've successfully created a full-featured music player in the browser.
While implementing the equalizer and visualizer presented some challenges,
we're pleased with the result - a user-friendly player with advanced audio playback capabilities!

While there's always room for improvement, we're happy to have completed these core features.
In future updates, we plan to add more user-friendly features like playlist saving and shuffle play functionality!