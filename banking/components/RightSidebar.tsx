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
        {/* Gradient banner with mesh */}
        <div className="profile-banner relative overflow-hidden">
          <div className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(1,121,254,0.3) 0%, rgba(108,92,231,0.3) 50%, rgba(1,121,254,0.1) 100%)',
            }}
          />
          {/* Animated rings */}
          <div className="absolute -bottom-6 -left-6 size-24 rounded-full border border-blue-500/20 animate-spin-slow" />
          <div className="absolute -top-4 right-4 size-16 rounded-full border border-purple-500/20 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        </div>

        <div className="profile">
          <div className="profile-img">
            <span className="text-4xl font-black text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
              {user.firstName[0]}
            </span>
          </div>

          <div className="profile-details">
            <h1 className="profile-name flex items-center gap-2">
              {user.firstName} {user.lastName}
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 border border-green-500/20 px-2 py-0.5">
                <span className="size-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-10 text-green-400 font-medium">Active</span>
              </span>
            </h1>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>
      </section>

      {/* Banks Section */}
      <section className="banks">
        <div className="flex w-full justify-between items-center mb-4">
          <h2 className="text-16 font-semibold text-white">My Cards</h2>
          <Link href="/" className="flex gap-1.5 items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-12 font-medium text-gray-400 hover:border-blue-500/30 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300">
            <Image
              src="/icons/plus.svg"
              width={14}
              height={14}
              alt="plus"
              className="opacity-70"
            />
            Add Card
          </Link>
        </div>

        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10">
              <BankCard
                key={banks[0].$id}
                account={banks[0]}
                userName={`${user.firstName} ${user.lastName}`}
                showBalance={false}
              />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%] opacity-80">
                <BankCard
                  key={banks[1].$id}
                  account={banks[1]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}

        {/* Spending Categories */}
        <div className="mt-10 flex flex-1 flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-16 font-semibold text-white">Top Categories</h2>
            <span className="text-11 text-gray-600 font-medium uppercase tracking-wider">This month</span>
          </div>

          <div className="space-y-3">
            {categories.map((category) => (
              <Category key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;