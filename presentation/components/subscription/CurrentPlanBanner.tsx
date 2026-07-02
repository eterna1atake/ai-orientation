import { CreditCard } from "lucide-react";
import { SubscriptionPlan, UserSubscription } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";
import { Badge } from "@/presentation/components/ui/Badge";

export function CurrentPlanBanner({ subscription, plan }: { subscription: UserSubscription; plan: SubscriptionPlan | null }) {
  const renewsOn = new Date(subscription.renewsOn).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <CreditCard className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-slate-500">Current plan</p>
          <p className="text-base font-semibold text-slate-900">{plan?.name ?? subscription.tier}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge tone={subscription.status === "active" ? "green" : "slate"}>{subscription.status}</Badge>
        {subscription.tier !== "free" && <span className="text-xs text-slate-400">Renews {renewsOn}</span>}
      </div>
    </Card>
  );
}
