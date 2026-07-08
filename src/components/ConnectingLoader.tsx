// src/components/ConnectingLoader.tsx
"use client";

import Logo from "./Logo.astro";

interface ConnectingLoaderProps {
  title?: string;
  description?: string;
  animate?: boolean;
  showLogo?: boolean;
}

export default function ConnectingLoader({
  title = "Connecting",
  description = "Please wait a moment...",
  animate = true,
  showLogo = true,
}: ConnectingLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center select-none">
      {/* 1. 境界線が一切ない、なだらかな虹色ネオンスピナーエリア */}
      <div className="relative flex items-center justify-center mb-8">
        {" "}
        {/* 視覚的バランスのために mb-6 から mb-8 に調整 */}
        {/* 外側の虹色発光リング */}
        <div
          className="absolute w-16 h-16 rounded-full animate-spin blur-xs opacity-90"
          style={{
            backgroundImage:
              "conic-gradient(from 0deg, #ff4545, #ffee55, #00ffcc, #aa44ff, #ff4545)",
            WebkitMaskImage: "radial-gradient(circle, transparent 65%, black 66%)",
            maskImage: "radial-gradient(circle, transparent 65%, black 66%)",
          }}
        />
        {/*
          中心部分のソリッドリングとロゴエリア。
          showLogoがtrueの場合は、サークルの中央にロゴコンポーネントをジャストサイズ（w-6 h-6等）で配置します。
          スピナーが回転（animate-spin）しても、この中心エリアは回転しないため、ロゴは美しく直立したまま光に包まれます。
        */}
        <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-[1px]">
          {showLogo ? (
            <div className="w-6 h-6 flex items-center justify-center text-white/90 scale-90 transition-transform duration-300">
              <Logo />
            </div>
          ) : null}
        </div>
      </div>

      {/* 2. テキストエリア */}
      <div className="text-center">
        <h1
          className={`text-sm font-light tracking-[0.3em] uppercase text-white/90 font-orbitron ${
            animate ? "animate-pulse" : ""
          }`}
        >
          {title}
        </h1>
        {description && (
          <p className="text-[10px] tracking-widest text-white/40 mt-1 font-(family-name:--font-m-plus-1-code)">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
