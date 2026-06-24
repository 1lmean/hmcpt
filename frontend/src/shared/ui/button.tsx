import type { ReactNode } from "react";

import {
  colorClass,
  shadowClass,
  spacingClass,
  typeClass,
} from "@/shared/tokens";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export function PrimaryButton({
  children,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border-0 ${colorClass.accentBg} ${spacingClass.buttonPadding} ${typeClass.button} text-white ${shadowClass.accentButton} ${className}`}
    >
      {children}
    </button>
  );
}

export function IconButton({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border-0 ${colorClass.accentBg} text-[15px] font-extrabold text-white`}
    >
      {children}
    </button>
  );
}
