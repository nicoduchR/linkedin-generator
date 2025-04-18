import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Plus,
  ThumbsUp,
  MessageSquare,
  BarChart,
  MoreHorizontal,
  Edit,
  Copy,
  Clock,
} from "lucide-react";

// LinkedIn Post Component
interface PostProps {
  id: string;
  title: string;
  content: string;
  date: string;
  likes: number;
  comments: number;
  status: "published" | "scheduled" | "draft";
  engagement: "high" | "medium" | "low";
}

function LinkedInPost({ post }: { post: PostProps }) {
  const { title, content, date, likes, comments, status, engagement } = post;

  const statusColors = {
    published: "bg-green-100 text-green-800",
    scheduled: "bg-blue-100 text-blue-800",
    draft: "bg-gray-100 text-gray-800",
  };

  const engagementColors = {
    high: "text-green-600",
    medium: "text-yellow-600",
    low: "text-red-600",
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className={statusColors[status]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
              <span className="text-xs text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {date}
              </span>
            </div>
          </div>
          <div className="relative">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            {/* Dropdown Menu would go here */}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">{content}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 pb-3">
        <div className="flex gap-4">
          <span className="text-xs text-gray-500 flex items-center">
            <ThumbsUp className="h-3 w-3 mr-1" />
            {likes} likes
          </span>
          <span className="text-xs text-gray-500 flex items-center">
            <MessageSquare className="h-3 w-3 mr-1" />
            {comments} comments
          </span>
          <span
            className={`text-xs flex items-center ${engagementColors[engagement]}`}
          >
            <BarChart className="h-3 w-3 mr-1" />
            {engagement.charAt(0).toUpperCase() + engagement.slice(1)}{" "}
            engagement
          </span>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Edit className="h-3 w-3 mr-1" />
            <span className="text-xs">Edit</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Copy className="h-3 w-3 mr-1" />
            <span className="text-xs">Copy</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// Sample data
const posts: PostProps[] = [
  {
    id: "1",
    title: "10 Tips for LinkedIn Success in 2023",
    content: `As we navigate the evolving landscape of digital marketing, I've been reflecting on the impact of authentic storytelling in building meaningful connections with audiences. Too often, brands focus solely on metrics and conversions, forgetting that behind every click is a human seeking value and resonance.`,
    date: "May 15, 2023",
    likes: 134,
    comments: 47,
    status: "published",
    engagement: "high",
  },
  {
    id: "2",
    title: "How to Build Your Personal Brand",
    content: `Your personal brand is more than just your online presence—it's the unique combination of skills, experience, and personality that you want the world to see. Building a strong personal brand helps you stand out in your career and opens up opportunities.`,
    date: "May 10, 2023",
    likes: 87,
    comments: 23,
    status: "published",
    engagement: "medium",
  },
  {
    id: "3",
    title: "Upcoming LinkedIn Algorithm Changes",
    content:
      "LinkedIn is constantly evolving its algorithm to provide better content to users. Understanding these changes can help you optimize your content strategy and increase your reach on the platform.",
    date: "May 21, 2023",
    likes: 0,
    comments: 0,
    status: "scheduled",
    engagement: "medium",
  },
  {
    id: "4",
    title: "The Future of Work",
    content:
      "Remote work, hybrid models, and the gig economy are reshaping how we think about employment. Organizations need to adapt to these changes to attract and retain top talent.",
    date: "Draft",
    likes: 0,
    comments: 0,
    status: "draft",
    engagement: "low",
  },
];

export default function PostsPage() {
  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Posts</h1>
          <p className="text-gray-500">
            Manage and track your LinkedIn content
          </p>
        </div>
        <Button className="flex gap-2 items-center">
          <Plus className="h-4 w-4" />
          <span>Create Post</span>
        </Button>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search posts..." className="pl-9" />
        </div>
        <Select defaultValue="newest">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="engagement">Most Engagement</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="flex gap-2 items-center">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>

      <div>
        <TabsContent value="all">
          {posts.map((post) => (
            <LinkedInPost key={post.id} post={post} />
          ))}
        </TabsContent>
        <TabsContent value="published">
          {posts
            .filter((post) => post.status === "published")
            .map((post) => (
              <LinkedInPost key={post.id} post={post} />
            ))}
        </TabsContent>
        <TabsContent value="scheduled">
          {posts
            .filter((post) => post.status === "scheduled")
            .map((post) => (
              <LinkedInPost key={post.id} post={post} />
            ))}
        </TabsContent>
        <TabsContent value="drafts">
          {posts
            .filter((post) => post.status === "draft")
            .map((post) => (
              <LinkedInPost key={post.id} post={post} />
            ))}
        </TabsContent>
      </div>
    </DashboardLayout>
  );
}
