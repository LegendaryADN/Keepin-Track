"use client";

import { useRef, useState } from "react";
import { addExpense } from "@/app/actions";

export default function ExpenseForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [flash, setFlash] = useState<{ id: number; total: string } | null>(
    null
  );

  async function handleSubmit(formData: FormData) {
    const total = formData.get("total") as string;
    if (total) {
      setFlash({ id: Date.now(), total });
    }
    formRef.current?.reset();
    await addExpense(formData);
  }

  return (
    <div className="relative">
      <form ref={formRef} action={handleSubmit} className="space-y-3">
        <div className="flex gap-3">
          <div className="flex-1">
            <label htmlFor="total" className="sr-only">
              Total
            </label>
            <input
              id="total"
              name="total"
              type="number"
              step="0.01"
              min="0.01"
              required
              placeholder="0.00"
              className="w-full rounded-lg bg-[#2E1B18] border border-[#55241F] px-4 py-2.5 text-[#EDE0D3] placeholder:text-[#EDE0D3]/30 outline-none focus:border-[#DD4F44] transition-colors"
            />
          </div>
          <div className="flex-[1.4]">
            <label htmlFor="concepto" className="sr-only">
              Concepto
            </label>
            <input
              id="concepto"
              name="concepto"
              type="text"
              required
              placeholder="Concepto"
              className="w-full rounded-lg bg-[#2E1B18] border border-[#55241F] px-4 py-2.5 text-[#EDE0D3] placeholder:text-[#EDE0D3]/30 outline-none focus:border-[#DD4F44] transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#DD4F44] text-[#121212] font-medium py-2.5 hover:bg-[#DD4F44]/90 active:scale-[0.99] transition"
        >
          Registrar gasto
        </button>
      </form>

      {flash && (
        <span
          key={flash.id}
          onAnimationEnd={() => setFlash(null)}
          className="pointer-events-none absolute right-2 top-0 select-none text-2xl font-bold text-[#DD4F44] animate-flyoff"
        >
          -${flash.total}
        </span>
      )}

      <style jsx global>{`
        @keyframes flyoff {
          0% {
            opacity: 0;
            transform: translateY(0) rotate(0deg) scale(0.7);
          }
          20% {
            opacity: 1;
            transform: translateY(-14px) rotate(-4deg) scale(1.2);
          }
          75% {
            opacity: 1;
            transform: translateY(-46px) rotate(3deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) rotate(0deg) scale(0.85);
          }
        }
        .animate-flyoff {
          animation: flyoff 1.1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
