import { SubscriptionTier, UserSubscription, SubscriptionPlan, BillingCycle } from "../entities/Subscription";

const PLAN_ORDER: SubscriptionTier[] = ["free", "pro", "diamond"];

export function getPlanRank(tier: SubscriptionTier): number {
  return PLAN_ORDER.indexOf(tier);
}

export function isUpgrade(currentTier: SubscriptionTier, targetTier: SubscriptionTier): boolean {
  return getPlanRank(targetTier) > getPlanRank(currentTier);
}

export function hasPlanAtLeast(currentTier: SubscriptionTier, requiredTier: SubscriptionTier): boolean {
  return getPlanRank(currentTier) >= getPlanRank(requiredTier);
}

const AI_ASSISTANT_DAILY_LIMIT: Record<SubscriptionTier, number | null> = {
  free: 5,
  pro: null,
  diamond: null,
};

export function getAIAssistantDailyLimit(tier: SubscriptionTier): number | null {
  return AI_ASSISTANT_DAILY_LIMIT[tier];
}

export function getRemainingAIMessages(subscription: UserSubscription): number | null {
  const limit = getAIAssistantDailyLimit(subscription.tier);
  if (limit === null) return null;
  return Math.max(0, limit - subscription.aiAssistantMessagesUsedToday);
}

export function hasReachedAIAssistantLimit(subscription: UserSubscription): boolean {
  const remaining = getRemainingAIMessages(subscription);
  return remaining !== null && remaining <= 0;
}

export function getYearlySavingsPercent(plan: SubscriptionPlan): number {
  if (plan.priceMonthly === 0) return 0;
  const fullYearPrice = plan.priceMonthly * 12;
  return Math.round((1 - plan.priceYearly / fullYearPrice) * 100);
}

export function getPriceForCycle(plan: SubscriptionPlan, cycle: BillingCycle): number {
  return cycle === "yearly" ? plan.priceYearly : plan.priceMonthly;
}
