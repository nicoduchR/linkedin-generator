import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
    MoveUpRight,
    MoveDownLeft,
    LineChart, FileText,
    Clock
} from "lucide-react";

// Stat Card Component
function StatCard({ 
  title, 
  value, 
  change, 
  changeType = "increase", 
  icon: Icon,
  className = ""
}: {
  title: string;
  value: string;
  change: string;
  changeType?: "increase" | "decrease";
  icon: React.ElementType;
  className?: string;
}) {
  return (
    <div className={`flex flex-col justify-between p-6 border border-gray-200 rounded-lg bg-white ${className}`}>
      <Icon className={`w-5 h-5 mb-6 ${changeType === "increase" ? "text-green-500" : "text-red-500"}`} />
      <h2 className="text-2xl md:text-3xl font-semibold flex flex-row gap-2 items-end">
        {value}
        <span className={`text-sm font-normal ${changeType === "increase" ? "text-green-500" : "text-red-500"}`}>
          {changeType === "increase" ? "+" : "-"}{change}
        </span>
      </h2>
      <p className="text-sm text-gray-500 mt-1">{title}</p>
    </div>
  );
}

// Recent Post Component
function RecentPost({
  title,
  date,
  engagementScore,
  status
}: {
  title: string;
  date: string;
  engagementScore: number;
  status: "published" | "scheduled" | "draft";
}) {
  const statusColors = {
    published: "bg-green-100 text-green-800",
    scheduled: "bg-blue-100 text-blue-800",
    draft: "bg-gray-100 text-gray-800"
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100">
      <div className="flex items-start gap-3">
        <FileText className="w-5 h-5 text-gray-400 mt-1" />
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">
            {date} • Engagement: {engagementScore}/10
          </p>
        </div>
      </div>
      <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    </div>
  );
}

// Sample data
const recentPosts = [
  {
    title: "10 Tips for LinkedIn Success in 2023",
    date: "May 15, 2023",
    engagementScore: 8.7,
    status: "published" as const
  },
  {
    title: "How to Build Your Personal Brand",
    date: "May 10, 2023",
    engagementScore: 9.2,
    status: "published" as const
  },
  {
    title: "Upcoming LinkedIn Algorithm Changes",
    date: "May 21, 2023",
    engagementScore: 0,
    status: "scheduled" as const
  },
  {
    title: "The Future of Work",
    date: "Draft",
    engagementScore: 0,
    status: "draft" as const
  }
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's an overview of your LinkedIn content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Posts"
          value="42"
          change="12%"
          changeType="increase"
          icon={MoveUpRight}
        />
        <StatCard 
          title="Engagement Rate"
          value="4.8%"
          change="0.5%"
          changeType="increase"
          icon={MoveUpRight}
        />
        <StatCard 
          title="Avg. Comments"
          value="12"
          change="3%"
          changeType="decrease"
          icon={MoveDownLeft}
        />
        <StatCard 
          title="Impressions"
          value="14.2K"
          change="18%"
          changeType="increase"
          icon={MoveUpRight}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-lg">Recent Posts</h2>
            <button className="text-linkedin-blue text-sm font-medium">View All</button>
          </div>
          <div>
            {recentPosts.map((post, index) => (
              <RecentPost key={index} {...post} />
            ))}
          </div>
          <div className="px-6 py-4">
            <button className="w-full py-2 bg-linkedin-blue text-white rounded-md font-medium hover:bg-linkedin-darkBlue transition-colors">
              Create New Post
            </button>
          </div>
        </div>

        {/* Activity Overview */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-lg">Activity Overview</h2>
          </div>
          <div className="p-6">
            <div className="h-48 flex items-center justify-center border border-dashed border-gray-300 rounded-lg mb-6">
              <LineChart className="w-12 h-12 text-gray-300" />
            </div>
            
            <h3 className="font-medium mb-2">Upcoming Posts</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>Tomorrow at 9:00 AM</span>
                <span className="flex-1 text-right truncate text-gray-500">
                  Industry Trends for Q2
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>May 21 at 2:30 PM</span>
                <span className="flex-1 text-right truncate text-gray-500">
                  Upcoming Algorithm Changes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 