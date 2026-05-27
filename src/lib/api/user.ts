/**
 * Get current authenticated user from backend
 * Backend endpoint: GET /api/v1/attendance/auth/me
 */
export async function getCurrentUser(token?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://insight.istad.co/attendance";

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${baseUrl}/auth/me`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    return null;
  }
}
