"use client";

import NavbarLinks from "./NavbarLinks";
import LogoLink from "@/components/common/LogoLink";

export default function Header() {
  return (
    <header className="bg-sky-950 border-b-2 border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-7 py-4 flex justify-between">
        <LogoLink />
        <nav className="hidden md:flex items-center gap-8 text-stone-50">
          <NavbarLinks onLinkClick={() => {}} />
        </nav>
      </div>
    </header>
  );
}
