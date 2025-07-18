import * as z from 'zod/v4';

const recordVoSchema = z.object({
  time: z.string(),
  amount: z.number().nonnegative(),
  currency: z.enum(['GBP', 'USD', 'EUR', 'JPY', 'CNY']),
  note: z.string().trim().max(50)
})

export default function AccountingRow({ }) {
  return (
    <div className="grid grid-cols-5">

    </div>
  )
}