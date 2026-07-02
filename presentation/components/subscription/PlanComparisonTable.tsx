import { Check, X } from "lucide-react";
import { PlanFeatureRow, FeatureValue } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { SectionHeader } from "@/presentation/components/ui/SectionHeader";

function FeatureCell({ value }: { value: FeatureValue }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto h-4 w-4 text-emerald-500" />
    ) : (
      <X className="mx-auto h-4 w-4 text-slate-300" />
    );
  }
  return <span className="text-xs font-medium text-slate-600">{value}</span>;
}

export function PlanComparisonTable({ features }: { features: PlanFeatureRow[] }) {
  return (
    <Card className="overflow-x-auto">
      <SectionHeader title="Compare Plans" description="Full feature breakdown across all tiers" />
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-slate-400">
            <th className="py-2 pr-4 text-left font-medium">Feature</th>
            <th className="w-24 py-2 text-center font-medium">Free</th>
            <th className="w-24 py-2 text-center font-medium">Pro</th>
            <th className="w-24 py-2 text-center font-medium">Diamond</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature.key} className="border-b border-slate-50 last:border-0">
              <td className="py-3 pr-4 text-slate-700">{feature.label}</td>
              <td className="py-3 text-center">
                <FeatureCell value={feature.free} />
              </td>
              <td className="py-3 text-center">
                <FeatureCell value={feature.pro} />
              </td>
              <td className="py-3 text-center">
                <FeatureCell value={feature.diamond} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
