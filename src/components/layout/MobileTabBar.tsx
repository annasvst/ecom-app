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

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 md:hidden z-50">
      <Link href="/" className="flex flex-col items-center">
        <HomeIcon
          className={`h-6 w-6 ${
            pathname === "/" ? "text-blue-600" : "text-gray-500"
          }`}
        />
        <span className="text-xs">Home</span>
      </Link>
      <Link href="/cart" className="flex flex-col items-center">
        <ShoppingCartIcon
          className={`h-6 w-6 ${
            pathname === "/cart" ? "text-blue-600" : "text-gray-500"
          }`}
        />
        <span className="text-xs">Cart</span>
      </Link>
      <Link href="/admin" className="flex flex-col items-center">
        <ShieldCheckIcon
          className={`h-6 w-6 ${
            pathname === "/admin" ? "text-blue-600" : "text-gray-500"
          }`}
        />
        <span className="text-xs">Admin</span>
      </Link>
      <Link href="/login" className="flex flex-col items-center">
        <UserIcon
          className={`h-6 w-6 ${
            pathname === "/login" ? "text-blue-600" : "text-gray-500"
          }`}
        />
        <span className="text-xs">Login</span>
      </Link>
    </nav>
  );
}
