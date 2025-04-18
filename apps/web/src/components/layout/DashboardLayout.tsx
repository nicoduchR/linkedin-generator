"use client";

import React from "react";
import Link from "next/link";
import { UserProfile } from "@/components/layout/UserProfile";
import {
  LayoutDashboard,
  FileText,
  Settings,
  BrainCircuit,
  Columns,
  Calendar,
  LogOut,
} from "lucide-react";

type SidebarNavProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type SidebarLink = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const links: SidebarLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Posts",
    href: "/dashboard/posts",
    icon: FileText,
  },
  {
    label: "Generate",
    href: "/dashboard/generate",
    icon: BrainCircuit,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: Columns,
  },
  {
    label: "Schedule",
    href: "/dashboard/schedule",
    icon: Calendar,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function SidebarNav({ open, setOpen }: SidebarNavProps) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-2 py-3 mb-6"
        >
          {open ? (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-linkedin-blue rounded-md flex items-center justify-center text-white font-bold">
                Li
              </div>
              <span className="font-semibold text-xl">LinkedIn Generator</span>
            </div>
          ) : (
            <div className="h-10 w-10 bg-linkedin-blue rounded-md flex items-center justify-center text-white font-bold text-lg">
              Li
            </div>
          )}
        </Link>

        <nav className="space-y-1 px-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-linkedin-blue"
            >
              <link.icon className="h-5 w-5" />
              {open && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="px-2 py-4">
        <Link
          href="/logout"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" />
          {open && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
}

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
      <div className="flex items-center gap-2">
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
          <span className="sr-only">Toggle navigation</span>
        </button>
        <h1 className="text-xl font-semibold">LinkedIn Content Generator</h1>
      </div>
      <UserProfile />
    </header>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } flex-shrink-0 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out`}
      >
        <SidebarNav open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
