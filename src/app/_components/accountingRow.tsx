import * as z from 'zod/v4';

const RecordVoSchema = z.object({
  time: z.string(),
  amount: z.number().nonnegative(),
  currency: z.enum(['GBP', 'USD', 'EUR', 'JPY', 'CNY']),
  note: z.string().trim().max(50)
})
type RecordVo = z.infer<typeof RecordVoSchema>;

export default function AccountingRow(props: RecordVo) {
  RecordVoSchema.parse(props);
  return (
    <div className="grid grid-cols-5">

    </div>
  )
}