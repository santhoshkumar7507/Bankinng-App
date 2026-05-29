import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';

const SPARKLINE = [40, 55, 35, 70, 60, 80, 65, 90, 75, 95];

const TotalBalanceBox = ({
  accounts = [], totalBanks, totalCurrentBalance
}: TotalBalanceBoxProps) => {
  const maxVal = Math.max(...SPARKLINE);

  return (
    <section className="total-balance group">
      {/* Animated gradient sweep */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(1,121,254,0.04) 50%, transparent 60%)',
          animation: 'shimmer 3s linear infinite',
          backgroundSize: '200% 100%',
        }}
      />

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(108,92,231,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Chart with glow ring */}
      <div className="total-balance-chart relative z-10">
        <div
          className="absolute inset-0 rounded-full opacity-40 blur-lg pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(1,121,254,0.5) 0%, transparent 70%)' }}
        />
        <DoughnutChart accounts={accounts} />
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-5 relative z-10 flex-1">
        {/* Banks count */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <p className="total-balance-label">Connected Banks</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-28 font-black text-white leading-none">{totalBanks}</span>
              {/* Live indicator dots */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: Math.min(totalBanks, 4) }).map((_, i) => (
                  <div
                    key={i}
                    className="relative size-2"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <div className="size-2 rounded-full bg-blue-500" />
                    <div
                      className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-60"
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mini sparkline chart */}
          <div className="flex items-end gap-0.5 h-8 opacity-50">
            {SPARKLINE.map((v, i) => (
              <div
                key={i}
                className="w-1 rounded-t-full bg-gradient-to-t from-blue-600 to-blue-400"
                style={{
                  height: `${(v / maxVal) * 100}%`,
                  opacity: i === SPARKLINE.length - 1 ? 1 : 0.5 + (i / SPARKLINE.length) * 0.5,
                }}
              />
            ))}
          </div>
        </div>

        {/* Total balance */}
        <div className="flex flex-col gap-1">
          <p className="total-balance-label">Total Portfolio Value</p>
          <div className="total-balance-amount flex items-end gap-1">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-10 font-bold text-emerald-400"
              style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}
            >
              <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                <path d="M2 9L6 3L10 9" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Live
            </div>
            <span className="text-11 text-gray-600">Portfolio active</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;