"use client";

import { useEffect, useState } from "react";
import { SubscriptionPlan, PlanFeatureRow, UserSubscription, SubscriptionTier, BillingCycle } from "@/domain/entities";
import { fetchSubscriptionPlans, fetchPlanFeatures, fetchUserSubscription, changeSubscriptionTier } from "@/data/repositories";

export function useSubscription() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [features, setFeatures] = useState<PlanFeatureRow[]>([]);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [pendingTier, setPendingTier] = useState<SubscriptionTier | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchSubscriptionPlans(), fetchPlanFeatures(), fetchUserSubscription()]).then(
      ([planData, featureData, subscriptionData]) => {
        if (!isMounted) return;
        setPlans(planData);
        setFeatures(featureData);
        setSubscription(subscriptionData);
        setBillingCycle(subscriptionData.billingCycle);
        setIsLoading(false);
      }
    );
    return () => {
      isMounted = false;
    };
  }, []);

  const currentPlan = plans.find((plan) => plan.tier === subscription?.tier) ?? null;

  async function confirmTierChange() {
    if (!pendingTier) return;
    setIsChanging(true);
    const updated = await changeSubscriptionTier(pendingTier, billingCycle);
    setSubscription(updated);
    setIsChanging(false);
    setPendingTier(null);
  }

  return {
    plans,
    features,
    subscription,
    currentPlan,
    billingCycle,
    setBillingCycle,
    pendingTier,
    selectTier: setPendingTier,
    cancelPendingChange: () => setPendingTier(null),
    confirmTierChange,
    isLoading,
    isChanging,
  };
}
