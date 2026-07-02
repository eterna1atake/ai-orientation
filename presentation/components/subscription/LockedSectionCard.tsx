import Link from "next/link";
import { Lock } from "lucide-react";
import { SubscriptionTier } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";

const TIER_LABEL: Record<SubscriptionTier, string> = { free: "Free", pro: "Pro", diamond: "Diamond" };

interface LockedSectionCardProps {
  requiredTier: SubscriptionTier;
  featureName: string;
}

export function LockedSectionCard({ requiredTier, featureName }: LockedSectionCardProps) {
  return (
    <Card className="flex flex-col items-center justify-center gap-2 py-10 text-center">
      <Lock className="h-6 w-6 text-slate-300" />
      <p className="text-sm font-medium text-slate-700">{featureName} is a {TIER_LABEL[requiredTier]} feature</p>
      <Link href="/subscription" className="text-xs font-medium text-indigo-600 hover:underline">
        Upgrade to {TIER_LABEL[requiredTier]}
      </Link>
    </Card>
  );
}
