"use client";
import { useState, useEffect, useRef } from "react";
import { Music } from "../../music";
import styles from "../page.module.css";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  PlayButton,
  StopButton,
  PreviousMusic,
  NextMusic,
  SkipToBack,
  SkipToForward,
} from "./images";

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
    null,
  );
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [isCircular, setIsCircular] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timePositionRef = useRef<HTMLInputElement>(null);
  const spectrumRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(null);

  // Load audio metadata
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    if (audio.readyState >= 1) {
      handleLoadedMetadata();
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Update playback position
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

  // Initialize AudioContext and Analyser
  useEffect(() => {
    if (!audioRef.current) return;

    audioCtxRef.current = new AudioContext();
    const elementSource = audioCtxRef.current.createMediaElementSource(
      audioRef.current,
    );
    const analyser = audioCtxRef.current.createAnalyser();
    analyser.fftSize = 2 ** 8;
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

  // Render spectrum
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

    const renderFrame = () => {
      if (!analyserNode || !canvasCtx) return;

      animationFrameRef.current = requestAnimationFrame(renderFrame);
      analyserNode.getByteFrequencyData(dataArray);
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      if (isCircular) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 10;
        const maxBarLength = maxRadius * 0.5;
        const innerRadius = maxRadius - maxBarLength;
        const barWidthCirc = 4;
        const displayLength = Math.min(64, bufferLength);

        for (let i = 0; i < displayLength; i++) {
          const idx = Math.floor((i * bufferLength) / displayLength);
          const barHeight = (dataArray[idx] / 255) * maxBarLength;
          const angle = (i / displayLength) * 2 * Math.PI;
          const hue = (i / displayLength) * 360;

          canvasCtx.save();
          canvasCtx.translate(centerX, centerY);
          canvasCtx.rotate(angle);
          canvasCtx.fillStyle = `hsla(${hue}, 100%, 50%, 0.8)`;
          canvasCtx.fillRect(
            innerRadius,
            -barWidthCirc / 2,
            barHeight,
            barWidthCirc,
          );
          canvasCtx.restore();
        }
      } else {
        const barWidth = canvas.width / bufferLength;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height;
          const hue = (i / bufferLength) * 360;
          const gradient = canvasCtx.createLinearGradient(
            0,
            canvas.height,
            0,
            0,
          );
          gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.8)`);
          gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0.2)`);

          canvasCtx.fillStyle = gradient;
          canvasCtx.fillRect(
            x,
            canvas.height - barHeight,
            barWidth - 1,
            barHeight,
          );
          x += barWidth;
        }
      }
    };
    renderFrame();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [playState, source, analyserNode, isCircular]);

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
      duration,
    );
  };

  const handleSkipBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      audioRef.current.currentTime - 5,
      0,
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

  const handleToggleArrangement = () => {
    setIsCircular(!isCircular);
  };

  // 楽曲リストから選択した楽曲に切り替える処理
  const handleSelectTrack = (trackId: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayState("stop");
    }
    window.location.href = `/music/${trackId}`;
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
            <PreviousMusic />
          </button>
          <button
            type="button"
            onClick={handleSkipBackward}
            className={styles["control-button"]}
          >
            <SkipToBack />
          </button>
          <button
            type="button"
            onClick={handleTogglePlay}
            className={styles["play-button"]}
          >
            {playState === "stop" ? <PlayButton /> : <StopButton />}
          </button>
          <button
            type="button"
            onClick={handleSkipForward}
            className={styles["control-button"]}
          >
            <SkipToForward />
          </button>
          <button
            type="button"
            onClick={handleNextTrack}
            className={styles["control-button"]}
          >
            <NextMusic />
          </button>
        </div>

        <div className={styles["playback-rate-control"]}>
          <button
            type="button"
            onClick={() => handlePlaybackRateChange(0.5)}
            className={`${styles["rate-button"]} ${playbackRate === 0.5 ? styles["active"] : ""}`}
          >
            0.5x
          </button>
          <button
            type="button"
            onClick={() => handlePlaybackRateChange(1)}
            className={`${styles["rate-button"]} ${playbackRate === 1 ? styles["active"] : ""}`}
          >
            1x
          </button>
          <button
            type="button"
            onClick={() => handlePlaybackRateChange(1.5)}
            className={`${styles["rate-button"]} ${playbackRate === 1.5 ? styles["active"] : ""}`}
          >
            1.5x
          </button>
          <button
            type="button"
            onClick={() => handlePlaybackRateChange(2)}
            className={`${styles["rate-button"]} ${playbackRate === 2 ? styles["active"] : ""}`}
          >
            2x
          </button>
        </div>

        <div className={styles["playback-rate-control"]}>
          <button
            type="button"
            onClick={handleToggleArrangement}
            className={`${styles["rate-button"]} ${isCircular ? styles["active"] : ""}`}
          >
            {isCircular ? "Linear" : "Circular"}
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

      {/* 楽曲リストの表示 */}
      <section className={styles["music-list-container"]}>
        <ul className={styles["music-list"]}>
          {musicList.map((track) => (
            <li
              key={track.id}
              className={`${styles["music-list-item"]} ${
                track.id === music.id ? styles["active"] : ""
              }`}
              onClick={() => handleSelectTrack(track.id)}
            >
              {track.jacketUrl && (
                <div className={styles["music-list-jacket"]}>
                  <Image
                    src={track.jacketUrl}
                    alt={track.title}
                    width={50}
                    height={50}
                    className={styles["music-list-jacket-image"]}
                  />
                </div>
              )}
              <div className={styles["music-list-info"]}>
                <span className={styles["music-list-title"]}>
                  {track.title}
                </span>
                <span className={styles["music-list-artist"]}>
                  {track.artist}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
