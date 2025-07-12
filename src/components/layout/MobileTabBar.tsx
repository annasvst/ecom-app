"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function MobileTabBar() {
  const pathname = usePathname();
  const tabs = [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/cart", icon: ShoppingCartIcon, label: "Cart" },
    { href: "/admin", icon: ShieldCheckIcon, label: "Admin" },
    { href: "/login", icon: UserIcon, label: "Login" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 md:hidden z-50">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className="flex flex-col items-center"
        >
          <tab.icon
            className={`h-6 w-6 ${
              pathname === "/" ? "text-blue-600" : "text-sky-950"
            }`}
          />
          <span className="text-xs text-sky-950">{tab.label}</span>
        </Link>
      ))}
    </nav>
  );
}
