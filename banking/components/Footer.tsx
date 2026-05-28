import { logoutAccount } from '@/lib/actions/user.actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();
    if (loggedOut) router.push('/sign-in');
  };

  return (
    <footer className="footer group relative">
      {/* Hover background glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(1,121,254,0.08) 0%, transparent 70%)' }}
      />

      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}
        style={{
          background: 'linear-gradient(135deg, #0179FE, #6C5CE7)',
          color: 'white',
          borderRadius: '50%',
          border: 'none',
        }}
      >
        <p className="text-sm font-bold text-white">
          {user?.firstName?.[0]?.toUpperCase()}
        </p>
      </div>

      <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
        <h1 className="text-14 truncate text-white font-semibold">
          {user?.firstName}
        </h1>
        <p className="text-12 truncate font-normal text-gray-500">
          {user?.email}
        </p>
      </div>

      <button
        onClick={handleLogOut}
        className="footer_image group/btn p-2 rounded-lg hover:bg-red-500/10 transition-all duration-300 hover:shadow-[0_0_12px_rgba(239,68,68,0.3)]"
        title="Sign out"
      >
        <Image
          src="/icons/logout.svg"
          width={20}
          height={20}
          alt="logout"
          className="opacity-60 group-hover/btn:opacity-100 transition-opacity duration-300"
        />
      </button>
    </footer>
  );
};

export default Footer;