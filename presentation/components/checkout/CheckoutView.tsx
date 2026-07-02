"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCheckout } from "@/presentation/hooks/useCheckout";
import { CheckoutSummaryCard } from "./CheckoutSummaryCard";
import { PaymentForm } from "./PaymentForm";
import { CheckoutSuccess } from "./CheckoutSuccess";
import { Card } from "@/presentation/components/ui/Card";

export function CheckoutView() {
  const { plan, billingCycle, price, isLoading, isProcessing, isSuccess, submitPayment, goToDashboard, goToSubscription } =
    useCheckout();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center text-sm text-slate-400">
        Loading Checkout...
      </div>
    );
  }

  if (!plan) {
    return (
      <Card className="mx-auto max-w-md">
        <div className="flex flex-col items-center py-8 text-center">
          <p className="text-sm text-slate-500">No plan selected for checkout.</p>
          <Link href="/subscription" className="mt-4 text-sm font-medium text-indigo-600 hover:underline">
            Back to Plans
          </Link>
        </div>
      </Card>
    );
  }

  if (isSuccess) {
    return <CheckoutSuccess plan={plan} onGoToDashboard={goToDashboard} onGoToSubscription={goToSubscription} />;
  }

  const amountLabel = price === 0 ? "Free" : `$${price.toLocaleString()}`;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link href="/subscription" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="h-4 w-4" /> Back to Plans
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
        <p className="mt-1 text-sm text-slate-500">Simulated payment — no real charge will occur</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <CheckoutSummaryCard plan={plan} billingCycle={billingCycle} price={price} />
        <PaymentForm amountLabel={amountLabel} isProcessing={isProcessing} onSubmit={submitPayment} />
      </div>
    </div>
  );
}
