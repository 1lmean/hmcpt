import { colorClass } from "@/shared/tokens";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-none items-center justify-center ${colorClass.accentBg} font-extrabold ${colorClass.inkText} ${className}`}
    >
      한
    </div>
  );
}
