import { CheckCircle2, LayoutDashboard, Gem } from "lucide-react";
import { SubscriptionPlan } from "@/domain/entities";
import { Card } from "@/presentation/components/ui/Card";

interface CheckoutSuccessProps {
  plan: SubscriptionPlan;
  onGoToDashboard: () => void;
  onGoToSubscription: () => void;
}

export function CheckoutSuccess({ plan, onGoToDashboard, onGoToSubscription }: CheckoutSuccessProps) {
  return (
    <Card className="mx-auto max-w-md">
      <div className="flex flex-col items-center py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-slate-900">Payment Successful!</h2>
        <p className="mt-2 text-sm text-slate-500">
          You&apos;re now on the <span className="font-medium text-slate-700">{plan.name}</span> plan. Enjoy your new features!
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={onGoToSubscription}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
          >
            <Gem className="h-4 w-4" /> View Subscription
          </button>
          <button
            onClick={onGoToDashboard}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            <LayoutDashboard className="h-4 w-4" /> Go to Dashboard
          </button>
        </div>
      </div>
    </Card>
  );
}
