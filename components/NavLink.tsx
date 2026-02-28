'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}

export default function NavLink({ 
  href, 
  children, 
  className = "", 
  activeClassName = "text-blue-500 font-bold" 
}: NavLinkProps) {
  const pathname = usePathname();
  // Check if current path matches the link href
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`${className} ${isActive ? activeClassName : ""}`}
    >
      {children}
    </Link>
  );
}