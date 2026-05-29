import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if(!loggedIn) redirect('/sign-in')

  return (
    <main className="flex h-screen w-full font-inter relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />

      {/* Grid overlay */}
      <div className="grid-overlay" />

      <Sidebar user={loggedIn} />

      <div className="flex size-full flex-col relative z-10">
        <div className="root-layout">
          <div className="flex items-center gap-2">
            <div
              className="size-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0179FE, #6C5CE7)' }}
            >
              <Image src="/icons/logo.svg" width={16} height={16} alt="logo" className="brightness-[10]" />
            </div>
            <span className="text-16 font-bold text-white">Horizon</span>
          </div>
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
