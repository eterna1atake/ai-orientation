import { Check } from "lucide-react";
import { SubscriptionPlan, BillingCycle } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";

interface CheckoutSummaryCardProps {
  plan: SubscriptionPlan;
  billingCycle: BillingCycle;
  price: number;
}

export function CheckoutSummaryCard({ plan, billingCycle, price }: CheckoutSummaryCardProps) {
  return (
    <Card>
      <p className="text-sm text-slate-500">You&apos;re subscribing to</p>
      <h2 className="mt-1 text-xl font-semibold text-slate-900">{plan.name} Plan</h2>
      <p className="mt-1 text-sm text-slate-500">{plan.tagline}</p>

      <div className="mt-4 flex items-baseline gap-1 border-t border-slate-100 pt-4">
        <span className="text-3xl font-bold text-slate-900">${price.toLocaleString()}</span>
        <span className="text-sm text-slate-400">/{billingCycle === "yearly" ? "year" : "month"}</span>
      </div>

      <ul className="mt-5 space-y-2">
        {plan.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2 text-sm text-slate-600">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            {perk}
          </li>
        ))}
      </ul>
    </Card>
  );
}
