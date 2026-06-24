import type { ReactNode } from "react";

import { colorClass, typeClass } from "@/shared/tokens";

export function NoticeIcon({ label }: { label: string }) {
  return (
    <div
      className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${colorClass.lineBorder} ${colorClass.accentSoftBg} ${typeClass.body} font-bold ${colorClass.accentDeepText}`}
    >
      {label}
    </div>
  );
}

export function CheckedBox({ children }: { children: ReactNode }) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-2.5 rounded-xl border ${colorClass.lineBorder} ${colorClass.surfaceBg} px-3.5 py-[13px]`}
    >
      <span className={`flex h-5 w-5 items-center justify-center rounded-md border border-[#171719] ${colorClass.inkBg} text-xs text-white`}>
        ✓
      </span>
      <span className={`${typeClass.body} font-medium ${colorClass.bodyText}`}>{children}</span>
    </label>
  );
}

export function Bullet({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-[5px] w-[5px] flex-none rounded-full bg-[#C2C4C8]" />
      <span className={`text-xs ${colorClass.mutedText}`}>{children}</span>
    </div>
  );
}

export function Skeleton({ width, subtle = false }: { width: string; subtle?: boolean }) {
  return (
    <div
      className={`h-[9px] rounded-[5px] ${subtle ? "bg-[#EEEFF2]" : "bg-[#E6E8EC]"}`}
      style={{ width }}
    />
  );
}
