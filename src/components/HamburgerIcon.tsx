"use client";

import { useState } from "react";

export const HamburgerIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    // メニュー本体の開閉をAstro側と連動させるためのカスタムイベント
    window.dispatchEvent(new CustomEvent("menu-toggle", { detail: newState }));
  };
  const maxPathLength = 80;

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-10 h-10 overflow-visible"
      xmlns="http://www.w3.org/2000/svg"
      onClick={toggle}
      style={{
        ["--stroke-width" as string]: isOpen ? "4" : "6",
      }}
    >
      <defs>
        <filter id="origin-glitch" x="-20%" y="-20%" width="140%" height="140%">
          <feFlood floodColor="#ff0000" result="COLOR-RED" />
          <feFlood floodColor="#00ff00" result="COLOR-GREEN" />
          <feFlood floodColor="#0000ff" result="COLOR-BLUE" />
          <feComposite
            in="COLOR-RED"
            in2="SourceGraphic"
            operator="in"
            result="RED-SHAPE"
          />
          <feComposite
            in="COLOR-GREEN"
            in2="SourceGraphic"
            operator="in"
            result="GREEN-SHAPE"
          />
          <feComposite
            in="COLOR-BLUE"
            in2="SourceGraphic"
            operator="in"
            result="BLUE-SHAPE"
          />
          <feOffset in="RED-SHAPE" dx="-2" dy="0" result="RED-OFFSET">
            <animate
              attributeName="dx"
              values="-2;1;-1;2;-2"
              dur="0.15s"
              repeatCount="indefinite"
            />
          </feOffset>

          <feOffset in="GREEN-SHAPE" dx="2" dy="0" result="GREEN-OFFSET">
            <animate
              attributeName="dy"
              values="0;1;-1;0"
              dur="0.2s"
              repeatCount="indefinite"
            />
          </feOffset>

          <feOffset in="BLUE-SHAPE" dx="0" dy="1" result="BLUE-OFFSET">
            <animate
              attributeName="dx"
              values="0;-2;2;-1;0"
              dur="0.1s"
              repeatCount="indefinite"
            />
          </feOffset>
          <feBlend
            in="RED-OFFSET"
            in2="GREEN-OFFSET"
            mode="screen"
            result="RG"
          />
          <feBlend in="RG" in2="BLUE-OFFSET" mode="screen" result="RGB" />
          <feBlend in="RGB" in2="SourceGraphic" mode="screen" />
        </filter>
        <style>{`
          .digital-line {
            fill: none;
            stroke: currentColor;
            stroke-width: var(--stroke-width);
            stroke-linecap: square;
            stroke-linejoin: bevel;
            /* 常に「描画される」アニメーションを優先 */
            stroke-dasharray: ${maxPathLength};
            stroke-dashoffset: ${maxPathLength};
            animation: drawIn 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
            transition: stroke-width 0.3s, opacity 0.3s;
          }

          @keyframes drawIn {
            to { stroke-dashoffset: 0; }
          }

          .glitch-active {
            filter: url(#origin-glitch);
          }

          .skew-group {
            transform-origin: center;
            transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
          }
        `}</style>
      </defs>

      <g className={`skew-group ${isOpen ? "skew-x-0" : "skew-x-[-15deg]"}`}>
        {/* key={isOpen} を入れることで、切り替えのたびにアニメーションが最初から走る */}
        <g
          key={isOpen ? "open" : "closed"}
          className={isOpen ? "glitch-active" : ""}
        >
          <path
            className="digital-line"
            d={
              isOpen
                ? "M45 45 l-5 -5 h-15 l-5 5 v10 l5 5 h15 l 10 -10"
                : "M15 30 H 85"
            }
          />
          <path
            className="digital-line"
            d={
              isOpen
                ? "M55 55 l5 5 h15 l5 -5 v-10 l-5 -5 h-15 l-10 10"
                : "M15 70 H 85"
            }
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
  );
};
