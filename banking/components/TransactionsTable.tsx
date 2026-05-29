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

const CHANNEL_ICONS: Record<string, string> = {
  online: "🌐",
  "in store": "🏪",
  "in-store": "🏪",
  other: "💳",
};

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
      <p className={cn('text-[11px] font-semibold tracking-wide', textColor)}>{category}</p>
    </div>
  )
}

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <Table>
        <TableHeader>
          <TableRow
            className="border-b border-white/[0.05] hover:bg-transparent"
            style={{ background: 'linear-gradient(90deg, rgba(1,121,254,0.04) 0%, rgba(108,92,231,0.04) 100%)' }}
          >
            {[
              { label: "Transaction", icon: "⟆" },
              { label: "Amount", icon: "$" },
              { label: "Status", icon: "◉" },
              { label: "Date", icon: "📅", hide: false },
              { label: "Channel", icon: "⊡", hideOnMobile: true },
              { label: "Category", icon: "⊕", hideOnMobile: true },
            ].map(({ label, icon, hideOnMobile }) => (
              <TableHead
                key={label}
                className={cn(
                  "px-4 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-600",
                  hideOnMobile && "max-md:hidden"
                )}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-gray-700">{icon}</span>
                  {label}
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((t: Transaction, idx: number) => {
            const status = getTransactionStatus(new Date(t.date));
            const amount = formatAmount(t.amount);
            const isDebit = t.type === 'debit';
            const isNegative = isDebit || amount[0] === '-';
            const channelIcon = CHANNEL_ICONS[t.paymentChannel?.toLowerCase()] || '💳';

            return (
              <TableRow
                key={t.id}
                className={cn(
                  "border-b border-white/[0.04] cursor-default group",
                  "transition-all duration-200",
                )}
                style={{
                  animationDelay: `${idx * 50}ms`,
                  animation: 'fade-in-up 0.5s ease-out forwards',
                  opacity: 0,
                }}
              >
                {/* Transaction name */}
                <TableCell className="max-w-[250px] pl-4 pr-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* Status dot with glow */}
                    <div className="relative flex-shrink-0">
                      <div className={cn(
                        "size-2 rounded-full",
                        isNegative
                          ? "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]"
                          : "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                      )} />
                      <div className={cn(
                        "absolute inset-0 rounded-full animate-ping opacity-40",
                        isNegative ? "bg-red-400" : "bg-emerald-400"
                      )} />
                    </div>
                    <h1 className="text-14 truncate font-semibold text-white/90 group-hover:text-white transition-colors">
                      {removeSpecialCharacters(t.name)}
                    </h1>
                  </div>
                </TableCell>

                {/* Amount */}
                <TableCell className="pl-4 pr-6 py-4">
                  <span
                    className={cn(
                      "font-bold text-15 tabular-nums tracking-tight inline-flex items-center gap-1 px-2.5 py-1 rounded-lg",
                      isNegative
                        ? "text-red-400 bg-red-500/8"
                        : "text-emerald-400 bg-emerald-500/8"
                    )}
                    style={{
                      border: isNegative
                        ? '1px solid rgba(248,113,113,0.15)'
                        : '1px solid rgba(52,211,153,0.15)',
                    }}
                  >
                    <span className="text-13">{isNegative ? '−' : '+'}</span>
                    {isNegative ? amount.replace('-', '') : amount}
                  </span>
                </TableCell>

                {/* Status */}
                <TableCell className="pl-4 pr-6 py-4">
                  <CategoryBadge category={status} />
                </TableCell>

                {/* Date */}
                <TableCell className="min-w-32 pl-4 pr-6 py-4">
                  <span className="text-12 text-gray-500 font-medium tabular-nums">
                    {formatDateTime(new Date(t.date)).dateTime}
                  </span>
                </TableCell>

                {/* Channel */}
                <TableCell className="pl-4 pr-6 py-4 capitalize max-md:hidden">
                  <span className="text-12 text-gray-500 flex items-center gap-1.5">
                    <span>{channelIcon}</span>
                    {t.paymentChannel}
                  </span>
                </TableCell>

                {/* Category */}
                <TableCell className="pl-4 pr-6 py-4 max-md:hidden">
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