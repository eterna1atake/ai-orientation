import { Suspense } from "react";
import { CheckoutView } from "@/presentation/components/checkout/CheckoutView";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-96 items-center justify-center text-sm text-slate-400">
          Loading Checkout...
        </div>
      }
    >
      <CheckoutView />
    </Suspense>
  );
}
