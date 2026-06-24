"use client";

import { useState } from "react";

import { Check } from "lucide-react";

import { NoticeIcon } from "@/shared/ui";
import { colorClass, typeClass } from "@/shared/tokens";

type Props = {
  onAgree: () => void;
  onClose: () => void;
};

export function DisclaimerModal({ onAgree, onClose }: Props) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex h-full items-center justify-center bg-black/20">
      <div
        className={`mx-6 w-full max-w-[500px] rounded-2xl ${colorClass.surfaceBg} p-8 shadow-xl`}
      >
        <NoticeIcon label="고지" />

        <h1
          className={`mt-5 text-[21px] font-bold leading-snug ${colorClass.inkText}`}
        >
          분석을 시작하기 전에 확인하세요
        </h1>

        <p className={`mt-3 ${typeClass.body} leading-[1.7] ${colorClass.mutedText}`}>
          본 서비스는 대법원 공개 판례 기반의{" "}
          <b className={colorClass.titleText}>참고용 정보</b>로, 법률 자문이나
          법적 효력을 가지지 않습니다. 2013년 이후 민사 판례만 포함합니다.
        </p>

        <label
          className={`mt-5 flex cursor-pointer items-center gap-2.5 rounded-xl border ${colorClass.lineBorder} ${colorClass.surfaceBg} px-3.5 py-[13px] transition hover:bg-[#F7F7F8]`}
        >
          <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span
            className={`flex h-5 w-5 flex-none items-center justify-center rounded-md border transition ${
              checked
                ? `border-[#171719] ${colorClass.inkBg} text-white`
                : "border-[#D2D5DA] bg-white text-transparent"
            }`}
          >
            <Check size={12} strokeWidth={3} />
          </span>
          <span className={`${typeClass.body} font-medium ${colorClass.bodyText}`}>
            위 안내를 확인했습니다
          </span>
        </label>

        <div className="mt-4 flex gap-2">
          <button
            onClick={onClose}
            className={`h-12 flex-none rounded-xl border ${colorClass.lineStrongBorder} px-5 ${typeClass.body} font-semibold ${colorClass.bodyText} transition hover:bg-[#F4F4F5]`}
          >
            종료
          </button>
          <button
            onClick={onAgree}
            disabled={!checked}
            className={`h-12 flex-1 rounded-xl ${typeClass.body} font-semibold text-white transition ${
              checked
                ? `${colorClass.inkBg} hover:bg-[#383838]`
                : "cursor-not-allowed bg-[#C2C4C8]"
            }`}
          >
            동의하고 시작
          </button>
        </div>
      </div>
    </div>
  );
}
