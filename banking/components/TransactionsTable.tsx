import {
  Table,
  TableBody,
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
    <div className="overflow-hidden rounded-2xl border border-white/[0.06] shadow-card-glow backdrop-blur-md"
      style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)' }}
    >
      <Table>
        <TableHeader>
          <TableRow className="border-b border-white/[0.06] hover:bg-transparent"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            {["Transaction", "Amount", "Status", "Date", "Channel", "Category"].map((col, i) => (
              <TableHead
                key={col}
                className={cn(
                  "px-4 py-4 text-[11px] font-semibold uppercase tracking-widest text-gray-500",
                  i >= 4 && "max-md:hidden"
                )}
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((t: Transaction, idx: number) => {
            const status = getTransactionStatus(new Date(t.date));
            const amount = formatAmount(t.amount);
            const isDebit = t.type === 'debit';
            const isCredit = t.type === 'credit';
            const isNegative = isDebit || amount[0] === '-';

            return (
              <TableRow
                key={t.id}
                className={cn(
                  "border-b border-white/[0.04] transition-all duration-300 cursor-default",
                  "hover:border-white/10",
                  isNegative
                    ? "hover:bg-red-500/5"
                    : "hover:bg-green-500/5"
                )}
                style={{
                  animationDelay: `${idx * 40}ms`,
                  animation: 'fade-in-up 0.4s ease-out forwards',
                  opacity: 0,
                }}
              >
                <TableCell className="max-w-[250px] pl-4 pr-10 py-4">
                  <div className="flex items-center gap-3">
                    {/* Transaction icon dot */}
                    <div className={cn(
                      "size-2 shrink-0 rounded-full",
                      isNegative ? "bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.6)]" : "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]"
                    )} />
                    <h1 className="text-14 truncate font-semibold text-white">
                      {removeSpecialCharacters(t.name)}
                    </h1>
                  </div>
                </TableCell>

                <TableCell className={cn(
                  "pl-4 pr-10 py-4 font-bold text-16 tabular-nums",
                  isNegative ? 'text-[#fc8181]' : 'text-[#68d391]'
                )}>
                  {isNegative ? `-${amount}` : amount}
                </TableCell>

                <TableCell className="pl-4 pr-10 py-4">
                  <CategoryBadge category={status} />
                </TableCell>

                <TableCell className="min-w-32 pl-4 pr-10 py-4 text-gray-500 text-13">
                  {formatDateTime(new Date(t.date)).dateTime}
                </TableCell>

                <TableCell className="pl-4 pr-10 py-4 capitalize min-w-24 text-gray-500 text-13">
                  {t.paymentChannel}
                </TableCell>

                <TableCell className="pl-4 pr-10 py-4 max-md:hidden">
                  <CategoryBadge category={t.category} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsTable;