interface ProgressBarProps {
  percent: number;
  colorClassName?: string;
  trackClassName?: string;
  heightClassName?: string;
}

export function ProgressBar({
  percent,
  colorClassName = "bg-indigo-600",
  trackClassName = "bg-slate-100",
  heightClassName = "h-2.5",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className={`w-full overflow-hidden rounded-full ${trackClassName} ${heightClassName}`}>
      <div
        className={`h-full rounded-full ${colorClassName} transition-all duration-500`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
