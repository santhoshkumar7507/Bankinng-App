import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';

const TotalBalanceBox = ({
  accounts = [], totalBanks, totalCurrentBalance
}: TotalBalanceBoxProps) => {
  return (
    <section className="total-balance group">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(46,144,250,0.05), transparent)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s linear infinite',
        }}
      />

      <div className="total-balance-chart relative z-10">
        {/* Glow ring behind chart */}
        <div className="absolute inset-0 rounded-full opacity-30 blur-md"
          style={{ background: 'radial-gradient(circle, rgba(1,121,254,0.4) 0%, transparent 70%)' }}
        />
        <DoughnutChart accounts={accounts} />
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-14 font-medium text-gray-400 uppercase tracking-widest">
              Connected Banks
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-30 font-bold text-white">{totalBanks}</span>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalBanks, 3) }).map((_, i) => (
                  <div
                    key={i}
                    className="size-2 rounded-full bg-blue-500 animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="total-balance-label">Total Portfolio Value</p>
          <div className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 9L6 3L10 9" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-12 text-green-400 font-medium">Portfolio active</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;