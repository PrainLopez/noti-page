"use client";
import { between } from "drizzle-orm";
import { useRef } from "react";
import * as z from "zod/v4";
import AccountingRow from "~/app/_components/accountingRow";
import AccountingSummary from "~/app/_components/accountingSummary";

const FormSubmitSchema = z.object({
  amount: z.number().nonnegative(),
  currency: z.enum(["GBP", "USD", "EUR", "JPY", "CNY"]),
  note: z.string().trim().max(50)
})

export default function HomePage() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        <main className="relative w-full flex flex-col">
          <div className="h-[2lh]" />
          <div className="absolute w-full" style={{ "--box-border-color": "var(--foreground1)" } as React.CSSProperties} box-="round">
            <span className="px-[1ch] flex gap-[1ch]">
              <input type="checkbox" name="specialExpense" />
              Is this a special expense?
            </span>
          </div>
          <div className="z-10 bg-(--background0)" box-="round" shear-="bottom">
            <div className="px-[1ch] py-0 sm:py-[1lh] flex flex-col sm:flex-row place-items-start gap-0 sm:gap-[1ch] mb-[1lh] sm:mb-0">
              <div className="flex col-span-1 sm:flex-1/3 gap-[1ch] mb-[1lh] w-full sm:mb-0">
                <input
                  type="number"
                  name="amount"
                  className="bg-(--background3) flex-2/3"
                  min={0}
                  step={0.1}
                  inputMode="decimal"
                  pattern="^\d+(\.\d{1,2})?$"
                  placeholder="0.00"
                />
                <select name="currency" className="bg-(--background3) flex-1/3 px-[1ch]">
                  <option value="GBP">GBP</option>
                  <option value="CNY">CNY</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="JPY">JPY</option>
                </select>
              </div>
              <h1 className="hidden sm:block">|</h1>
              <input
                type="text"
                name="note"
                className="bg-(--background3) w-full sm:flex-2/3"
                placeholder="For wut? (50 chars max)"
                maxLength={50}
              />
            </div>
            <div style={{ justifyContent: "space-between" }} className="header flex px-[1ch]">
              <span></span>
              <span>
                <button
                  type="submit"
                  className="bg-(--primary0) text-(--text-primary)"
                >
                  <h2>Submit</h2>
                </button>
              </span>
            </div>
          </div>
        </main>
      </form>
      <AccountingSummary />
      <section>
      </section>
    </>
  );
}
