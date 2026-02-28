'use client';

import { useRouter } from "next/navigation";

interface NavliniProps {
  label: string;
  path: string;
}

export default function Navlini({ label, path }: NavliniProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(path)}
      className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-all"
    >
      {label}
    </button>
  );
}