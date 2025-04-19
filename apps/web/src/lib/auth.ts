// Simple auth utilities for managing tokens

/**
 * Get access token from local storage if available
 */
export async function getAccessToken(): Promise<string | null> {
  // For browser environments
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
}

/**
 * Save access token to local storage
 */
export function saveAccessToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
  }
}

/**
 * Clear access token from local storage
 */
export function clearAccessToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("accessToken");
  }
  return false;
}

/**
 * Mock login function (for development purposes)
 */
export async function mockLogin(
  username: string,
  password: string
): Promise<string> {
  // This is just a mock function for development
  // In a real app, this would call an API endpoint
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockToken = "mock_token_" + Math.random().toString(36).substring(2, 15);
  saveAccessToken(mockToken);
  return mockToken;
}

/**
 * Logout function
 */
export function logout(): void {
  clearAccessToken();
  // Redirect to login page or home page
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
}
