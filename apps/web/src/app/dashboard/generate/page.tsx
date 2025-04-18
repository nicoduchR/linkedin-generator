"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  BarChart,
  Calendar,
  Bookmark,
  Send,
  ThumbsUp,
  MessageSquare,
  CornerUpRight,
  Clock,
} from "lucide-react";

export default function GeneratePage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Generate LinkedIn Content</h1>
        <p className="text-gray-500">
          Create new content based on your writing style
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {/* Generation Options */}
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>
                Configure your post generation parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="guided">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="guided">Guided</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="guided" className="space-y-4">
                  <div>
                    <Label htmlFor="topic">Topic</Label>
                    <Select defaultValue="professional">
                      <SelectTrigger id="topic">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">
                          Professional Development
                        </SelectItem>
                        <SelectItem value="industry">
                          Industry Trends
                        </SelectItem>
                        <SelectItem value="leadership">Leadership</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="career">Career Advice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tone">Tone</Label>
                    <Select defaultValue="professional">
                      <SelectTrigger id="tone">
                        <SelectValue placeholder="Select a tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="educational">Educational</SelectItem>
                        <SelectItem value="inspirational">
                          Inspirational
                        </SelectItem>
                        <SelectItem value="thoughtful">Thoughtful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="length">Length</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="length">
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">
                          Short (100-150 words)
                        </SelectItem>
                        <SelectItem value="medium">
                          Medium (200-300 words)
                        </SelectItem>
                        <SelectItem value="long">
                          Long (400-500 words)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="include-hashtags" />
                    <Label htmlFor="include-hashtags">
                      Include relevant hashtags
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="include-call-to-action" defaultChecked />
                    <Label htmlFor="include-call-to-action">
                      Include call to action
                    </Label>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4">
                  <div>
                    <Label htmlFor="prompt">Custom Prompt</Label>
                    <Textarea
                      id="prompt"
                      placeholder="Write a post about the future of AI in marketing that showcases my expertise while being approachable..."
                      className="h-20 resize-none"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="creativity">Creativity</Label>
                      <span className="text-sm text-gray-500">70%</span>
                    </div>
                    <Slider
                      defaultValue={[70]}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="formality">Formality</Label>
                      <span className="text-sm text-gray-500">80%</span>
                    </div>
                    <Slider
                      defaultValue={[80]}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="use-personal-anecdotes" defaultChecked />
                    <Label htmlFor="use-personal-anecdotes">
                      Use personal anecdotes
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="include-statistics" />
                    <Label htmlFor="include-statistics">
                      Include statistics and data
                    </Label>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button className="flex gap-2 items-center">
                <Sparkles className="h-4 w-4" />
                <span>Generate Post</span>
              </Button>
            </CardFooter>
          </Card>

          {/* Generated Content */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Post</CardTitle>
              <CardDescription>Your AI-generated LinkedIn post</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[200px] font-sans leading-relaxed"
                placeholder="Your generated content will appear here..."
                defaultValue="As we navigate the evolving landscape of digital marketing, I've been reflecting on the impact of authentic storytelling in building meaningful connections with audiences.

Too often, brands focus solely on metrics and conversions, forgetting that behind every click is a human seeking value and resonance.

In my 12+ years helping companies develop their digital presence, I've found that the most successful campaigns aren't just technically sound—they tell a compelling story that aligns with the audience's values and aspirations.

What's your experience? Have you found storytelling to be a critical component of your marketing strategy, or do you prioritize other approaches?

#DigitalMarketing #AuthenticStorytelling #BrandStrategy"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex gap-1 items-center"
                >
                  <CornerUpRight className="h-4 w-4" />
                  <span>Regenerate</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex gap-1 items-center"
                >
                  <Bookmark className="h-4 w-4" />
                  <span>Save</span>
                </Button>
              </div>
              <Button className="flex gap-1 items-center">
                <Send className="h-4 w-4" />
                <span>Post to LinkedIn</span>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Preview & Analytics */}
        <div className="space-y-6">
          {/* Preview Card */}
          <Card>
            <CardHeader>
              <CardTitle>Post Preview</CardTitle>
              <CardDescription>
                How your post will look on LinkedIn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-200 rounded-md p-4 bg-white shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="h-12 w-12 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">
                      Digital Marketing Director • 1h
                    </p>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-sm mb-2">
                    As we navigate the evolving landscape of digital marketing,
                    I've been reflecting on the impact of authentic storytelling
                    in building meaningful connections with audiences.
                  </p>
                  <p className="text-sm mb-2">
                    Too often, brands focus solely on metrics and conversions,
                    forgetting that behind every click is a human seeking value
                    and resonance.
                  </p>
                  <p className="text-sm mb-2">
                    In my 12+ years helping companies develop their digital
                    presence, I've found that the most successful campaigns
                    aren't just technically sound—they tell a compelling story
                    that aligns with the audience's values and aspirations.
                  </p>
                  <p className="text-sm mb-2">
                    What's your experience? Have you found storytelling to be a
                    critical component of your marketing strategy, or do you
                    prioritize other approaches?
                  </p>
                  <p className="text-sm text-blue-600 mb-0">
                    #DigitalMarketing #AuthenticStorytelling #BrandStrategy
                  </p>
                </div>
                <div className="flex mt-4 text-gray-500 text-sm">
                  <div className="flex items-center mr-4">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>0</span>
                  </div>
                  <div className="flex items-center mr-4">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>0</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Prediction */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement Prediction</CardTitle>
              <CardDescription>
                Estimated performance based on your history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 text-gray-500 mr-2" />
                    <span>Estimated Likes</span>
                  </div>
                  <span className="font-medium">35-45</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 text-gray-500 mr-2" />
                    <span>Estimated Comments</span>
                  </div>
                  <span className="font-medium">8-12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart className="h-4 w-4 text-gray-500 mr-2" />
                    <span>Engagement Score</span>
                  </div>
                  <span className="font-medium text-green-600">High</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span>Best Posting Time</span>
                  </div>
                  <span className="font-medium">Tue 9:30 AM</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full flex gap-2 items-center"
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule for Best Time</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
