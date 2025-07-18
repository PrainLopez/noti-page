"use client";
import * as z from "zod/v4";

const RecentDaysSchema = z.object({
  date: z.iso.date("wrong date format"),
  total: z.number().nonnegative("negative total not allowed")
})
type RecentDays = z.infer<typeof RecentDaysSchema>;
const dataSchema = z.array(RecentDaysSchema);

export default function LineChart(props: { data: Array<RecentDays> }) {
  dataSchema.parse(props.data);

  const todayTotal = props.data[0]?.total ?? 0;
  console.log(props.data.map(day => day.total));
  console.log("todayTotal", todayTotal);
  const chart = props.data.toReversed().map((day, index) => {
    const char = (day.total > todayTotal ? "+" : day.total < todayTotal ? "-" : "=");
    const color = day.total > todayTotal ? "text-green-500" : day.total < todayTotal ? "text-red-500" : ""
    return (
      <span key={index} className={`inline-block ${color}`}>
        {char}
      </span>
    )
  });

  return (
    <span>
      {chart}
    </span>
  )
}