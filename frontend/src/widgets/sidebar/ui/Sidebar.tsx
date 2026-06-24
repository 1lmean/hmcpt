"use client";

import { useState } from "react";

import { colorClass, typeClass } from "@/shared/tokens";

type HistoryItem = { id: string; title: string };
type HistoryGroup = { label: string; items: HistoryItem[] };

const MOCK_HISTORY: HistoryGroup[] = [
  {
    label: "오늘",
    items: [
      { id: "1", title: "교차로 직진 중 좌회전 충돌" },
      { id: "2", title: "주차장 후진 접촉사고" },
    ],
  },
  {
    label: "지난 7일",
    items: [
      { id: "3", title: "신호대기 중 추돌" },
      { id: "4", title: "차로 변경 중 측면 접촉" },
      { id: "5", title: "보행자 횡단보도 사고" },
    ],
  },
];

export function Sidebar() {
  const [activeId, setActiveId] = useState("1");

  return (
    <aside
      className={`flex h-full w-[320px] flex-none flex-col border-r ${colorClass.lineBorder} ${colorClass.surfaceSoftBg}`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5">
        <div
          className={`flex h-8 w-8 flex-none items-center justify-center rounded-lg ${colorClass.accentBg} text-[13px] font-bold text-white`}
        >
          한
        </div>
        <span
          className={`${typeClass.body} font-semibold ${colorClass.inkText}`}
        >
          한문철피티
        </span>
      </div>

      {/* New analysis */}
      <div className="px-3 pb-4">
        <button
          className={`flex w-full items-center gap-2 rounded-xl border ${colorClass.lineBorder} ${colorClass.surfaceBg} px-4 py-[11px] ${typeClass.body} font-medium ${colorClass.titleText} transition hover:${colorClass.surfaceSoftBg}`}
        >
          <span className="text-[17px] font-light leading-none">+</span>새 분석
        </button>
      </div>

      {/* History */}
      <nav className="flex-1 overflow-y-auto px-3">
        {MOCK_HISTORY.map((group) => (
          <div key={group.label} className="mb-2">
            <div
              className={`px-2 pb-1 pt-2 ${typeClass.caption} font-medium ${colorClass.quietText}`}
            >
              {group.label}
            </div>
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`flex w-full items-center rounded-lg px-3 py-[9px] text-left ${typeClass.body} transition ${
                  activeId === item.id
                    ? `${colorClass.accentSoftBg} font-semibold`
                    : `${colorClass.bodyText} hover:bg-[#F4F4F5]`
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div
        className={`flex items-center gap-3 border-t ${colorClass.lineBorder} px-4 py-4`}
      >
        <div
          className={`flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#D2D5DA]`}
        />
        <div className="min-w-0 flex-1">
          <div
            className={`truncate ${typeClass.body} font-semibold ${colorClass.inkText}`}
          >
            로그인 필요
          </div>
          <div className={`truncate ${typeClass.tiny} ${colorClass.quietText}`}>
            기록 저장·동기화
          </div>
        </div>
        <button
          className={`flex h-7 w-7 flex-none items-center justify-center rounded-md ${colorClass.surfaceSoftBg} ${colorClass.mutedText} transition hover:bg-[#E9EAEC]`}
        >
          <SettingsIcon />
        </button>
      </div>
    </aside>
  );
}

function SettingsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.93 2.93l1.06 1.06M10.01 10.01l1.06 1.06M2.93 11.07l1.06-1.06M10.01 3.99l1.06-1.06"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
