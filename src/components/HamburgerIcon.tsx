"use client";

import { useState, useEffect } from "react";

export const HamburgerIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  // 1. マウント状態を管理するフラグを追加
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 2. クライアント側でマウントされたら true にする
    setIsMounted(true);
  }, []);

  const toggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    window.dispatchEvent(new CustomEvent("menu-toggle", { detail: newState }));
  };

  // 3. マウントされるまでは「静的な初期状態（サーバー側と一致するもの）」のみを表示
  if (!isMounted) {
    return (
      <svg
        viewBox="0 0 100 100"
        className="w-10 h-10 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* サーバー側と同じ初期の見た目をここに記述 */}
        <path className="digital-line" d="M15 30 H 85" stroke="currentColor" fill="none" />
        <path className="digital-line" d="M15 70 H 85" stroke="currentColor" fill="none" />
        <path className="digital-line" d="M15 50 H 85" stroke="currentColor" fill="none" />
      </svg>
    );
  }

  // 4. マウント済みであれば、いつもの動的レンダリングを行う
  const maxPathLength = 80;

  return (
    <button onClick={toggle}>
      <svg
        viewBox="0 0 100 100"
        className="w-10 h-10 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
        style={{ ["--stroke-width" as string]: isOpen ? "4" : "6" }}
      >
        {/* ... 既存の定義やフィルタはそのまま ... */}
        <defs>
          <style>{`
          .digital-line {
            fill: none;
            stroke: currentColor;
            stroke-width: var(--stroke-width);
            stroke-dasharray: ${maxPathLength};
            stroke-dashoffset: ${maxPathLength};
            animation: drawIn 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          }
          @keyframes drawIn { to { stroke-dashoffset: 0; } }
          /* ... 他のスタイル ... */
        `}</style>
        </defs>

        <g className={`skew-group ${isOpen ? "skew-x-0" : "skew-x-[-15deg]"}`}>
          <g key={isOpen ? "open" : "closed"} className={isOpen ? "glitch-active" : ""}>
            <path
              className="digital-line"
              d={isOpen ? "M45 45 l-5 -5 h-15 l-5 5 v10 l5 5 h15 l 10 -10" : "M15 30 H 85"}
            />
            <path
              className="digital-line"
              d={isOpen ? "M55 55 l5 5 h15 l5 -5 v-10 l-5 -5 h-15 l-10 10" : "M15 70 H 85"}
            />
          </g>
          {!isOpen && (
            <path
              key="middle"
              className="digital-line"
              style={{ animationDelay: "0.05s" }}
              d="M15 50 H 85"
            />
          )}
        </g>
      </svg>
    </button>
  );
};
