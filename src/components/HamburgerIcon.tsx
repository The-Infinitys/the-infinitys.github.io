"use client";

import { useState, useEffect } from "react";

interface HamburgerIconProps {
  id?: string;
  class?: string;
  className?: string;
}

// 1. 最大の長さなどの共通定数を上に定義
const MAX_PATH_LENGTH = 80;

export const HamburgerIcon = ({
  id,
  class: astroClass,
  className: reactClass,
}: HamburgerIconProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const combinedClass = astroClass || reactClass || "";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    window.dispatchEvent(new CustomEvent("menu-toggle", { detail: newState }));
  };

  // 2. 共通のSVG内部のデザイン・アニメーションを子コンポーネントとして定義
  // (isMountedがfalseの時は、強制的に isOpen=false / 動的アニメーションなしの状態で描画する)
  const renderSvgContent = (activeOpen: boolean, animated: boolean) => {
    const strokeWidth = activeOpen ? "4" : "6";
    const skewClass = activeOpen ? "skew-x-0" : "skew-x-[-15deg]";
    const glitchClass = activeOpen ? "glitch-active" : "";

    return (
      <svg
        viewBox="0 0 100 100"
        className="w-10 h-10 overflow-visible"
        xmlns="http://w3.org"
        style={{ ["--stroke-width" as string]: strokeWidth }}
      >
        <defs>
          <style>{`
            .digital-line {
              fill: none;
              stroke: currentColor;
              stroke-width: var(--stroke-width);
              /* アニメーションフラグがtrueの時だけ、初期を非表示にしてドローインさせる */
              stroke-dasharray: ${MAX_PATH_LENGTH};
              stroke-dashoffset: ${animated ? MAX_PATH_LENGTH : "0"};
              ${animated ? "animation: drawIn 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;" : ""}
            }
            @keyframes drawIn { to { stroke-dashoffset: 0; } }
          `}</style>
        </defs>

        <g className={`skew-group ${skewClass}`}>
          <g key={activeOpen ? "open" : "closed"} className={glitchClass}>
            <path
              className="digital-line"
              d={activeOpen ? "M45 45 l-5 -5 h-15 l-5 5 v10 l5 5 h15 l 10 -10" : "M15 30 H 85"}
            />
            <path
              className="digital-line"
              d={activeOpen ? "M55 55 l5 5 h15 l5 -5 v-10 l-5 -5 h-15 l-10 10" : "M15 70 H 85"}
            />
          </g>
          {!activeOpen && (
            <path
              key="middle"
              className="digital-line"
              style={animated ? { animationDelay: "0.05s" } : undefined}
              d="M15 50 H 85"
            />
          )}
        </g>
      </svg>
    );
  };

  // 3. マウント前（SSR時）：常に「閉じている」かつ「最初から線が出ている静止状態」
  if (!isMounted) {
    return (
      <div id={id} className={combinedClass}>
        <button type="button" aria-label="メニューを開く" aria-expanded="false">
          {renderSvgContent(false, false)}
        </button>
      </div>
    );
  }

  // 4. マウント後：現在の状態（isOpen）に応じて動的レンダリング（アニメーション有効）
  return (
    <div id={id} className={combinedClass}>
      <button
        type="button"
        onClick={toggle}
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={isOpen}
      >
        {renderSvgContent(isOpen, true)}
      </button>
    </div>
  );
};
