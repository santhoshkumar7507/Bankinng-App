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
      {/* Top border glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(1,121,254,0.3), transparent)' }}
      />

      <nav className="flex flex-col gap-1.5">
        {/* Logo */}
        <Link href="/" className="mb-10 cursor-pointer flex items-center gap-3 group">
          <div className="relative size-10 flex-shrink-0">
            <div
              className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"
              style={{ background: 'linear-gradient(135deg, #0179FE, #6C5CE7)' }}
            />
            <div
              className="relative size-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #0179FE 0%, #6C5CE7 100%)',
                boxShadow: '0 0 20px rgba(1,121,254,0.4)',
              }}
            >
              <Image
                src="/icons/logo.svg"
                width={22}
                height={22}
                alt="Horizon logo"
                className="brightness-[10]"
              />
            </div>
          </div>
          <h1
            className="sidebar-logo"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Horizon
          </h1>
        </Link>

        {/* Nav Links */}
        {sidebarLinks.map((item, idx) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              style={{ animationDelay: `${idx * 80}ms` }}
              className={cn(
                'sidebar-link animate-fade-in-left',
                isActive
                  ? 'border-[rgba(1,121,254,0.25)] bg-[rgba(1,121,254,0.1)]'
                  : 'border-transparent'
              )}
            >
              {/* Active left bar */}
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full"
                  style={{
                    background: 'linear-gradient(180deg, #0179FE, #6C5CE7)',
                    boxShadow: '0 0 8px rgba(1,121,254,0.8)',
                  }}
                />
              )}

              {/* Active ping */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full bg-blue-400 animate-active-ping opacity-0" />
              )}

              <div className="relative size-5 flex-shrink-0">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn(
                    'transition-all duration-300 object-contain',
                    isActive
                      ? 'brightness-[10] saturate-0'
                      : 'opacity-50 group-hover:opacity-80 brightness-[4]'
                  )}
                />
              </div>

              <p className={cn(
                'sidebar-label transition-all duration-300',
                isActive ? '!text-white font-bold' : 'text-gray-500 group-hover:text-gray-300'
              )}>
                {item.label}
              </p>

              {/* Active right indicator */}
              {isActive && (
                <div className="ml-auto size-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(1,121,254,1)]" />
              )}
            </Link>
          );
        })}

        <div className="mt-3">
          <PlaidLink user={user} />
        </div>
      </nav>

      <Footer user={user} />
    </section>
  );
};

export default Sidebar;