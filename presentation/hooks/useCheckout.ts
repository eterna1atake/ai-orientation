"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SubscriptionPlan, SubscriptionTier, BillingCycle } from "@/domain/entities";
import { fetchSubscriptionPlans, changeSubscriptionTier } from "@/data/repositories";
import { getPriceForCycle } from "@/domain/usecases";

const UPGRADABLE_TIERS: SubscriptionTier[] = ["pro", "diamond"];

export function useCheckout() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawTier = searchParams.get("tier");
  const tier = UPGRADABLE_TIERS.includes(rawTier as SubscriptionTier) ? (rawTier as SubscriptionTier) : null;
  const billingCycle: BillingCycle = searchParams.get("cycle") === "yearly" ? "yearly" : "monthly";

  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetchSubscriptionPlans().then((data) => {
      if (!isMounted) return;
      setPlans(data);
      setIsLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const plan = tier ? plans.find((p) => p.tier === tier) ?? null : null;
  const price = plan ? getPriceForCycle(plan, billingCycle) : 0;

  async function submitPayment() {
    if (!tier) return;
    setIsProcessing(true);
    await changeSubscriptionTier(tier, billingCycle);
    setIsProcessing(false);
    setIsSuccess(true);
  }

  return {
    plan,
    billingCycle,
    price,
    isLoading,
    isProcessing,
    isSuccess,
    submitPayment,
    goToDashboard: () => router.push("/"),
    goToSubscription: () => router.push("/subscription"),
  };
}
