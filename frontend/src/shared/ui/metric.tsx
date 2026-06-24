import { colorClass, typeClass } from "@/shared/tokens";

export function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className={`${typeClass.metricValue} ${colorClass.titleText}`}>{value}</div>
      <div className={`${typeClass.micro} ${colorClass.quietText}`}>{label}</div>
    </div>
  );
}
