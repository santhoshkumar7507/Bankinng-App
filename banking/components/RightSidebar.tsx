import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BankCard from './BankCard'
import { countTransactionCategories } from '@/lib/utils'
import Category from './Category'

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
  const categories: CategoryCount[] = countTransactionCategories(transactions);

  return (
    <aside className="right-sidebar">
      {/* Profile Section */}
      <section className="flex flex-col pb-8 relative">
        {/* Gradient banner */}
        <div className="profile-banner">
          {/* Animated mesh */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(1,121,254,0.3) 0%, rgba(108,92,231,0.3) 50%, rgba(0,212,255,0.15) 100%)',
            }}
          />
          {/* Decorative circles */}
          <div
            className="absolute -bottom-8 -left-8 size-32 rounded-full border opacity-20 animate-spin-slow"
            style={{ borderColor: 'rgba(1,121,254,0.5)' }}
          />
          <div
            className="absolute -top-6 right-6 size-20 rounded-full border opacity-15 animate-spin-slow"
            style={{ borderColor: 'rgba(108,92,231,0.5)', animationDirection: 'reverse', animationDuration: '6s' }}
          />
          {/* Scanline shimmer */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px)',
            }}
          />
        </div>

        {/* Avatar */}
        <div className="profile">
          <div className="profile-img">
            <span
              className="text-3xl font-black text-white"
              style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}
            >
              {user.firstName[0]}
            </span>
          </div>

          <div className="profile-details">
            <h1 className="profile-name flex items-center gap-2 flex-wrap">
              {user.firstName} {user.lastName}
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-10 font-bold text-emerald-400"
                style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}
              >
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </h1>
            <p className="profile-email">{user.email}</p>

            {/* Stats row */}
            <div className="flex gap-4 mt-3">
              {[
                { label: 'Cards', value: banks?.length || 0, color: '#0179FE' },
                { label: 'Tx', value: transactions?.length || 0, color: '#6C5CE7' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-18 font-black text-white">{value}</span>
                  <span className="text-10 font-medium text-gray-600 uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Banks Section */}
      <section className="banks">
        <div className="flex w-full justify-between items-center mb-5">
          <h2 className="text-16 font-bold text-white flex items-center gap-2">
            <span
              className="size-1.5 rounded-full"
              style={{ background: '#0179FE', boxShadow: '0 0 8px rgba(1,121,254,0.8)' }}
            />
            My Cards
          </h2>
          <Link
            href="/"
            className="flex gap-1.5 items-center rounded-xl px-3 py-1.5 text-12 font-semibold text-gray-500 transition-all duration-300 hover:text-blue-400"
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <Image src="/icons/plus.svg" width={12} height={12} alt="plus" className="opacity-60" />
            Add Card
          </Link>
        </div>

        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            {/* Stacked card effect */}
            {banks[1] && (
              <div
                className="absolute top-4 w-[92%] opacity-60"
                style={{ transform: 'scale(0.95) translateY(8px)', zIndex: 0 }}
              >
                <BankCard
                  key={banks[1].$id}
                  account={banks[1]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
            <div className="relative z-10 w-full">
              <BankCard
                key={banks[0].$id}
                account={banks[0]}
                userName={`${user.firstName} ${user.lastName}`}
                showBalance={false}
              />
            </div>
          </div>
        )}

        {/* Spending Categories */}
        <div className="mt-10 flex flex-1 flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-16 font-bold text-white flex items-center gap-2">
              <span
                className="size-1.5 rounded-full"
                style={{ background: '#6C5CE7', boxShadow: '0 0 8px rgba(108,92,231,0.8)' }}
              />
              Top Categories
            </h2>
            <span className="text-10 text-gray-700 font-semibold uppercase tracking-widest">This month</span>
          </div>

          <div className="space-y-2.5">
            {categories.map((category, i) => (
              <div
                key={category.name}
                style={{ animationDelay: `${i * 80}ms` }}
                className="animate-fade-in-up"
              >
                <Category category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;