/**
 * Get current authenticated user from backend
 * Client-only function - safe during SSR
 */
export async function getCurrentUser(token?: string) {
  try {
    // Ensure we're on client-side only
    if (typeof window === "undefined") {
      return null;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://insight.istad.co/attendance";
    const url = `${apiUrl}/auth/me`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
