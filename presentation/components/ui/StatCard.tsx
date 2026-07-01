import { LucideIcon } from "lucide-react";
import { Card } from "./Card";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  accentClassName?: string;
  helperText?: string;
}

export function StatCard({ label, value, icon: Icon, accentClassName = "bg-indigo-50 text-indigo-600", helperText }: StatCardProps) {
  return (
    <Card className="flex items-start gap-4">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accentClassName}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-0.5 text-2xl font-semibold text-slate-900">{value}</p>
        {helperText && <p className="mt-1 text-xs text-slate-400">{helperText}</p>}
      </div>
    </Card>
  );
}
