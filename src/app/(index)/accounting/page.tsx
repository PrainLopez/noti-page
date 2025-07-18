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

const RecordVoSchema = z.object({
  time: z.date(),
  amount: z.number().nonnegative(),
  currency: z.enum(['GBP', 'USD', 'EUR', 'JPY', 'CNY']),
  note: z.string().trim().max(50)
})
type RecordVo = z.infer<typeof RecordVoSchema>;

const dummyDataRecords: Array<RecordVo> = [
  {
    time: new Date(1752791701839),
    amount: 5.29,
    currency: "GBP",
    note: "Lidl"
  },
  {
    time: new Date(1752751704953),
    amount: 3,
    currency: "GBP",
    note: "Tesco"
  },
  {
    time: new Date(1752691708495),
    amount: 13.99,
    currency: "GBP",
    note: "Fried Chicken"
  },
  {
    time: new Date(1752591701542),
    amount: 3.59,
    currency: "GBP",
    note: "Greggs"
  }
]

export default function HomePage() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);
    const data = Object.fromEntries(formData.entries());
    const parsedData = FormSubmitSchema.safeParse(data);
    if (!parsedData.success) {
      alert("Form invalid!");
      return;
    }
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        <main className="relative w-full flex flex-col">
          <div className="h-[2lh]" />
          <div className="absolute w-full" style={{ "--box-border-color": "var(--foreground1)" } as React.CSSProperties} box-="round">
            <span className="px-[1ch] flex gap-[1ch]">
              <input type="checkbox" name="specialExpense" />
              Hi! You can record your expenses here. (This is a demo page, so no data will be saved.)
            </span>
          </div>
          <div className="z-10 bg-(--background0)" box-="round" shear-="bottom">
            <div className="px-[1ch] py-0 sm:py-[1lh] flex flex-col sm:flex-row place-items-start gap-0 sm:gap-[1ch] mb-[1lh] sm:mb-0">
              <div className="flex col-span-1 sm:flex-1/3 gap-[1ch] mb-[1lh] w-full sm:mb-0">
                <input
                  type="number"
                  name="amount"
                  className="bg-(--background3) flex-2/3 h-[1lh]"
                  min={0}
                  step={0.1}
                  inputMode="decimal"
                  pattern="^\d+(\.\d{1,2})?$"
                  placeholder="0.00"
                />
                <select name="currency" className="bg-(--background3) flex-1/3 px-[1ch] h-[1lh]">
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
                className="bg-(--background3) w-full sm:flex-2/ h-[1lh]"
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
      <section className="relative w-full flex flex-col">
        <div className="h-[2lh]" />
        <div style={{ display: "absolute" }} className="absolute w-full" box-="round" shear-="top">
          <div className="header flex p-[1ch]">
            <h2 className="text-(--primary1) bg-(--background0)"> Recent Records</h2>
          </div>
        </div>
        {dummyDataRecords.map((record, index) => (
          <AccountingRow
            key={index}
            data={record}
            className={`${index % 2 === 0 ? "bg-(--background1)" : "bg-(--background2)"}`}
          />
        ))}
      </section >
    </>
  );
}
