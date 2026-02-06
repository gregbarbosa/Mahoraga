export function getApiToken(): string {
  return (
    localStorage.getItem("mahoraga_api_token") ||
    (window as unknown as { VITE_MAHORAGA_API_TOKEN?: string }).VITE_MAHORAGA_API_TOKEN ||
    ""
  );
}

export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getApiToken();
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(url, { ...options, headers });
}
