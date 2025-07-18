import ProgressBar from "./progressBar";
import LineChart from "./lineChart";
import * as z from "zod/v4";

const RecentDaysSchema = z.object({
  date: z.iso.date(),
  total: z.number().nonnegative()
})
type RecentDays = z.infer<typeof RecentDaysSchema>;
const RecentDataSchema = z.object({
  last5Days: z.array(RecentDaysSchema),
  dayAllowance: z.number().nonnegative()
})
type RecentData = z.infer<typeof RecentDataSchema>;

const dummyDataDay: RecentData = {
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

  const recentAverage: (last5Days: Array<RecentDays>) => string =
    (last5Days) => (last5Days.reduce((acc, day) => acc + day.total, 0) / last5Days.length).toFixed(2);

  return (
    <section className="relative w-full flex flex-col">
      <div className="" box-="round" shear-="top">
        <div className="header px-[1ch] flex">
          <h1 className="bg-(--background0) text-(--secondary0)">Summary</h1>
        </div>
        <span className="px-[1ch] grid grid-cols-10 sm:gap-[1ch]">
          <span className="col-span-2">Today:</span>
          <span className="col-span-2">
            {`${dummyDataDay.last5Days[0]?.total}/${dummyDataDay.dayAllowance}`}
          </span>
          <span className="col-span-6">
            <ProgressBar
              progress={Math.min((dummyDataDay.last5Days[0]?.total ?? 0) / dummyDataDay.dayAllowance, 1)}
              length={25}
            />
          </span>
        </span>
        <span className="px-[1ch] grid grid-cols-10 sm:gap-[1ch]">
          <span className="col-span-5">Recent day Avg:</span>
          <span className="col-span-2">
            {`${recentAverage(dummyDataDay.last5Days)}`}
          </span>
          <span className="col-span-3"><LineChart data={dummyDataDay.last5Days} /></span>
        </span>
        <span className="px-[1ch] grid grid-cols-10 sm:gap-[1ch]">
          <span className="col-span-2">Month:</span>
          <span className="col-span-2">
            {`${dummyDataMonth.monthTotal}/${dummyDataMonth.monthAllowance}`}
          </span>
          <span className="col-span-6">
            <ProgressBar
              progress={Math.min((dummyDataMonth.monthTotal) / dummyDataMonth.monthAllowance, 1)}
              length={25}
            />
          </span>
        </span>
        <span className="px-[1ch] grid grid-cols-10 sm:gap-[1ch]">
          <span className="col-span-5">Last month balance:</span>
          <span className="col-span-2">
            {`${dummyDataMonth.lastMoBalance}`}
          </span>
        </span>
      </div>
    </section>
  )
}