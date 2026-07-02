import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { SubscriptionTier } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";

const TIER_LABEL: Record<SubscriptionTier, string> = { free: "Free", pro: "Pro", diamond: "Diamond" };

interface UpgradeGateProps {
  requiredTier: SubscriptionTier;
  featureName: string;
}

export function UpgradeGate({ requiredTier, featureName }: UpgradeGateProps) {
  return (
    <Card className="mx-auto max-w-xl">
      <div className="flex flex-col items-center py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Lock className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-slate-900">{featureName} is a {TIER_LABEL[requiredTier]} feature</h2>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          Upgrade to {TIER_LABEL[requiredTier]} to unlock {featureName.toLowerCase()} along with everything else in your plan.
        </p>
        <Link
          href="/subscription"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          View Plans <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}
