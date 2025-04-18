"use client";

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { MoveUpRight, MoveDownLeft, Trending, BarChart4 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data for engagement
const engagementData = [
  { date: "2024-04-01", likes: 222, comments: 150, shares: 87 },
  { date: "2024-04-08", likes: 409, comments: 320, shares: 128 },
  { date: "2024-04-15", likes: 120, comments: 170, shares: 65 },
  { date: "2024-04-22", likes: 224, comments: 170, shares: 98 },
  { date: "2024-04-29", likes: 315, comments: 240, shares: 110 },
  { date: "2024-05-06", likes: 498, comments: 520, shares: 230 },
  { date: "2024-05-13", likes: 197, comments: 160, shares: 75 },
  { date: "2024-05-20", likes: 177, comments: 230, shares: 82 },
  { date: "2024-05-27", likes: 420, comments: 460, shares: 195 },
  { date: "2024-06-03", likes: 103, comments: 160, shares: 54 },
  { date: "2024-06-10", likes: 155, comments: 200, shares: 87 },
  { date: "2024-06-17", likes: 475, comments: 520, shares: 240 },
  { date: "2024-06-24", likes: 132, comments: 180, shares: 76 },
];

// Sample data for follower growth
const followerGrowthData = [
  { date: "2024-04-01", followers: 5220 },
  { date: "2024-04-08", followers: 5350 },
  { date: "2024-04-15", followers: 5480 },
  { date: "2024-04-22", followers: 5570 },
  { date: "2024-04-29", followers: 5720 },
  { date: "2024-05-06", followers: 6050 },
  { date: "2024-05-13", followers: 6180 },
  { date: "2024-05-20", followers: 6320 },
  { date: "2024-05-27", followers: 6590 },
  { date: "2024-06-03", followers: 6740 },
  { date: "2024-06-10", followers: 6920 },
  { date: "2024-06-17", followers: 7250 },
  { date: "2024-06-24", followers: 7380 },
];

// Chart configurations
const engagementChartConfig = {
  likes: {
    label: "Likes",
    color: "#2563eb",
  },
  comments: {
    label: "Comments",
    color: "#60a5fa",
  },
  shares: {
    label: "Shares",
    color: "#94a3b8",
  },
} satisfies ChartConfig;

const followerChartConfig = {
  followers: {
    label: "Followers",
    color: "#2563eb",
  },
} satisfies ChartConfig;

// Data for key performance indicators
const kpiData = {
  totalEngagement: {
    value: "15,243",
    change: "+12.8%",
    trend: "up",
  },
  followers: {
    value: "7,380",
    change: "+41.4%",
    trend: "up",
  },
  impressions: {
    value: "95,621",
    change: "+28.2%",
    trend: "up",
  },
  clickRate: {
    value: "3.2%",
    change: "-0.5%",
    trend: "down",
  },
};

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = React.useState("3m");

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">LinkedIn Analytics</h1>
        <Select defaultValue={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 Days</SelectItem>
            <SelectItem value="1m">1 Month</SelectItem>
            <SelectItem value="3m">3 Months</SelectItem>
            <SelectItem value="6m">6 Months</SelectItem>
            <SelectItem value="1y">1 Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-0 flex-col justify-between">
              {kpiData.totalEngagement.trend === "up" ? (
                <MoveUpRight className="w-4 h-4 mb-4 text-primary" />
              ) : (
                <MoveDownLeft className="w-4 h-4 mb-4 text-destructive" />
              )}
              <h2 className="text-3xl tracking-tighter font-medium flex flex-row gap-2 items-end">
                {kpiData.totalEngagement.value}
                <span
                  className={`text-sm tracking-normal ${kpiData.totalEngagement.trend === "up" ? "text-primary" : "text-destructive"}`}
                >
                  {kpiData.totalEngagement.change}
                </span>
              </h2>
              <p className="text-sm text-muted-foreground">Total Engagement</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex gap-0 flex-col justify-between">
              {kpiData.followers.trend === "up" ? (
                <MoveUpRight className="w-4 h-4 mb-4 text-primary" />
              ) : (
                <MoveDownLeft className="w-4 h-4 mb-4 text-destructive" />
              )}
              <h2 className="text-3xl tracking-tighter font-medium flex flex-row gap-2 items-end">
                {kpiData.followers.value}
                <span
                  className={`text-sm tracking-normal ${kpiData.followers.trend === "up" ? "text-primary" : "text-destructive"}`}
                >
                  {kpiData.followers.change}
                </span>
              </h2>
              <p className="text-sm text-muted-foreground">Total Followers</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex gap-0 flex-col justify-between">
              {kpiData.impressions.trend === "up" ? (
                <MoveUpRight className="w-4 h-4 mb-4 text-primary" />
              ) : (
                <MoveDownLeft className="w-4 h-4 mb-4 text-destructive" />
              )}
              <h2 className="text-3xl tracking-tighter font-medium flex flex-row gap-2 items-end">
                {kpiData.impressions.value}
                <span
                  className={`text-sm tracking-normal ${kpiData.impressions.trend === "up" ? "text-primary" : "text-destructive"}`}
                >
                  {kpiData.impressions.change}
                </span>
              </h2>
              <p className="text-sm text-muted-foreground">Impressions</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex gap-0 flex-col justify-between">
              {kpiData.clickRate.trend === "up" ? (
                <MoveUpRight className="w-4 h-4 mb-4 text-primary" />
              ) : (
                <MoveDownLeft className="w-4 h-4 mb-4 text-destructive" />
              )}
              <h2 className="text-3xl tracking-tighter font-medium flex flex-row gap-2 items-end">
                {kpiData.clickRate.value}
                <span
                  className={`text-sm tracking-normal ${kpiData.clickRate.trend === "up" ? "text-primary" : "text-destructive"}`}
                >
                  {kpiData.clickRate.change}
                </span>
              </h2>
              <p className="text-sm text-muted-foreground">Click Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="engagement" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="engagement" className="flex items-center gap-1">
            <BarChart4 className="w-4 h-4" />
            Engagement
          </TabsTrigger>
          <TabsTrigger value="growth" className="flex items-center gap-1">
            <Trending className="w-4 h-4" />
            Follower Growth
          </TabsTrigger>
        </TabsList>

        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Post Engagement</CardTitle>
              <CardDescription>
                Likes, comments, and shares per post over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={engagementChartConfig}
                className="aspect-auto h-[350px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  data={engagementData}
                  margin={{
                    left: 40,
                    right: 20,
                    top: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        className="w-[160px]"
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          });
                        }}
                      />
                    }
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="likes" fill="var(--color-likes)" radius={4} />
                  <Bar
                    dataKey="comments"
                    fill="var(--color-comments)"
                    radius={4}
                  />
                  <Bar dataKey="shares" fill="var(--color-shares)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth">
          <Card>
            <CardHeader>
              <CardTitle>Follower Growth</CardTitle>
              <CardDescription>
                LinkedIn follower count over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={followerChartConfig}
                className="aspect-auto h-[350px] w-full"
              >
                <LineChart
                  accessibilityLayer
                  data={followerGrowthData}
                  margin={{
                    left: 40,
                    right: 20,
                    top: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        className="w-[160px]"
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          });
                        }}
                      />
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="followers"
                    stroke="var(--color-followers)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Best Performing Posts */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Best Performing Posts</h2>
        <div className="grid gap-4">
          {[
            {
              title: "10 LinkedIn Growth Strategies That Actually Work in 2024",
              date: "May 15, 2024",
              likes: 428,
              comments: 62,
              shares: 103,
            },
            {
              title: "Why Content Consistency is Key to LinkedIn Success",
              date: "June 2, 2024",
              likes: 356,
              comments: 48,
              shares: 84,
            },
            {
              title:
                "How I Grew My LinkedIn Audience From 0 to 10K in 6 Months",
              date: "April 10, 2024",
              likes: 315,
              comments: 72,
              shares: 68,
            },
          ].map((post, index) => (
            <Card key={index}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-base">{post.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      {post.date}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <span>👍</span>
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>💬</span>
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>🔄</span>
                      <span>{post.shares}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
