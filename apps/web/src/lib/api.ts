import axios from "axios";

// Create an API client with the base URL
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// API functions
export const api = {
  // Health check
  health: async () => {
    try {
      const response = await apiClient.get("/health");
      return response.data;
    } catch (error) {
      console.error("Error checking API health:", error);
      throw error;
    }
  },
};

export default api;
