'use client'

import { formatAmount } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import Copy from './Copy'

const CARD_THEMES = [
  {
    gradient: 'linear-gradient(135deg, #0a0f2e 0%, #0d1b4b 40%, #0f3460 100%)',
    accent: 'rgba(1, 121, 254, 0.6)',
    chip: 'rgba(255,220,100,0.9)',
    glow: 'rgba(1,121,254,0.4)',
    pattern: 'radial-gradient(ellipse at 80% 20%, rgba(1,121,254,0.25) 0%, transparent 60%)',
  },
  {
    gradient: 'linear-gradient(135deg, #1a0533 0%, #3d1a6e 60%, #0d0d2b 100%)',
    accent: 'rgba(108, 92, 231, 0.6)',
    chip: 'rgba(255,220,100,0.9)',
    glow: 'rgba(108,92,231,0.4)',
    pattern: 'radial-gradient(ellipse at 80% 20%, rgba(108,92,231,0.25) 0%, transparent 60%)',
  },
  {
    gradient: 'linear-gradient(135deg, #003545 0%, #005f73 60%, #001a22 100%)',
    accent: 'rgba(0, 212, 255, 0.5)',
    chip: 'rgba(255,220,100,0.9)',
    glow: 'rgba(0,212,255,0.4)',
    pattern: 'radial-gradient(ellipse at 80% 20%, rgba(0,212,255,0.2) 0%, transparent 60%)',
  },
];

const BankCard = ({ account, userName, showBalance = true }: CreditCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const themeIndex = Math.abs((account.name?.charCodeAt(0) || 0)) % CARD_THEMES.length;
  const theme = CARD_THEMES[themeIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="flex flex-col gap-3" style={{ perspective: '1000px' }}>
      <Link
        ref={cardRef}
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        className="bank-card"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) ${isHovered ? 'translateY(-8px) scale(1.02)' : ''}`,
          transition: isHovered ? 'transform 0.1s ease-out, box-shadow 0.3s ease' : 'transform 0.6s ease, box-shadow 0.3s ease',
          background: theme.gradient,
          boxShadow: isHovered
            ? `0 30px 80px rgba(0,0,0,0.7), 0 0 60px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,0.15)`
            : `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Pattern overlay */}
        <div className="absolute inset-0 rounded-2xl" style={{ background: theme.pattern }} />

        {/* Holographic shimmer */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 70%, transparent 100%)',
          }}
        />

        {/* Shine sweep on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)`,
              backgroundSize: '200% 100%',
              animation: 'card-shine 0.6s ease-in-out',
            }}
          />
        )}

        {/* Circuit lines pattern */}
        <Image
          src="/icons/lines.png"
          width={316}
          height={190}
          alt="lines"
          className="absolute top-0 left-0 opacity-[0.08] mix-blend-overlay"
        />

        {/* Top accent glow */}
        <div
          className="absolute -top-10 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none"
          style={{ background: theme.accent }}
        />

        {/* Card content left */}
        <div className="bank-card_content">
          {/* Bank name & balance */}
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="size-1.5 rounded-full bg-white/60 animate-pulse" />
              <h1 className="text-11 font-bold text-white/70 uppercase tracking-[2px]">
                {account.name}
              </h1>
            </div>
            <p
              className="font-ibm-plex-serif font-black text-white text-20 mt-1"
              style={{ textShadow: '0 2px 12px rgba(255,255,255,0.2)' }}
            >
              {formatAmount(account.currentBalance)}
            </p>
          </div>

          {/* EMV Chip */}
          <div className="flex flex-col gap-2">
            <div
              className="w-10 h-7 rounded-md flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #d4a800 0%, #f5cc00 40%, #c49500 60%, #e8b900 100%)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}
            >
              {/* Chip lines */}
              <div className="flex flex-col gap-0.5 w-full px-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-px bg-yellow-900/40 w-full rounded-full" />
                ))}
              </div>
            </div>

            {/* Card number & expiry */}
            <article className="flex flex-col gap-1">
              <div className="flex justify-between items-center gap-4">
                <h1 className="text-12 font-bold text-white/80 tracking-[1px]">{userName}</h1>
                <h2 className="text-10 font-medium text-white/50">●● / ●●</h2>
              </div>
              <p className="text-13 font-semibold tracking-[2px] text-white/70">
                ●●●● ●●●● ●●●● <span className="text-14 text-white font-bold">{account?.mask}</span>
              </p>
            </article>
          </div>
        </div>

        {/* Card right icons */}
        <div className="bank-card_icon">
          {/* NFC icon */}
          <div className="opacity-80">
            <Image src="/icons/Paypass.svg" width={22} height={26} alt="contactless" />
          </div>

          {/* Network logo */}
          <div className="flex flex-col items-end gap-1">
            <div
              className="text-[9px] font-bold uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              credit
            </div>
            <Image
              src="/icons/mastercard.svg"
              width={46}
              height={32}
              alt="mastercard"
              className="drop-shadow-lg"
            />
          </div>
        </div>
      </Link>

      {showBalance && <Copy title={account?.sharaebleId} />}
    </div>
  );
};

export default BankCard;