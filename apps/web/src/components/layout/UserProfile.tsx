"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown, Settings, LogOut, User } from "lucide-react";

interface UserProfileProps {
  user?: {
    name: string;
    email: string;
    image?: string;
  };
}

export function UserProfile({ user }: UserProfileProps = {}) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Mock user data if no user is provided
  const userData = user || {
    name: "John Doe",
    email: "john@example.com",
    image: undefined,
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1 pr-3 shadow-sm hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {userData.image ? (
          <img
            src={userData.image}
            alt={userData.name}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linkedin-blue text-white">
            <User className="h-4 w-4" />
          </div>
        )}
        <span className="text-sm font-medium">{userData.name}</span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md border border-gray-200 bg-white p-1 shadow-md">
          <div className="border-b border-gray-200 p-2">
            <p className="text-sm font-medium">{userData.name}</p>
            <p className="text-xs text-gray-500">{userData.email}</p>
          </div>
          <div className="p-1">
            <Link
              href="/dashboard/settings/profile"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4" />
              <span>Account Settings</span>
            </Link>
            <Link
              href="/logout"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
