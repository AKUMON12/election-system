"use client"; // Required for sessionStorage and useRouter

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // 1. Check Auth (React code logic)
    const isAuth = sessionStorage.getItem("admin_auth") === "true";

    if (!isAuth) {
      // 2. Redirect if not logged in (replaces <Navigate />)
      router.replace("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // Don't show the sidebar/content until auth is verified to prevent flickering
  if (!authorized) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar from your React project */}
      <AdminSidebar />

      {/* Main content area where pages will appear */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {children} {/* This replaces <Outlet /> */}
      </main>
    </div>
  );
}
