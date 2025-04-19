import { API_URL } from "@/lib/constants";
import { getAccessToken } from "@/lib/auth";

export interface Anecdote {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  tags: string[];
}

export interface CreateAnecdotePayload {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

export interface UpdateAnecdotePayload extends Partial<CreateAnecdotePayload> {
  id: string;
}

export async function getAnecdotes(): Promise<Anecdote[]> {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${API_URL}/anecdotes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch anecdotes: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching anecdotes:", error);
    // For now, return mock data
    return [
      {
        id: "1",
        title: "Leadership Challenge",
        content:
          "Led a cross-functional team through a critical product launch when the original team lead had to take emergency leave. Coordinated with 5 departments and met all deadlines despite the sudden transition.",
        date: "2023-08-15",
        category: "Leadership",
        tags: ["teamwork", "crisis-management", "product-launch"],
      },
      {
        id: "2",
        title: "Technical Innovation",
        content:
          "Identified a performance bottleneck in our legacy system that was causing periodic outages. Implemented a caching solution that reduced system load by 40% and eliminated downtime incidents.",
        date: "2023-06-22",
        category: "Technical",
        tags: ["problem-solving", "performance", "innovation"],
      },
      {
        id: "3",
        title: "Client Success Story",
        content:
          "Worked with a challenging enterprise client who was considering not renewing their contract. Through active listening and creative problem-solving, not only retained the client but expanded their service package by 30%.",
        date: "2023-05-10",
        category: "Client Relations",
        tags: ["negotiation", "customer-retention", "upselling"],
      },
      {
        id: "4",
        title: "Process Improvement",
        content:
          "Noticed our QA process had redundant steps causing delays. Developed and implemented a streamlined workflow that reduced testing time by 25% while maintaining quality standards.",
        date: "2023-04-03",
        category: "Processes",
        tags: ["efficiency", "quality-assurance", "workflow-optimization"],
      },
      {
        id: "5",
        title: "Mentorship Experience",
        content:
          "Volunteered to mentor two junior developers who were struggling with our codebase. Created a structured learning plan that got them up to speed in half the typical onboarding time.",
        date: "2023-03-15",
        category: "Leadership",
        tags: ["mentoring", "onboarding", "knowledge-sharing"],
      },
    ];
  }
}

export async function createAnecdote(
  payload: CreateAnecdotePayload
): Promise<Anecdote> {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${API_URL}/anecdotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to create anecdote: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error creating anecdote:", error);
    // For now, return mock data with a generated ID
    return {
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString().split("T")[0],
      ...payload,
    };
  }
}

export async function updateAnecdote(
  payload: UpdateAnecdotePayload
): Promise<Anecdote> {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${API_URL}/anecdotes/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to update anecdote: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error updating anecdote:", error);
    // Return updated data for mocking
    return {
      id: payload.id,
      title: payload.title || "Updated Title",
      content: payload.content || "Updated Content",
      category: payload.category || "Leadership",
      tags: payload.tags || ["updated"],
      date: new Date().toISOString().split("T")[0],
    };
  }
}

export async function deleteAnecdote(id: string): Promise<void> {
  try {
    const token = await getAccessToken();
    const response = await fetch(`${API_URL}/anecdotes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete anecdote: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting anecdote:", error);
    // No return needed for mock data
  }
}
