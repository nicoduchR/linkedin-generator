// API URL for backend
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// LinkedIn API constants
export const LINKEDIN_API = {
  BASE_URL: "https://api.linkedin.com/v2",
  AUTH_URL: "https://www.linkedin.com/oauth/v2/authorization",
};

// UI constants
export const UI_CONSTANTS = {
  SIDEBAR_WIDTH: "280px",
  MAX_CONTENT_WIDTH: "1200px",
};

// Application routes
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  POSTS: "/dashboard/posts",
  GENERATE: "/dashboard/generate",
  ANALYTICS: "/dashboard/analytics",
  ANECDOTES: "/dashboard/anecdotes",
};

// Colors (matching tailwind theme)
export const COLORS = {
  PRIMARY: "#0077B5", // LinkedIn blue
  SECONDARY: "#00a0dc",
  SUCCESS: "#10B981",
  DANGER: "#EF4444",
  WARNING: "#F59E0B",
  INFO: "#3B82F6",
};
