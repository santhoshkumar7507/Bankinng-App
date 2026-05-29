'use client';

import CountUp from 'react-countup';

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className="w-full">
      <CountUp
        decimals={2}
        decimal=","
        prefix="$"
        end={amount}
        duration={2}
        easingFn={(t, b, c, d) => {
          // Cubic ease out
          t /= d;
          t--;
          return c * (t * t * t + 1) + b;
        }}
        className="text-24 lg:text-30 font-black text-white tabular-nums"
        style={{ textShadow: '0 0 30px rgba(1,121,254,0.3)' }}
      />
    </div>
  );
};

export default AnimatedCounter;