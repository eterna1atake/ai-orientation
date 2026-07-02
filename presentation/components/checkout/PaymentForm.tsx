"use client";

import { FormEvent, useState } from "react";
import { CreditCard, Lock, Loader2 } from "lucide-react";
import { Card } from "@/presentation/components/ui/Card";

interface PaymentFormProps {
  amountLabel: string;
  isProcessing: boolean;
  onSubmit: () => void;
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return (digits.match(/.{1,4}/g) ?? []).join(" ");
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length <= 2 ? digits : `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function PaymentForm({ amountLabel, isProcessing, onSubmit }: PaymentFormProps) {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Enter the name on your card";
    if (cardNumber.replace(/\s/g, "").length !== 16) nextErrors.cardNumber = "Card number must be 16 digits";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) nextErrors.expiry = "Use MM/YY format";
    if (!/^\d{3,4}$/.test(cvc)) nextErrors.cvc = "3-4 digits";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit();
  }

  return (
    <Card>
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500">
        <CreditCard className="h-4 w-4" /> Payment Details
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">Name on Card</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Kittitat Mukdasanit"
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
          {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">Card Number</label>
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="4242 4242 4242 4242"
            inputMode="numeric"
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
          {errors.cardNumber && <p className="mt-1 text-xs text-rose-500">{errors.cardNumber}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">Expiry</label>
            <input
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              inputMode="numeric"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
            {errors.expiry && <p className="mt-1 text-xs text-rose-500">{errors.expiry}</p>}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">CVC</label>
            <input
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="123"
              inputMode="numeric"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
            {errors.cvc && <p className="mt-1 text-xs text-rose-500">{errors.cvc}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Processing Payment...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" /> Pay {amountLabel}
            </>
          )}
        </button>
        <p className="text-center text-[11px] text-slate-400">This is a simulated checkout — no real payment is processed.</p>
      </form>
    </Card>
  );
}
