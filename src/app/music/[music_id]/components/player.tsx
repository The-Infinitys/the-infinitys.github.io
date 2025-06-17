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

// イコライザのプリセットを定義
const equalizerPresets: { [key: string]: number[] } = {
  Flat: [0, 0, 0, 0, 0],
  Rock: [4, 2, 0, 2, 4],
  Pop: [2, 4, 2, -2, -4],
  BassBoost: [6, 4, 0, -2, -4],
  TrebleBoost: [-4, -2, 0, 4, 6],
  Jazz: [2, 0, 4, 2, 0],
  Classical: [0, 2, 4, 0, -2],
  Acoustic: [0, 4, 2, -2, -4],
  Dance: [4, 2, 0, 4, 6],
  HipHop: [2, 4, 0, -2, 0],
  RnB: [0, 2, 4, 2, 0],
  Country: [0, 0, 2, 4, 2],
  Blues: [0, 2, 4, 0, -2],
  Reggae: [2, 0, -2, 4, 6],
  Electronic: [4, 2, 0, -2, 0],
  Indie: [0, 4, 2, -2, -4],
  Metal: [6, 4, 0, -2, -4],
};

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
  const [isCircular, setIsCircular] = useState(false);
  const [eqGains, setEqGains] = useState<number[]>(equalizerPresets.Flat); // 初期値はFlat
  const [selectedPreset, setSelectedPreset] = useState<string>("Flat");
  const [volume, setVolume] = useState(1); // 音量の初期値を1(最大)に設定

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timePositionRef = useRef<HTMLInputElement>(null);
  const spectrumRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(null);
  const eqFiltersRef = useRef<BiquadFilterNode[]>([]);

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
    analyser.fftSize = 2 ** 8;

    const eqFilters: BiquadFilterNode[] = [
      audioCtxRef.current.createBiquadFilter(),
      audioCtxRef.current.createBiquadFilter(),
      audioCtxRef.current.createBiquadFilter(),
      audioCtxRef.current.createBiquadFilter(),
      audioCtxRef.current.createBiquadFilter(),
    ];

    const frequencies = [60, 250, 1000, 4000, 16000];
    eqFilters.forEach((filter, index) => {
      filter.type = "peaking";
      filter.frequency.value = frequencies[index];
      filter.Q.value = 1.5;
      filter.gain.value = eqGains[index];
    });

    let previousNode: AudioNode = elementSource;
    eqFilters.forEach((filter) => {
      previousNode.connect(filter);
      previousNode = filter;
    });
    previousNode.connect(analyser);
    analyser.connect(audioCtxRef.current.destination);

    setSource(elementSource);
    setAnalyserNode(analyser);
    eqFiltersRef.current = eqFilters;

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
      eqFilters.forEach((filter) => {
        filter.disconnect();
      });
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!audioCtxRef.current || eqFiltersRef.current.length === 0) return;

    eqFiltersRef.current.forEach((filter, index) => {
      filter.gain.value = eqGains[index];
    });
  }, [eqGains]);

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
        if (isCircular) {
          const size = Math.min(container.clientWidth, container.clientHeight);
          canvas.width = size;
          canvas.height = size;
        } else {
          canvas.width = container.clientWidth;
          canvas.height = container.clientHeight;
        }
      }
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderFrame = () => {
      if (!analyserNode || !canvasCtx) return;

      analyserNode.getByteFrequencyData(dataArray);
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      if (isCircular) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 10;
        const maxBarLength = maxRadius * 0.5;
        const innerRadius = maxRadius - maxBarLength;
        const barWidthCirc = 4;
        const displayLength = bufferLength;

        for (let i = 0; i < displayLength; i++) {
          const idx = Math.floor((i * bufferLength) / displayLength);
          const barHeight = (dataArray[idx] / 255) * maxBarLength;
          const angle = (i / displayLength) * 2 * Math.PI;
          const hue = (i / displayLength) * 360;

          canvasCtx.save();
          canvasCtx.translate(centerX, centerY);
          canvasCtx.rotate(angle);
          canvasCtx.strokeStyle = `hsla(${hue}, 100%, 50%, 0.8)`;
          canvasCtx.lineWidth = barWidthCirc;
          canvasCtx.fillStyle = `hsla(${hue}, 100%, 50%, 0.8)`;
          canvasCtx.fillRect(
            innerRadius,
            -barWidthCirc / 2,
            barHeight,
            barWidthCirc
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
            0
          );
          gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.4)`);
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

      animationFrameRef.current = requestAnimationFrame(renderFrame);
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

  const handleToggleArrangement = () => {
    setIsCircular(!isCircular);
  };

  const handleSelectTrack = (trackId: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayState("stop");
    }
    window.location.href = `/music/${trackId}`;
  };

  const handleEqChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newGains = [...eqGains];
    newGains[index] = parseFloat(e.target.value);
    setEqGains(newGains);
    setSelectedPreset("Custom"); // 手動で変更したらプリセットをCustomに
  };

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const presetName = e.target.value;
    setSelectedPreset(presetName);
    setEqGains(equalizerPresets[presetName]);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

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

        <div className={styles["volume-control"]}>
          <span>{t("volume")}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className={styles["volume-slider"]}
          />
        </div>

        <details>
          <summary>{t("equalizer")}</summary>
          <div className={styles["eq-controls"]}>
            <div className={styles["eq-preset"]}>
              <label htmlFor="eqPreset">{t("preset")}</label>
              <select
                id="eqPreset"
                value={selectedPreset}
                onChange={handlePresetChange}
                className={styles["eq-preset-select"]}
              >
                {Object.keys(equalizerPresets).map((preset) => (
                  <option key={preset} value={preset}>
                    {preset}
                  </option>
                ))}
                <option value="Custom">Custom</option>
              </select>
            </div>
            <div className={styles["eq-slider"]}>
              <label>60 Hz</label>
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                value={eqGains[0]}
                onChange={(e) => handleEqChange(0, e)}
              />
            </div>
            <div className={styles["eq-slider"]}>
              <label>250 Hz</label>
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                value={eqGains[1]}
                onChange={(e) => handleEqChange(1, e)}
              />
            </div>
            <div className={styles["eq-slider"]}>
              <label>1 kHz</label>
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                value={eqGains[2]}
                onChange={(e) => handleEqChange(2, e)}
              />
            </div>
            <div className={styles["eq-slider"]}>
              <label>4 kHz</label>
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                value={eqGains[3]}
                onChange={(e) => handleEqChange(3, e)}
              />
            </div>
            <div className={styles["eq-slider"]}>
              <label>16 kHz</label>
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                value={eqGains[4]}
                onChange={(e) => handleEqChange(4, e)}
              />
            </div>
          </div>
        </details>
      </div>

      <audio src={music.url} ref={audioRef} onEnded={handleEnded}>
        {t("browserNotSupported")}
      </audio>

      <canvas className={styles["spectrum"]} ref={spectrumRef} />

      <section className={styles["music-list-container"]}>
        <ul className={styles["music-list"]}>
          {musicList.map((track) => (
            <li
              key={track.id}
              className={`${styles["music-list-item"]} ${track.id === music.id ? styles["active"] : ""}`}
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
