import type { ReactNode } from "react";

import { colorClass, radiusClass, typeClass } from "@/shared/tokens";

export function TopTabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap ${radiusClass.md} px-3.5 py-2 ${typeClass.body} font-semibold transition ${
        active ? `${colorClass.surfaceBg} ${colorClass.inkText} shadow-[0_1px_3px_rgba(0,0,0,.1)]` : colorClass.mutedText
      }`}
    >
      {children}
    </button>
  );
}

export function Stepper({
  steps,
  current,
  onSelect,
  maxWidth,
}: {
  steps: string[];
  current: number;
  onSelect: (index: number) => void;
  maxWidth: string;
}) {
  return (
    <div className={`mb-5 w-full ${maxWidth} overflow-x-auto pb-1.5`}>
      <div className="flex w-max gap-2">
        {steps.map((step, index) => (
          <button
            key={step}
            onClick={() => onSelect(index)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-[7px] text-xs transition ${
              current === index
                ? `border-[#171719] ${colorClass.inkBg} font-semibold text-white`
                : `border-[#D6D8DC] ${colorClass.surfaceBg} ${colorClass.mutedText}`
            }`}
          >
            <span className="font-bold">{index + 1}</span>
            <span>{step}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function StageControls({
  label,
  current,
  total,
  onPrev,
  onNext,
}: {
  label: string;
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-[22px] flex items-center gap-4">
      <button
        onClick={onPrev}
        className={`h-[42px] w-[42px] ${radiusClass.pill} border ${colorClass.lineStrongBorder} ${colorClass.surfaceBg} text-[17px] text-[#5A5C63]`}
      >
        ←
      </button>
      <div className="min-w-40 text-center">
        <div className={`${typeClass.label} ${colorClass.inkText}`}>{label}</div>
        <div className={`${typeClass.tiny} ${colorClass.quietText}`}>
          {current + 1} / {total}
        </div>
      </div>
      <button
        onClick={onNext}
        className={`h-[42px] w-[42px] ${radiusClass.pill} border border-[#171719] ${colorClass.inkBg} text-[17px] text-white`}
      >
        →
      </button>
    </div>
  );
}
