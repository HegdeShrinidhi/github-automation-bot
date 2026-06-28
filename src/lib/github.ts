export async function getRepositories(username: string) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }

  return response.json();
}