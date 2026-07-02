import { SubscriptionPlan, PlanFeatureRow, UserSubscription, SubscriptionTier, BillingCycle } from "@/domain/entities";
import { mockSubscriptionPlans, mockPlanFeatures, mockUserSubscription } from "@/data/mocks/mockDataStore";
import { withLatency } from "./delay";

// In-memory session state standing in for the billing backend.
let currentSubscription: UserSubscription = { ...mockUserSubscription };

export async function fetchSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  return withLatency(mockSubscriptionPlans, 300);
}

export async function fetchPlanFeatures(): Promise<PlanFeatureRow[]> {
  return withLatency(mockPlanFeatures, 300);
}

export async function fetchUserSubscription(): Promise<UserSubscription> {
  return withLatency({ ...currentSubscription }, 250);
}

export async function changeSubscriptionTier(tier: SubscriptionTier, billingCycle: BillingCycle): Promise<UserSubscription> {
  currentSubscription = { ...currentSubscription, tier, billingCycle, status: "active" };
  // Simulate payment processing latency.
  return withLatency({ ...currentSubscription }, 900);
}

export async function cancelSubscription(): Promise<UserSubscription> {
  currentSubscription = { ...currentSubscription, tier: "free", status: "active" };
  return withLatency({ ...currentSubscription }, 500);
}

export async function incrementAIAssistantUsage(): Promise<UserSubscription> {
  currentSubscription = {
    ...currentSubscription,
    aiAssistantMessagesUsedToday: currentSubscription.aiAssistantMessagesUsedToday + 1,
  };
  return withLatency({ ...currentSubscription }, 100);
}
