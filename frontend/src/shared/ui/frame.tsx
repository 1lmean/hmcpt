import type { ReactNode } from "react";

import { colorClass, radiusClass, shadowClass, spacingClass } from "@/shared/tokens";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className={`flex ${spacingClass.phoneSize} max-w-full flex-col ${radiusClass.phone} border ${colorClass.lineStrongBorder} ${colorClass.surfaceBg} ${spacingClass.framePadding} ${shadowClass.phone}`}
    >
      <div className={`relative flex flex-1 flex-col overflow-hidden ${radiusClass.phoneInner} ${colorClass.surfaceSoftBg}`}>
        <PhoneStatus />
        {children}
      </div>
    </div>
  );
}

export function PhoneStatus() {
  return (
    <div className="flex flex-none items-center justify-between px-[22px] pb-1.5 pt-3">
      <span className={`text-xs font-semibold ${colorClass.mutedText}`}>9:41</span>
      <div className="flex gap-1">
        <span className="h-[9px] w-4 rounded-sm bg-[#C2C4C8]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#C2C4C8]" />
      </div>
    </div>
  );
}

export function BrowserBar() {
  return (
    <div className={`flex items-center gap-[7px] border-b ${colorClass.lineBorder} bg-[#F2F3F5] px-4 py-[11px]`}>
      <span className="h-[11px] w-[11px] rounded-full bg-[#D6D8DC]" />
      <span className="h-[11px] w-[11px] rounded-full bg-[#D6D8DC]" />
      <span className="h-[11px] w-[11px] rounded-full bg-[#D6D8DC]" />
      <span
        className={`ml-3.5 max-w-[340px] flex-1 ${radiusClass.sm} border ${colorClass.lineBorder} ${colorClass.surfaceBg} px-3 py-[5px] text-[11px] ${colorClass.quietText}`}
      >
        hanmuncheol-pt.app
      </span>
    </div>
  );
}
