"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "ui";
import {
  Calendar,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Tag,
  Trash2,
  Bookmark,
  ArrowUpDown,
  Star,
  Download,
  Share2,
  Copy,
} from "lucide-react";

// Anecdote interface
interface AnecdoteProps {
  id: string;
  title: string;
  content: string;
  date: string;
  category: "personal" | "professional" | "lessons" | "other";
  tags: string[];
  favorite?: boolean;
}

function Anecdote({
  anecdote,
  onDelete,
  onEdit,
  onToggleFavorite,
}: {
  anecdote: AnecdoteProps;
  onDelete: (id: string) => void;
  onEdit: (anecdote: AnecdoteProps) => void;
  onToggleFavorite: (id: string) => void;
}) {
  const { id, title, content, date, category, tags } = anecdote;

  const categoryColors = {
    personal: "bg-purple-100 text-purple-800",
    professional: "bg-blue-100 text-blue-800",
    lessons: "bg-green-100 text-green-800",
    other: "bg-gray-100 text-gray-800",
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <div className="flex gap-2 items-center mt-1 text-sm text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{date}</span>
              <span className="px-1.5 py-0.5 rounded-full text-xs bg-gray-100">
                {category}
              </span>
              {anecdote.favorite && (
                <span className="text-yellow-500">
                  <Star className="h-3 w-3 fill-yellow-400" />
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite(id)}
              className={anecdote.favorite ? "text-yellow-500" : ""}
            >
              <Star
                className={`h-4 w-4 ${
                  anecdote.favorite ? "fill-yellow-400" : ""
                }`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(anecdote)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(anecdote)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => copyToClipboard(content)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Content
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportAnecdote(anecdote)}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share to LinkedIn
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="whitespace-pre-wrap">{content}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            <Tag className="h-3 w-3 text-gray-400 mr-1" />
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center text-xs bg-gray-100 rounded-full px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Sample data
const sampleAnecdotes: AnecdoteProps[] = [
  {
    id: "1",
    title: "My First Management Role",
    content:
      "When I first became a manager, I made the mistake of micromanaging my team. I quickly learned that empowering my team members and trusting them to make decisions was much more effective. This experience taught me the importance of delegation and trust in leadership.",
    date: "May 15, 2023",
    category: "professional",
    tags: ["leadership", "management", "growth"],
    favorite: true,
  },
  {
    id: "2",
    title: "Overcoming Public Speaking Fear",
    content:
      "I used to be terrified of public speaking. My hands would shake and my voice would tremble. I decided to join Toastmasters and practice speaking regularly. After six months, I was able to give a presentation to over 200 people with confidence.",
    date: "June 10, 2023",
    category: "personal",
    tags: ["public speaking", "personal growth", "challenge"],
    favorite: true,
  },
  {
    id: "3",
    title: "Failed Startup Lessons",
    content:
      "My first startup failed spectacularly. We built a product nobody wanted because we didn't validate our idea with customers first. This expensive lesson taught me the value of starting with customer problems rather than cool solutions.",
    date: "July 21, 2023",
    category: "lessons",
    tags: ["startups", "failure", "learning"],
    favorite: true,
  },
  {
    id: "4",
    title: "Negotiating My First Six-Figure Salary",
    content:
      "I was terrified to negotiate my salary when I received my first six-figure offer. I prepared extensively, researched market rates, and practiced my talking points. When the moment came, I calmly asked for 15% more than they offered - and they accepted within minutes.",
    date: "August 5, 2023",
    category: "professional",
    tags: ["negotiation", "career", "compensation"],
    favorite: true,
  },
];

// Create a function to format the current date
function getCurrentDate() {
  const date = new Date();
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Helper functions for new features
function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  // You could add a toast notification here
}

function exportAnecdote(anecdote: AnecdoteProps) {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(anecdote, null, 2));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `anecdote-${anecdote.id}.json`);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export default function AnecdotesPage() {
  const [anecdotes, setAnecdotes] = useState<AnecdoteProps[]>(sampleAnecdotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentAnecdote, setCurrentAnecdote] = useState<AnecdoteProps>({
    id: "",
    title: "",
    content: "",
    date: getCurrentDate(),
    category: "personal",
    tags: [],
    favorite: false,
  });
  const [newTag, setNewTag] = useState("");

  // New state for sorting
  const [sortOrder, setSortOrder] = useState<
    "newest" | "oldest" | "alphabetical" | "favorites"
  >("newest");

  // Handle delete anecdote
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this anecdote?")) {
      setAnecdotes(anecdotes.filter((anecdote) => anecdote.id !== id));
    }
  };

  // Handle edit anecdote
  const handleEdit = (anecdote: AnecdoteProps) => {
    setCurrentAnecdote(anecdote);
    setIsEditing(true);
    setShowAddForm(true);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      // Update existing anecdote
      setAnecdotes(
        anecdotes.map((a) =>
          a.id === currentAnecdote.id ? currentAnecdote : a
        )
      );
    } else {
      // Add new anecdote
      const newAnecdote = {
        ...currentAnecdote,
        id: Math.random().toString(36).substring(2, 9), // Generate random ID
        date: getCurrentDate(),
      };
      setAnecdotes([newAnecdote, ...anecdotes]);
    }

    // Reset form
    setShowAddForm(false);
    setIsEditing(false);
    setCurrentAnecdote({
      id: "",
      title: "",
      content: "",
      date: getCurrentDate(),
      category: "personal",
      tags: [],
      favorite: false,
    });
  };

  // Handle adding a tag
  const handleAddTag = () => {
    if (newTag.trim() && !currentAnecdote.tags.includes(newTag.trim())) {
      setCurrentAnecdote({
        ...currentAnecdote,
        tags: [...currentAnecdote.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tag: string) => {
    setCurrentAnecdote({
      ...currentAnecdote,
      tags: currentAnecdote.tags.filter((t) => t !== tag),
    });
  };

  // Filter anecdotes based on search query and selected category
  const filteredAnecdotes = anecdotes.filter((anecdote) => {
    const matchesSearch =
      anecdote.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anecdote.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anecdote.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesSearch;
  });

  // Sort anecdotes based on sort order
  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => {
    switch (sortOrder) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "alphabetical":
        return a.title.localeCompare(b.title);
      case "favorites":
        return (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0);
      default:
        return 0;
    }
  });

  const handleToggleFavorite = (id: string) => {
    setAnecdotes(
      anecdotes.map((a) => (a.id === id ? { ...a, favorite: !a.favorite } : a))
    );
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Anecdotes</h1>
          <p className="text-gray-500">
            Manage personal stories to use in your LinkedIn content
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              // Export all anecdotes
              const dataStr =
                "data:text/json;charset=utf-8," +
                encodeURIComponent(JSON.stringify(anecdotes, null, 2));
              const downloadAnchorNode = document.createElement("a");
              downloadAnchorNode.setAttribute("href", dataStr);
              downloadAnchorNode.setAttribute("download", "all-anecdotes.json");
              document.body.appendChild(downloadAnchorNode);
              downloadAnchorNode.click();
              downloadAnchorNode.remove();
            }}
          >
            <Download className="h-4 w-4 mr-1" />
            Export All
          </Button>
          <Button
            className="flex gap-2 items-center"
            onClick={() => {
              setIsEditing(false);
              setCurrentAnecdote({
                id: "",
                title: "",
                content: "",
                date: getCurrentDate(),
                category: "personal",
                tags: [],
                favorite: false,
              });
              setShowAddForm(true);
            }}
          >
            <Plus className="h-4 w-4" />
            <span>Add Anecdote</span>
          </Button>
        </div>
      </div>

      {/* Add/Edit Anecdote Form */}
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {isEditing ? "Edit Anecdote" : "Add New Anecdote"}
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-1"
                >
                  Title
                </label>
                <Input
                  id="title"
                  value={currentAnecdote.title}
                  onChange={(e) =>
                    setCurrentAnecdote({
                      ...currentAnecdote,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter a title for your anecdote"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={currentAnecdote.category}
                  onChange={(e) =>
                    setCurrentAnecdote({
                      ...currentAnecdote,
                      category: e.target.value as any,
                    })
                  }
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="personal">Personal</option>
                  <option value="professional">Professional</option>
                  <option value="lessons">Lessons</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium mb-1"
                >
                  Content
                </label>
                <div className="relative">
                  <textarea
                    id="content"
                    value={currentAnecdote.content}
                    onChange={(e) =>
                      setCurrentAnecdote({
                        ...currentAnecdote,
                        content: e.target.value,
                      })
                    }
                    placeholder="Share your anecdote here..."
                    className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                    {currentAnecdote.content.length} characters
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium mb-1"
                  >
                    Tags
                  </label>
                  <label className="block text-xs text-gray-500">
                    Mark as favorite
                    <input
                      type="checkbox"
                      checked={currentAnecdote.favorite}
                      onChange={(e) =>
                        setCurrentAnecdote({
                          ...currentAnecdote,
                          favorite: e.target.checked,
                        })
                      }
                      className="ml-2"
                    />
                  </label>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddTag}
                  >
                    Add
                  </Button>
                </div>

                {currentAnecdote.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {currentAnecdote.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center text-xs bg-gray-100 rounded-full px-2 py-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddForm(false);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update" : "Save"} Anecdote
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      <div className="mb-6">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Anecdotes</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
            <TabsTrigger value="favorites">
              <Star className="h-4 w-4 mr-1" />
              Favorites
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search anecdotes..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <ArrowUpDown className="h-4 w-4" />
              <span>Sort</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortOrder("newest")}>
              Newest First
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("oldest")}>
              Oldest First
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("alphabetical")}>
              Alphabetical
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("favorites")}>
              Favorites First
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <TabsContent value="all">
          {sortedAnecdotes.length > 0 ? (
            sortedAnecdotes.map((anecdote) => (
              <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onToggleFavorite={handleToggleFavorite}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <Bookmark className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-600 mb-1">
                No anecdotes found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery
                  ? "Try a different search term"
                  : "Start adding your personal stories"}
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentAnecdote({
                      id: "",
                      title: "",
                      content: "",
                      date: getCurrentDate(),
                      category: "personal",
                      tags: [],
                      favorite: false,
                    });
                    setShowAddForm(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Your First Anecdote
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="personal">
          {sortedAnecdotes.filter((a) => a.category === "personal").length >
          0 ? (
            sortedAnecdotes
              .filter((a) => a.category === "personal")
              .map((anecdote) => (
                <Anecdote
                  key={anecdote.id}
                  anecdote={anecdote}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No personal anecdotes found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="professional">
          {sortedAnecdotes.filter((a) => a.category === "professional").length >
          0 ? (
            sortedAnecdotes
              .filter((a) => a.category === "professional")
              .map((anecdote) => (
                <Anecdote
                  key={anecdote.id}
                  anecdote={anecdote}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No professional anecdotes found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="lessons">
          {sortedAnecdotes.filter((a) => a.category === "lessons").length >
          0 ? (
            sortedAnecdotes
              .filter((a) => a.category === "lessons")
              .map((anecdote) => (
                <Anecdote
                  key={anecdote.id}
                  anecdote={anecdote}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No lesson anecdotes found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="other">
          {sortedAnecdotes.filter((a) => a.category === "other").length > 0 ? (
            sortedAnecdotes
              .filter((a) => a.category === "other")
              .map((anecdote) => (
                <Anecdote
                  key={anecdote.id}
                  anecdote={anecdote}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No other anecdotes found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="favorites">
          {sortedAnecdotes.filter((a) => a.favorite).length > 0 ? (
            sortedAnecdotes
              .filter((a) => a.favorite)
              .map((anecdote) => (
                <Anecdote
                  key={anecdote.id}
                  anecdote={anecdote}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No favorite anecdotes yet</p>
            </div>
          )}
        </TabsContent>
      </div>
    </DashboardLayout>
  );
}
