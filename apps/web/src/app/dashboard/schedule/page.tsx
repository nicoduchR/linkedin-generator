"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "ui";
import {
  Calendar,
  Clock,
  Edit,
  MoreHorizontal,
  Plus,
  Send,
  Trash2,
  Filter,
  ArrowUpDown,
  Loader2,
} from "lucide-react";

import {
  ScheduledPost,
  getScheduledPosts,
  deleteScheduledPost,
  publishNow,
} from "@/lib/api/schedule";

function ScheduledPostCard({
  post,
  onEdit,
  onDelete,
  onPublishNow,
}: {
  post: ScheduledPost;
  onEdit: (post: ScheduledPost) => void;
  onDelete: (id: string) => void;
  onPublishNow: (id: string) => void;
}) {
  const statusColors = {
    scheduled: "bg-blue-100 text-blue-800",
    draft: "bg-gray-100 text-gray-800",
    published: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{post.title}</CardTitle>
            <div className="flex gap-2 mt-1 items-center flex-wrap">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${statusColors[post.status]}`}
              >
                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
              </span>
              <span className="text-xs text-gray-500 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(post.scheduledDate)}
              </span>
              <span className="text-xs text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {post.scheduledTime}
              </span>
            </div>
          </div>
          <div className="relative">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">{post.content}</p>
        <div className="flex justify-end gap-2 mt-4">
          {post.status === "scheduled" && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3"
              onClick={() => onPublishNow(post.id)}
            >
              <Send className="h-3 w-3 mr-1" />
              <span className="text-xs">Post Now</span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3"
            onClick={() => onEdit(post)}
          >
            <Edit className="h-3 w-3 mr-1" />
            <span className="text-xs">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(post.id)}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            <span className="text-xs">Delete</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CalendarView({ posts }: { posts: ScheduledPost[] }) {
  // Group posts by date
  const groupedPosts: Record<string, ScheduledPost[]> = {};

  posts.forEach((post) => {
    if (!groupedPosts[post.scheduledDate]) {
      groupedPosts[post.scheduledDate] = [];
    }
    groupedPosts[post.scheduledDate].push(post);
  });

  // Get dates for upcoming week starting from today
  const getUpcomingWeekDates = () => {
    const today = new Date();

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getUpcomingWeekDates();

  const getDayName = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDates.map((date, index) => (
          <div
            key={index}
            className="text-center border-r border-gray-200 last:border-r-0 py-2"
          >
            <div className="text-xs font-medium text-gray-500">
              {getDayName(date)}
            </div>
            <div
              className={`text-xl font-semibold mt-1 ${index === 0 ? "text-blue-600" : ""}`}
            >
              {date.getDate()}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 h-[600px]">
        {weekDates.map((date, index) => {
          const dateStr = date.toISOString().split("T")[0];
          const postsForDate = groupedPosts[dateStr] || [];

          return (
            <div
              key={index}
              className={`border-r border-gray-200 last:border-r-0 p-2 h-full ${index === 0 ? "bg-blue-50/30" : ""}`}
            >
              {postsForDate.map((post, postIndex) => (
                <div
                  key={postIndex}
                  className={`text-xs p-2 mb-2 rounded-md border-l-2 cursor-pointer hover:shadow-sm transition-shadow ${
                    post.status === "published"
                      ? "bg-green-50 border-green-400"
                      : post.status === "draft"
                        ? "bg-gray-50 border-gray-400"
                        : "bg-blue-50 border-blue-400"
                  }`}
                  title={post.title}
                >
                  <div className="font-medium flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-gray-500" />
                    {post.scheduledTime}
                  </div>
                  <div className="mt-1 line-clamp-2 font-medium">
                    {post.title}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SchedulePage() {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const posts = await getScheduledPosts();
        setScheduledPosts(posts);
        setError(null);
      } catch (err) {
        setError("Failed to load scheduled posts. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Handle edit post
  const handleEditPost = (post: ScheduledPost) => {
    // In a real app, this would navigate to an edit page or open a modal
    console.log("Edit post", post);
  };

  // Handle delete post
  const handleDeletePost = async (id: string) => {
    if (confirm("Are you sure you want to delete this scheduled post?")) {
      try {
        await deleteScheduledPost(id);
        setScheduledPosts(scheduledPosts.filter((post) => post.id !== id));
      } catch (err) {
        console.error("Error deleting post:", err);
        alert("Failed to delete post. Please try again.");
      }
    }
  };

  // Handle publish now
  const handlePublishNow = async (id: string) => {
    try {
      const updatedPost = await publishNow(id);

      // Update post in state
      setScheduledPosts(
        scheduledPosts.map((post) => (post.id === id ? updatedPost : post))
      );
    } catch (err) {
      console.error("Error publishing post:", err);
      alert("Failed to publish post. Please try again.");
    }
  };

  // Filter posts by status
  const getFilteredPosts = (status: ScheduledPost["status"] | "all") => {
    if (status === "all") return scheduledPosts;
    return scheduledPosts.filter((post) => post.status === status);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Content Schedule</h1>
          <p className="text-gray-500">Manage your upcoming LinkedIn posts</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className={`text-sm ${viewMode === "list" ? "bg-gray-100" : ""}`}
            onClick={() => setViewMode("list")}
          >
            List View
          </Button>
          <Button
            variant="outline"
            className={`text-sm ${viewMode === "calendar" ? "bg-gray-100" : ""}`}
            onClick={() => setViewMode("calendar")}
          >
            Calendar View
          </Button>
          <Button className="flex gap-2 items-center">
            <Plus className="h-4 w-4" />
            <span>Schedule Post</span>
          </Button>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="flex justify-between mb-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">
                All Posts ({scheduledPosts.length})
              </TabsTrigger>
              <TabsTrigger value="scheduled">
                Scheduled ({getFilteredPosts("scheduled").length})
              </TabsTrigger>
              <TabsTrigger value="draft">
                Draft ({getFilteredPosts("draft").length})
              </TabsTrigger>
              <TabsTrigger value="published">
                Published ({getFilteredPosts("published").length})
              </TabsTrigger>
            </TabsList>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : (
              <>
                <div className="flex justify-end gap-2 my-4">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Filter className="h-3 w-3 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <ArrowUpDown className="h-3 w-3 mr-1" />
                    Sort
                  </Button>
                </div>

                <TabsContent value="all">
                  {scheduledPosts.length > 0 ? (
                    scheduledPosts.map((post) => (
                      <ScheduledPostCard
                        key={post.id}
                        post={post}
                        onEdit={handleEditPost}
                        onDelete={handleDeletePost}
                        onPublishNow={handlePublishNow}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No scheduled posts found. Create a new post to get
                      started.
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="scheduled">
                  {getFilteredPosts("scheduled").length > 0 ? (
                    getFilteredPosts("scheduled").map((post) => (
                      <ScheduledPostCard
                        key={post.id}
                        post={post}
                        onEdit={handleEditPost}
                        onDelete={handleDeletePost}
                        onPublishNow={handlePublishNow}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No scheduled posts found.
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="draft">
                  {getFilteredPosts("draft").length > 0 ? (
                    getFilteredPosts("draft").map((post) => (
                      <ScheduledPostCard
                        key={post.id}
                        post={post}
                        onEdit={handleEditPost}
                        onDelete={handleDeletePost}
                        onPublishNow={handlePublishNow}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No draft posts found.
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="published">
                  {getFilteredPosts("published").length > 0 ? (
                    getFilteredPosts("published").map((post) => (
                      <ScheduledPostCard
                        key={post.id}
                        post={post}
                        onEdit={handleEditPost}
                        onDelete={handleDeletePost}
                        onPublishNow={handlePublishNow}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No published posts found.
                    </div>
                  )}
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg">
          <CalendarView posts={scheduledPosts} />
        </div>
      )}
    </DashboardLayout>
  );
}
