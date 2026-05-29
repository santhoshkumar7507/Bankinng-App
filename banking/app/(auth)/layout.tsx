export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full font-inter relative overflow-hidden"
      style={{ background: '#060810' }}
    >
      {/* Ambient background orbs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #0179FE 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #6C5CE7 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full opacity-10 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #2E90FA 0%, transparent 70%)' }} />
      </div>

      {/* Left: Form */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-12">
        {children}
      </div>

      {/* Right: Decorative Panel */}
      <div className="hidden lg:flex relative z-10 w-[50%] xl:w-[55%] flex-col items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(1,121,254,0.08) 0%, rgba(108,92,231,0.06) 50%, rgba(1,121,254,0.04) 100%)',
          borderLeft: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Floating card mockups */}
        <div className="relative w-full max-w-[420px] px-8">
          {/* Main card */}
          <div className="relative z-10 rounded-3xl p-6 mb-6 animate-float"
            style={{
              background: 'linear-gradient(135deg, rgba(1,121,254,0.2) 0%, rgba(108,92,231,0.15) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.4), 0 0 40px rgba(1,121,254,0.1)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-12 text-gray-500 uppercase tracking-widest mb-1">Total Balance</p>
                <p className="text-36 font-bold text-white">$48,295.80</p>
              </div>
              <div className="size-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #0179FE, #6C5CE7)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>

            {/* Mini chart bars */}
            <div className="flex items-end gap-2 h-16 mb-4">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm transition-all duration-500"
                  style={{
                    height: `${h}%`,
                    background: i === 11
                      ? 'linear-gradient(180deg, #0179FE, #6C5CE7)'
                      : `rgba(255,255,255,${0.08 + i * 0.01})`,
                  }}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <span className="text-12 text-green-400">↑ +12.4%</span>
              <span className="text-12 text-gray-600">vs last month</span>
            </div>
          </div>

          {/* Secondary floating cards */}
          <div className="flex gap-4">
            <div className="flex-1 rounded-2xl p-4 animate-float" style={{ animationDelay: '-1s',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(10px)',
            }}>
              <p className="text-11 text-gray-600 mb-2 uppercase tracking-wider">Spending</p>
              <p className="text-20 font-bold text-white">$3,240</p>
              <p className="text-11 text-red-400 mt-1">↓ -5.2%</p>
            </div>
            <div className="flex-1 rounded-2xl p-4 animate-float" style={{ animationDelay: '-2s',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(10px)',
            }}>
              <p className="text-11 text-gray-600 mb-2 uppercase tracking-wider">Savings</p>
              <p className="text-20 font-bold text-white">$9,850</p>
              <p className="text-11 text-green-400 mt-1">↑ +18.7%</p>
            </div>
          </div>

          {/* Bottom tagline */}
          <div className="text-center mt-8">
            <h2 className="text-20 font-bold text-white mb-2">Banking, Reimagined</h2>
            <p className="text-14 text-gray-600">Manage all your accounts in one intelligent dashboard</p>
          </div>
        </div>

        {/* Decorative rings */}
        <div className="absolute top-10 right-10 size-32 rounded-full border border-blue-500/10 animate-spin-slow" />
        <div className="absolute bottom-10 left-10 size-24 rounded-full border border-purple-500/10 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        <div className="absolute top-1/2 right-0 size-48 rounded-full border border-white/5 animate-spin-slow" style={{ animationDuration: '15s' }} />
      </div>
    </main>
  );
}
