// Subscription simulation: Free / Pro / Diamond tiers

export type SubscriptionTier = "free" | "pro" | "diamond";
export type SubscriptionStatus = "active" | "cancelled";
export type BillingCycle = "monthly" | "yearly";

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  tagline: string;
  priceMonthly: number; // THB, 0 for Free
  priceYearly: number; // THB, discounted vs monthly x 12
  highlighted: boolean;
  perks: string[];
}

export type FeatureValue = boolean | string;

export interface PlanFeatureRow {
  key: string;
  label: string;
  free: FeatureValue;
  pro: FeatureValue;
  diamond: FeatureValue;
}

export interface UserSubscription {
  studentId: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  subscribedSince: string; // ISO date
  renewsOn: string; // ISO date
  billingCycle: BillingCycle;
  aiAssistantMessagesUsedToday: number;
}
