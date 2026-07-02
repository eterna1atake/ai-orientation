"use client";

import { Loader2, ArrowRight } from "lucide-react";
import { useSubscription } from "@/presentation/hooks/useSubscription";
import { CurrentPlanBanner } from "@/presentation/components/subscription/CurrentPlanBanner";
import { PlanCard } from "@/presentation/components/subscription/PlanCard";
import { PlanComparisonTable } from "@/presentation/components/subscription/PlanComparisonTable";
import { Card } from "@/presentation/components/ui/Card";

export default function SubscriptionPage() {
  const {
    plans,
    features,
    subscription,
    currentPlan,
    billingCycle,
    setBillingCycle,
    pendingTier,
    selectTier,
    cancelPendingChange,
    confirmTierChange,
    isLoading,
    isChanging,
  } = useSubscription();

  if (isLoading || !subscription) {
    return (
      <div className="flex h-96 items-center justify-center text-sm text-slate-400">
        Loading Subscription data...
      </div>
    );
  }

  const pendingPlan = plans.find((plan) => plan.tier === pendingTier) ?? null;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Subscription</h1>
        <p className="mt-1 text-sm text-slate-500">Compare plans and simulate an upgrade or downgrade — no real payment involved</p>
      </div>

      <CurrentPlanBanner subscription={subscription} plan={currentPlan} />

      {pendingPlan && (
        <Card className="border-indigo-200 bg-indigo-50/60">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-700">
              Downgrade to <span className="font-semibold">{pendingPlan.name}</span>? This takes effect
              immediately — no charge involved.
            </p>
            <div className="flex gap-2">
              <button
                onClick={cancelPendingChange}
                disabled={isChanging}
                className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={confirmTierChange}
                disabled={isChanging}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {isChanging ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    Confirm <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-center">
        <div className="inline-flex rounded-full bg-slate-100 p-1 text-sm">
          {(["monthly", "yearly"] as const).map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              className={`rounded-full px-4 py-1.5 font-medium capitalize transition-colors ${
                billingCycle === cycle ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              }`}
            >
              {cycle}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan.tier}
            plan={plan}
            billingCycle={billingCycle}
            currentTier={subscription.tier}
            pendingTier={pendingTier}
            isChanging={isChanging}
            onSelect={selectTier}
          />
        ))}
      </div>

      <PlanComparisonTable features={features} />
    </div>
  );
}
