import * as z from 'zod/v4';

const RecordVoSchema = z.object({
  time: z.date(),
  amount: z.number().nonnegative(),
  currency: z.enum(['GBP', 'USD', 'EUR', 'JPY', 'CNY']),
  note: z.string().trim().max(50)
})
type RecordVo = z.infer<typeof RecordVoSchema>;

export default function AccountingRow({ data, className }: { data: RecordVo, className?: string }) {
  RecordVoSchema.parse(data); // Validate data against schema
  console.log(className);
  return (
    <div className={`grid grid-cols-10 px-[1ch] items-center justify-between z-10 ${className ?? ''}`}>
      <span className="col-span-5">{data.time.toString()}</span>
      <span className="col-span-1">{data.amount.toFixed(2)} {data.currency}</span>
      <span className="col-span-4">{data.note}</span>
    </div>
  )
}