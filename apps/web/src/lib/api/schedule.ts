import { API_URL } from "@/lib/constants";
import { getAccessToken } from "@/lib/auth";

export interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  scheduledDate: string;
  scheduledTime: string;
  status: "scheduled" | "draft" | "published" | "failed";
  platform: "linkedin" | "twitter" | "facebook";
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSchedulePayload {
  title: string;
  content: string;
  scheduledDate: string;
  scheduledTime: string;
  status: "scheduled" | "draft";
  platform: "linkedin" | "twitter" | "facebook";
}

export interface UpdateSchedulePayload extends Partial<CreateSchedulePayload> {
  id: string;
}

/**
 * Get all scheduled posts
 */
export async function getScheduledPosts(): Promise<ScheduledPost[]> {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${API_URL}/scheduled-posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch scheduled posts: ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching scheduled posts:", error);
    // Return mock data for development
    return [
      {
        id: "1",
        title: "AI in Marketing: Beyond the Buzzwords",
        content:
          "AI is transforming marketing in three key ways: personalization at scale, predictive analytics, and automated content optimization. But the real magic happens when these technologies augment human creativity rather than trying to replace it.\n\nIn my experience implementing AI tools across marketing departments, the most successful teams use AI to handle data analysis and repetitive tasks while humans focus on strategy and emotional connection.\n\nWhat's your take? Are you using AI in your marketing workflow?\n\n#AIMarketing #MarTech #DigitalStrategy",
        scheduledDate: "2025-04-19",
        scheduledTime: "09:30",
        status: "scheduled",
        platform: "linkedin",
        createdAt: "2023-05-20T14:32:10Z",
        updatedAt: "2023-05-20T14:32:10Z",
      },
      {
        id: "2",
        title: "The Remote Work Revolution: One Year Later",
        content:
          "After a year of full remote work, here are 5 surprising lessons my team has learned:\n\n1. Productivity increased by 22%, but required clearer documentation\n2. Creativity hasn't suffered, but needs structured brainstorming sessions\n3. New team members need more intentional onboarding\n4. Some meetings really are unnecessary\n5. Work-life balance improved for 76% of our team\n\nThe key wasn't just adopting new tools, but redesigning our processes from the ground up.\n\nWhat's been your biggest remote work revelation?\n\n#RemoteWork #FutureOfWork #ProductivityTips",
        scheduledDate: "2023-06-17",
        scheduledTime: "14:00",
        status: "scheduled",
        platform: "linkedin",
        createdAt: "2023-05-21T09:12:45Z",
        updatedAt: "2023-05-21T09:12:45Z",
      },
      {
        id: "3",
        title: "Upcoming LinkedIn Algorithm Changes",
        content:
          "LinkedIn is rolling out algorithm changes next month that will prioritize:\n\n1. Content that generates meaningful conversations\n2. Expertise-focused posts with tangible insights\n3. Content that doesn't explicitly ask for engagement\n\nBased on my analysis of recent trends, this means authentic storytelling with practical takeaways will perform even better.\n\nI've updated my content strategy accordingly - focusing more on case studies and actionable advice rather than aspirational posts.\n\nHow are you adapting your LinkedIn strategy?\n\n#LinkedInTips #ContentStrategy #SocialMediaMarketing",
        scheduledDate: "2023-06-22",
        scheduledTime: "11:15",
        status: "draft",
        platform: "linkedin",
        createdAt: "2023-05-22T16:03:21Z",
        updatedAt: "2023-05-22T16:03:21Z",
      },
      {
        id: "4",
        title: "Sustainable Tech: Beyond the Greenwashing",
        content:
          "Technology companies are making bold environmental claims, but which ones are actually delivering?\n\nThrough my research, I've found that meaningful sustainability in tech requires:\n\n• Supply chain transparency\n• Repairability and extended product lifecycles\n• Energy-efficient operations beyond carbon offsets\n• Circular design principles\n\nI've been evaluating my own digital carbon footprint and making changes like extending device lifecycles and choosing cloud providers with strong environmental practices.\n\nWhat steps are you taking toward more sustainable tech habits?\n\n#SustainableTech #DigitalSustainability #TechForGood",
        scheduledDate: "2023-06-24",
        scheduledTime: "15:45",
        status: "scheduled",
        platform: "linkedin",
        createdAt: "2023-05-23T11:42:09Z",
        updatedAt: "2023-05-23T11:42:09Z",
      },
      {
        id: "5",
        title: "Leadership Lessons from Unexpected Places",
        content:
          "The most valuable leadership lesson I learned came not from a business book or mentor, but from coaching my daughter's soccer team.\n\nWhen a talented but individualistic player was disrupting team cohesion, I tried several approaches to integrate her better. Nothing worked until I paired her with our least skilled player and gave them a specific challenge that required collaboration.\n\nThe transformation was remarkable - not only did our team performance improve, but both players grew in unexpected ways.\n\nThis experience fundamentally changed how I approach team dynamics in business settings.\n\nWhere have you found leadership insights in unexpected places?\n\n#LeadershipLessons #TeamBuilding #PersonalGrowth",
        scheduledDate: "2023-06-28",
        scheduledTime: "10:00",
        status: "scheduled",
        platform: "linkedin",
        createdAt: "2023-05-24T08:15:33Z",
        updatedAt: "2023-05-24T08:15:33Z",
      },
    ];
  }
}

/**
 * Create a new scheduled post
 */
export async function createScheduledPost(
  payload: CreateSchedulePayload
): Promise<ScheduledPost> {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${API_URL}/scheduled-posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create scheduled post: ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error creating scheduled post:", error);
    // Return mock data for development
    return {
      id: Math.random().toString(36).substring(2, 9),
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

/**
 * Update an existing scheduled post
 */
export async function updateScheduledPost(
  payload: UpdateSchedulePayload
): Promise<ScheduledPost> {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${API_URL}/scheduled-posts/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update scheduled post: ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error updating scheduled post:", error);
    // Return mock data for development
    return {
      id: payload.id,
      title: payload.title || "Updated Title",
      content: payload.content || "Updated Content",
      scheduledDate:
        payload.scheduledDate || new Date().toISOString().split("T")[0],
      scheduledTime: payload.scheduledTime || "12:00",
      status: payload.status || "scheduled",
      platform: payload.platform || "linkedin",
      updatedAt: new Date().toISOString(),
    };
  }
}

/**
 * Delete a scheduled post
 */
export async function deleteScheduledPost(id: string): Promise<void> {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${API_URL}/scheduled-posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete scheduled post: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error deleting scheduled post:", error);
    // No need to return anything for mock data
  }
}

/**
 * Publish a scheduled post immediately
 */
export async function publishNow(id: string): Promise<ScheduledPost> {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${API_URL}/scheduled-posts/${id}/publish`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to publish post: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error publishing post:", error);
    // Return mock data for development
    return {
      id: id,
      title: "Mock Published Post",
      content: "This post has been published immediately.",
      scheduledDate: new Date().toISOString().split("T")[0],
      scheduledTime: new Date().toTimeString().split(" ")[0].substring(0, 5),
      status: "published",
      platform: "linkedin",
      updatedAt: new Date().toISOString(),
    };
  }
}
