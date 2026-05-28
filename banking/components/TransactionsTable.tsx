import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { transactionCategoryStyles } from "@/constants"
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils"

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const {
    borderColor,
    backgroundColor,
    textColor,
    chipBackgroundColor,
   } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default
   
  return (
    <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
      <div className={cn('size-2 rounded-full', backgroundColor)} />
      <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>
    </div>
  )
} 

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
      <Table>
        <TableHeader className="bg-white/10">
          <TableRow className="border-b border-white/10 hover:bg-transparent">
            <TableHead className="px-4 py-4 text-gray-300 font-semibold">Transaction</TableHead>
            <TableHead className="px-4 py-4 text-gray-300 font-semibold">Amount</TableHead>
            <TableHead className="px-4 py-4 text-gray-300 font-semibold">Status</TableHead>
            <TableHead className="px-4 py-4 text-gray-300 font-semibold">Date</TableHead>
            <TableHead className="px-4 py-4 text-gray-300 font-semibold max-md:hidden">Channel</TableHead>
            <TableHead className="px-4 py-4 text-gray-300 font-semibold max-md:hidden">Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t: Transaction) => {
            const status = getTransactionStatus(new Date(t.date))
            const amount = formatAmount(t.amount)

            const isDebit = t.type === 'debit';
            const isCredit = t.type === 'credit';

            return (
              <TableRow key={t.id} className={cn(
                "border-b border-white/5 transition-colors hover:bg-white/10",
                isDebit || amount[0] === '-' ? 'bg-red-500/5' : 'bg-green-500/5'
              )}>
                <TableCell className="max-w-[250px] pl-4 pr-10 py-4">
                  <div className="flex items-center gap-3">
                    <h1 className="text-14 truncate font-semibold text-white">
                      {removeSpecialCharacters(t.name)}
                    </h1>
                  </div>
                </TableCell>

                <TableCell className={cn(
                  "pl-4 pr-10 py-4 font-bold text-16",
                  isDebit || amount[0] === '-' ? 'text-[#ff6b6b]' : 'text-[#51cf66]'
                )}>
                  {isDebit ? `-${amount}` : isCredit ? amount : amount}
                </TableCell>

                <TableCell className="pl-4 pr-10 py-4">
                  <CategoryBadge category={status} /> 
                </TableCell>

                <TableCell className="min-w-32 pl-4 pr-10 py-4 text-gray-400">
                  {formatDateTime(new Date(t.date)).dateTime}
                </TableCell>

                <TableCell className="pl-4 pr-10 py-4 capitalize min-w-24 text-gray-400">
                {t.paymentChannel}
                </TableCell>

                <TableCell className="pl-4 pr-10 py-4 max-md:hidden">
                <CategoryBadge category={t.category} /> 
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default TransactionsTable