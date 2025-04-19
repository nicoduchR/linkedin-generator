"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "ui";
import {
  ArrowRight,
  Brain,
  Calendar,
  ChevronRight,
  LineChart,
  LinkedinIcon,
  MessageSquare,
  Sparkles,
  Clock,
} from "lucide-react";

function FeatureCard({
  title,
  description,
  icon: Icon,
  className = "",
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-b from-background/80 to-background p-6 shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="absolute right-0 top-0 h-16 w-16 translate-x-4 -translate-y-4 rotate-45 bg-gradient-to-br from-primary/20 to-primary opacity-20 blur-2xl" />
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
  company,
}: {
  quote: string;
  author: string;
  role: string;
  company: string;
}) {
  return (
    <motion.div
      className="rounded-xl border border-border/40 bg-background p-6 shadow-md"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <div className="mb-4 text-primary">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-lg">
            ★
          </span>
        ))}
      </div>
      <p className="mb-4 text-muted-foreground italic">"{quote}"</p>
      <div>
        <p className="font-medium">{author}</p>
        <p className="text-sm text-muted-foreground">
          {role}, {company}
        </p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
            <div className="flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center rounded-full border border-border/60 bg-background px-3 py-1 text-sm">
                <span className="mr-1 rounded-full bg-primary h-2 w-2"></span>
                <span>AI-powered content generation</span>
              </div>
              <motion.h1
                className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  LinkedIn
                </span>{" "}
                Content That Converts
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground md:text-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Generate high-quality LinkedIn posts that match your personal
                style, schedule content, and analyze engagement - all in one
                platform.
              </motion.p>
              <motion.div
                className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button
                  size="lg"
                  className="bg-[#0A66C2] hover:bg-[#004182] text-white group"
                >
                  <Link href="/dashboard" className="flex items-center">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="group">
                  <Link
                    href="/dashboard/generate"
                    className="flex items-center"
                  >
                    Try Demo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                className="flex items-center space-x-4 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-background bg-gray-200"
                    />
                  ))}
                </div>
                <div>
                  <span className="font-medium">1,200+</span> professionals
                  using our platform
                </div>
              </motion.div>
            </div>
            <div className="relative">
              <motion.div
                className="relative z-10 overflow-hidden rounded-xl border border-border/40 bg-background shadow-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="flex items-center justify-between border-b border-border/30 bg-muted/50 px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div className="text-xs font-medium">
                    LinkedIn Content Generator
                  </div>
                  <div></div>
                </div>
                <div className="divide-y divide-border/30">
                  <div className="bg-muted/30 p-6">
                    <div className="mb-4 flex justify-between">
                      <h3 className="font-semibold">
                        Generate Professional Content
                      </h3>
                      <div className="flex items-center text-xs text-green-500">
                        <Sparkles className="mr-1 h-3 w-3" />
                        AI-Powered
                      </div>
                    </div>
                    <div className="space-y-3 rounded-lg bg-background p-4 shadow-sm">
                      <div className="h-4 w-3/4 rounded-full bg-gray-200" />
                      <div className="h-4 w-5/6 rounded-full bg-gray-200" />
                      <div className="h-4 w-2/3 rounded-full bg-gray-200" />
                      <div className="h-4 w-4/5 rounded-full bg-gray-200" />
                      <div className="h-4 w-1/2 rounded-full bg-gray-200" />
                    </div>
                    <div className="mt-4 flex justify-end">
                      <div className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        Generate
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold">Upcoming Schedule</h3>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="flex justify-between rounded-lg border border-border/40 bg-background p-3"
                        >
                          <div>
                            <div className="h-3 w-24 rounded-full bg-gray-200" />
                            <div className="mt-1 h-2 w-16 rounded-full bg-gray-200" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="h-4 w-16 rounded-full bg-blue-100 text-center text-[10px] text-blue-700">
                              {new Date(
                                Date.now() + i * 86400000
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="absolute -left-4 -top-4 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
              <div className="absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl" />
            </div>
          </div>
        </div>

        {/* Floating stats */}
        <div className="container mx-auto mt-16 px-4 md:px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {[
              { label: "Generated Posts", value: "15K+" },
              { label: "Engagement Rate", value: "32%" },
              { label: "Time Saved", value: "10hrs/week" },
              { label: "Satisfied Users", value: "98%" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="rounded-lg border border-border/30 bg-background p-4 text-center shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl font-bold md:text-3xl">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">
              Powerful Features
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Everything you need to create, manage, and analyze your LinkedIn
              content
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="AI Content Generation"
              description="Create engaging LinkedIn posts that match your voice and writing style with advanced AI."
              icon={Brain}
            />
            <FeatureCard
              title="Content Calendar"
              description="Schedule and plan your content calendar to maintain a consistent LinkedIn presence."
              icon={Calendar}
            />
            <FeatureCard
              title="Analytics Dashboard"
              description="Track engagement metrics and optimize your content strategy based on performance data."
              icon={LineChart}
            />
            <FeatureCard
              title="Anecdote Library"
              description="Save and organize personal stories and experiences to repurpose in your content."
              icon={MessageSquare}
            />
            <FeatureCard
              title="Multiple Platforms"
              description="Connect and publish to LinkedIn, Twitter, and other social platforms from one dashboard."
              icon={LinkedinIcon}
              className="sm:col-span-2 lg:col-span-1"
            />
            <FeatureCard
              title="Automated Publishing"
              description="Set it and forget it with fully automated content publishing at optimal times."
              icon={Clock}
              className="sm:col-span-2 lg:col-span-1"
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Join thousands of professionals who've transformed their LinkedIn
              presence
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="LinkedIn Content Generator has saved me hours each week. The AI-generated content actually sounds like me, and the scheduling feature is a game-changer."
              author="Sarah Johnson"
              role="Marketing Director"
              company="TechSolutions Inc."
            />
            <TestimonialCard
              quote="Since using this platform, my engagement rate has increased by 45%. The analytics help me understand what content resonates with my audience."
              author="Michael Chen"
              role="Startup Founder"
              company="InnovateLabs"
            />
            <TestimonialCard
              quote="As a solo entrepreneur, I was struggling to maintain a consistent LinkedIn presence. This tool has completely automated my content strategy."
              author="Jessica Miller"
              role="Business Coach"
              company="Growth Mindset"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/20 to-blue-500/20 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to Transform Your LinkedIn Strategy?
            </h2>
            <p className="mb-6 text-xl text-muted-foreground">
              Join thousands of professionals using LinkedIn Content Generator
              to grow their professional brand.
            </p>
            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                size="lg"
                className="bg-[#0A66C2] hover:bg-[#004182] text-white"
              >
                <Link href="/dashboard" className="flex items-center">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link href="/dashboard/generate">Try Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-2">
              <LinkedinIcon className="h-6 w-6 text-primary" />
              <span className="font-bold">LinkedIn Content Generator</span>
            </div>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground">
                Contact
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} LinkedIn Content Generator. All
              rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
