import { formatAmount } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Copy from './Copy'

const CARD_GRADIENTS = [
  'linear-gradient(135deg, #0f3460 0%, #1a1a4e 50%, #16213e 100%)',
  'linear-gradient(135deg, #1a0533 0%, #3d1a6e 50%, #0d0d2b 100%)',
  'linear-gradient(135deg, #003545 0%, #005f73 50%, #001a22 100%)',
];

const BankCard = ({ account, userName, showBalance = true }: CreditCardProps) => {
  const cardGradient = CARD_GRADIENTS[Math.abs(account.name?.charCodeAt(0) || 0) % CARD_GRADIENTS.length];

  return (
    <div className="flex flex-col">
      <Link href={`/transaction-history/?id=${account.appwriteItemId}`} className="bank-card">
        {/* Card gradient background */}
        <div className="absolute inset-0 rounded-2xl" style={{ background: cardGradient }} />

        {/* Holographic shimmer overlay */}
        <div className="absolute inset-0 rounded-2xl opacity-30"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
          }}
        />

        {/* Top-right glow orb */}
        <div className="absolute -top-8 -right-8 size-24 rounded-full opacity-20 blur-2xl"
          style={{ background: 'radial-gradient(circle, rgba(46,144,250,1) 0%, transparent 70%)' }}
        />

        <div className="bank-card_content relative z-10">
          <div>
            <h1 className="text-16 font-bold text-white tracking-wide">
              {account.name}
            </h1>
            <p className="font-ibm-plex-serif font-black text-white text-18 mt-0.5"
              style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}
            >
              {formatAmount(account.currentBalance)}
            </p>
          </div>

          <article className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h1 className="text-12 font-semibold text-white/80 tracking-wider uppercase">
                {userName}
              </h1>
              <h2 className="text-12 font-semibold text-white/60">
                ●● / ●●
              </h2>
            </div>
            <p className="text-14 font-semibold tracking-[2px] text-white/80">
              ●●●● ●●●● ●●●● <span className="text-16 text-white">{account?.mask}</span>
            </p>
          </article>
        </div>

        <div className="bank-card_icon relative z-10">
          <Image
            src="/icons/Paypass.svg"
            width={22}
            height={26}
            alt="pay"
            className="opacity-90"
          />
          <Image
            src="/icons/mastercard.svg"
            width={48}
            height={34}
            alt="mastercard"
            className="ml-5 drop-shadow-lg"
          />
        </div>

        <Image
          src="/icons/lines.png"
          width={316}
          height={190}
          alt="lines"
          className="absolute top-0 left-0 opacity-20 mix-blend-overlay"
        />
      </Link>

      {showBalance && <Copy title={account?.sharaebleId} />}
    </div>
  );
};

export default BankCard;