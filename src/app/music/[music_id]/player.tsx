"use client";

import { useState, useEffect, useRef } from "react";
import { Music } from "../music";
import styles from "./page.module.css";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface PlayerProps {
  music: Music;
  musicList: Music[];
}

export function Player({ music, musicList }: PlayerProps) {
  const t = useTranslations("pages.music.player");
  const [playState, setPlayState] = useState<"stop" | "play">("stop");
  const [duration, setDuration] = useState(0);
  const [timePosition, setTimePosition] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [source, setSource] = useState<MediaElementAudioSourceNode | null>(
    null
  );
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timePositionRef = useRef<HTMLInputElement>(null);
  const spectrumRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(null);

  // 音声ファイルのメタデータを読み込む
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    // すでにメタデータが読み込まれている場合
    if (audio.readyState >= 1) {
      handleLoadedMetadata();
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // 再生位置の更新
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const handleTimeUpdate = () => {
      setTimePosition(audio.currentTime);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    audioCtxRef.current = new AudioContext();
    const elementSource = audioCtxRef.current.createMediaElementSource(
      audioRef.current
    );
    const analyser = audioCtxRef.current.createAnalyser();
    analyser.fftSize = 2048;
    elementSource.connect(analyser).connect(audioCtxRef.current.destination);
    setSource(elementSource);
    setAnalyserNode(analyser);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      if (elementSource) {
        elementSource.disconnect();
      }
      if (analyser) {
        analyser.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (
      !source ||
      !analyserNode ||
      playState !== "play" ||
      !spectrumRef.current
    )
      return;

    const canvas = spectrumRef.current;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;

    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = canvas.width / bufferLength;

    function renderFrame() {
      if (!analyserNode || !canvasCtx) return;

      animationFrameRef.current = requestAnimationFrame(renderFrame);

      analyserNode.getByteFrequencyData(dataArray);
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;

        const hue = (i / bufferLength) * 360;
        const gradient = canvasCtx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.8)`);
        gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0.2)`);

        canvasCtx.fillStyle = gradient;
        canvasCtx.fillRect(
          x,
          canvas.height - barHeight,
          barWidth - 1,
          barHeight
        );
        x += barWidth;
      }
    }
    renderFrame();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [playState, source, analyserNode]);

  const handleTogglePlay = () => {
    if (!audioRef.current || !audioCtxRef.current) return;

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
      setPlayState("play");
    }

    if (playState === "stop") {
      audioRef.current.play();
      setPlayState("play");
    } else if (playState === "play") {
      audioRef.current.pause();
      setPlayState("stop");
    }
  };

  const handleEnded = () => {
    setTimePosition(0);
    setPlayState("stop");
  };

  const handleChangeTimePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const position = parseFloat(e.target.value);
    setTimePosition(position);
    audioRef.current.currentTime = position;
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSkipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      audioRef.current.currentTime + 10,
      duration
    );
  };

  const handleSkipBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      audioRef.current.currentTime - 5,
      0
    );
  };

  const handleNextTrack = () => {
    if (!musicList || musicList.length === 0) return;
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayState("stop");
    }
    const nextId = getNextTrackId();
    window.location.href = `/music/${nextId}`;
  };

  const handlePreviousTrack = () => {
    if (!musicList || musicList.length === 0) return;
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayState("stop");
    }
    const prevId = getPreviousTrackId();
    window.location.href = `/music/${prevId}`;
  };

  const getNextTrackId = () => {
    if (!musicList || musicList.length === 0) return music.id;
    const currentIndex = musicList.findIndex((m) => m.id === music.id);
    const nextIndex = (currentIndex + 1) % musicList.length;
    return musicList[nextIndex].id;
  };

  const getPreviousTrackId = () => {
    if (!musicList || musicList.length === 0) return music.id;
    const currentIndex = musicList.findIndex((m) => m.id === music.id);
    const prevIndex = (currentIndex - 1 + musicList.length) % musicList.length;
    return musicList[prevIndex].id;
  };

  const handlePlaybackRateChange = (rate: number) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  return (
    <div className={styles["music-player-container"]}>
      {music.jacketUrl && (
        <div className={styles["jacket-background"]}>
          <Image
            src={music.jacketUrl}
            alt={music.title}
            fill
            className={styles["jacket-image"]}
            priority
          />
          <div className={styles["jacket-overlay"]} />
        </div>
      )}

      <div className={styles["music-info"]}>
        <h1>{music.title}</h1>
        <p>
          {t("artist")}: {music.artist}
        </p>
      </div>

      <div className={styles["player-controls"]}>
        <div className={styles["control-buttons"]}>
          <button
            type="button"
            onClick={handlePreviousTrack}
            className={styles["control-button"]}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 6L6 12L16 18V6Z" fill="currentColor" />
              <path d="M18 6V18H20V6H18Z" fill="currentColor" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleSkipBackward}
            className={styles["control-button"]}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 6L5 12L11 18V6Z" fill="currentColor" />
              <path d="M19 6L13 12L19 18V6Z" fill="currentColor" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleTogglePlay}
            className={styles["play-button"]}
          >
            {playState === "stop" ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 4H10V20H6V4Z" fill="currentColor" />
                <path d="M14 4H18V20H14V4Z" fill="currentColor" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={handleSkipForward}
            className={styles["control-button"]}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 6L19 12L13 18V6Z" fill="currentColor" />
              <path d="M5 6L11 12L5 18V6Z" fill="currentColor" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNextTrack}
            className={styles["control-button"]}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 6L18 12L8 18V6Z" fill="currentColor" />
              <path d="M4 6H6V18H4V6Z" fill="currentColor" />
            </svg>
          </button>
        </div>

        <div className={styles["playback-rate-control"]}>
          <button
            type="button"
            onClick={() => handlePlaybackRateChange(0.5)}
            className={`${styles["rate-button"]} ${
              playbackRate === 0.5 ? styles["active"] : ""
            }`}
          >
            0.5x
          </button>
          <button
            type="button"
            onClick={() => handlePlaybackRateChange(1)}
            className={`${styles["rate-button"]} ${
              playbackRate === 1 ? styles["active"] : ""
            }`}
          >
            1x
          </button>
          <button
            type="button"
            onClick={() => handlePlaybackRateChange(1.5)}
            className={`${styles["rate-button"]} ${
              playbackRate === 1.5 ? styles["active"] : ""
            }`}
          >
            1.5x
          </button>
          <button
            type="button"
            onClick={() => handlePlaybackRateChange(2)}
            className={`${styles["rate-button"]} ${
              playbackRate === 2 ? styles["active"] : ""
            }`}
          >
            2x
          </button>
        </div>

        <div className={styles["time-control"]}>
          <span>{formatTime(timePosition)}</span>
          <input
            type="range"
            ref={timePositionRef}
            min={0}
            max={duration || 0}
            value={timePosition}
            onChange={handleChangeTimePosition}
            className={styles["time-slider"]}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <audio src={music.url} ref={audioRef} onEnded={handleEnded}>
        {t("browserNotSupported")}
      </audio>

      <canvas className={styles["spectrum"]} ref={spectrumRef} />
    </div>
  );
}
