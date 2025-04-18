"use client";

import { Button, Card, CardHeader, CardContent } from "ui";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          LinkedIn Content Generator
        </h1>
        <p className="text-xl text-gray-600">
          Analyze, generate, and manage your LinkedIn content
        </p>
      </header>

      <div className="mx-auto max-w-4xl space-y-6">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">
              Welcome to LinkedIn Content Generator
            </h2>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-700">
              Generate high-quality LinkedIn posts that match your personal
              writing style. Connect your LinkedIn account to get started.
            </p>
            <div className="space-x-4">
              <Button>Connect LinkedIn</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <FeatureCard
            title="Content Retrieval"
            description="Fetch your previous LinkedIn posts and analyze engagement metrics"
            icon="📥"
          />
          <FeatureCard
            title="AI-Powered Generation"
            description="Create new posts that match your voice and writing style"
            icon="🤖"
          />
          <FeatureCard
            title="Automated Publishing"
            description="Schedule and automatically post content to LinkedIn"
            icon="📅"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <Card className="flex flex-col items-center p-6 text-center">
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="mb-2 text-xl font-medium">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Card>
  );
}
