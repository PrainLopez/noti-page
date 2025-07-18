import ProgressBar from "./progressBar";

const dummyDataRecords = [
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
const dummyDataDay = {
  last5Days: [
    { date: "2025-07-18", total: 8.29 },
    { date: "2025-07-17", total: 13.99 },
    { date: "2025-07-16", total: 3.59 },
    { date: "2025-07-15", total: 9.02 },
    { date: "2025-07-14", total: 2.09 }
  ],
  dayAllowance: 20.00,
}
const dummyDataMonth = {
  monthTotal: 123.45,
  lastMoBalance: 67.89,
  monthAllowance: 620.00,
}

export default function AccountingRow() {
  return (
    <section className="relative w-full flex flex-col">
      <div className="" box-="round" shear-="top">
        <div className="header px-[1ch]">
          <span className="bg-(--background0)">Summary</span>
        </div>
        <span className="px-[1ch] grid grid-cols-10 gap-[1ch]">
          <span className="col-span-2">Today:</span>
          <span className="col-span-2">
            {`${dummyDataDay.last5Days[0]?.total}/${dummyDataDay.dayAllowance}`}
          </span>
          <span className="col-span-6">
            <ProgressBar
              progress={Math.min((dummyDataDay.last5Days[0]?.total ?? 0) / dummyDataDay.dayAllowance, 1)}
              length={37}
            />
          </span>
        </span>
        <span className="px-[1ch] grid grid-cols-10 gap-[1ch]">
          <span className="col-span-2">Recent:</span>
          <span className="col-span-3">
            {`${dummyDataMonth.monthTotal}/${dummyDataMonth.monthAllowance}`}
          </span>
          <span className="col-span-5"></span>
        </span>
      </div>
    </section>
  )
}