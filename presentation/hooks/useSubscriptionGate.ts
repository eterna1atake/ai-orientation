"use client";

import { useEffect, useState } from "react";
import { UserSubscription, SubscriptionTier } from "@/domain/entities";
import { fetchUserSubscription } from "@/data/repositories";
import { hasPlanAtLeast } from "@/domain/usecases";

export function useSubscriptionGate(requiredTier: SubscriptionTier) {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchUserSubscription().then((data) => {
      if (!isMounted) return;
      setSubscription(data);
      setIsLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    subscription,
    isLoading,
    hasAccess: subscription ? hasPlanAtLeast(subscription.tier, requiredTier) : false,
  };
}
