import type { ReactNode } from "react";

import { colorClass, radiusClass, spacingClass, typeClass } from "@/shared/tokens";

import { IconButton } from "./button";

export function AiBubble({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className="flex items-start gap-2.5">
      <div
        className={`flex h-7 w-7 flex-none items-center justify-center rounded-lg border ${colorClass.lineBorder} ${colorClass.accentSoftBg} ${typeClass.micro} font-bold ${colorClass.accentDeepText}`}
      >
        AI
      </div>
      <div
        className={`${radiusClass.aiBubble} border ${colorClass.lineBorder} ${colorClass.surfaceBg} ${spacingClass.bubblePadding} ${typeClass.chat} ${colorClass.titleText} ${
          wide ? "max-w-[82%]" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function UserBubble({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className="flex justify-end">
      <div
        className={`${radiusClass.userBubble} ${colorClass.accentBg} ${spacingClass.bubblePadding} text-[13.5px] font-semibold text-white ${
          wide ? "max-w-[75%]" : "max-w-[82%]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function PromptBar({
  placeholder,
  onClick,
  arrow = "↑",
}: {
  placeholder: string;
  onClick?: () => void;
  arrow?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 ${radiusClass.pill} border border-[#D8DBDF] ${colorClass.surfaceBg} ${spacingClass.promptPadding}`}
    >
      <span className={`flex-1 ${typeClass.body} ${colorClass.faintText}`}>{placeholder}</span>
      <IconButton onClick={onClick}>{arrow}</IconButton>
    </div>
  );
}
