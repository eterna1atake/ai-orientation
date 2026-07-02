import { Check, Sparkles, Loader2 } from "lucide-react";
import { SubscriptionPlan, SubscriptionTier, BillingCycle } from "@/domain/entities";
import { getPriceForCycle } from "@/domain/usecases";
import { Card } from "@/presentation/components/ui/Card";
import { Badge } from "@/presentation/components/ui/Badge";

interface PlanCardProps {
  plan: SubscriptionPlan;
  billingCycle: BillingCycle;
  currentTier: SubscriptionTier;
  pendingTier: SubscriptionTier | null;
  isChanging: boolean;
  onSelect: (tier: SubscriptionTier) => void;
}

export function PlanCard({ plan, billingCycle, currentTier, pendingTier, isChanging, onSelect }: PlanCardProps) {
  const isCurrent = plan.tier === currentTier;
  const isPending = plan.tier === pendingTier;
  const price = getPriceForCycle(plan, billingCycle);

  return (
    <Card
      className={`relative flex flex-col ${plan.highlighted ? "border-indigo-300 ring-2 ring-indigo-100" : ""
        } ${isCurrent ? "bg-slate-50" : ""}`}
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-5 inline-flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-1 text-[11px] font-medium text-white">
          <Sparkles className="h-3 w-3" /> Most Popular
        </span>
      )}

      <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
      <p className="mt-1 text-sm text-slate-500">{plan.tagline}</p>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-slate-900">
          {price === 0 ? "Free" : `$${price.toLocaleString()}`}
        </span>
        {price > 0 && (
          <span className="text-sm text-slate-400">/{billingCycle === "yearly" ? "year" : "month"}</span>
        )}
      </div>

      <ul className="mt-5 flex-1 space-y-2.5">
        {plan.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2 text-sm text-slate-600">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            {perk}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        {isCurrent ? (
          <Badge tone="green" className="w-full justify-center py-2 text-sm">
            Current Plan
          </Badge>
        ) : (
          <button
            onClick={() => onSelect(plan.tier)}
            disabled={isChanging}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 ${plan.highlighted
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
          >
            {isPending && isChanging ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              "Choose Plan"
            )}
          </button>
        )}
      </div>
    </Card>
  );
}
