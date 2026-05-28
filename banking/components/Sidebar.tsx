'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from './Footer'
import PlaidLink from './PlaidLink'

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-2">
        {/* Logo */}
        <Link href="/" className="mb-10 cursor-pointer flex items-center gap-3 group">
          <div className="relative size-10 flex-shrink-0">
            <div className="absolute inset-0 rounded-xl bg-bank-gradient opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300" />
            <div className="relative size-10 rounded-xl bg-bank-gradient flex items-center justify-center shadow-glow-blue">
              <Image
                src="/icons/logo.svg"
                width={22}
                height={22}
                alt="Horizon logo"
                className="brightness-[10]"
              />
            </div>
          </div>
          <h1 className="sidebar-logo bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Horizon
          </h1>
        </Link>

        {/* Nav Links */}
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn('sidebar-link', {
                'bg-bank-gradient shadow-glow-blue border border-blue-500/30': isActive,
                'border border-transparent': !isActive,
              })}
            >
              {/* Active indicator bar */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              )}

              <div className="relative size-5 flex-shrink-0">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn('transition-all duration-300', {
                    'brightness-[10] invert-0': isActive,
                    'opacity-60 group-hover:opacity-100': !isActive,
                  })}
                />
              </div>

              <p className={cn('sidebar-label transition-colors duration-300', {
                '!text-white font-bold': isActive,
                'text-gray-400': !isActive,
              })}>
                {item.label}
              </p>
            </Link>
          );
        })}

        <div className="mt-2">
          <PlaidLink user={user} />
        </div>
      </nav>

      <Footer user={user} />
    </section>
  );
};

export default Sidebar;