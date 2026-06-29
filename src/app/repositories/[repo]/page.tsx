import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";

async function getRepository(
  username: string,
  repo: string
) {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repo}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Repository not found");
  }

  return response.json();
}

export default async function RepositoryDetails({
  params,
}: {
  params: Promise<{ repo: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const { repo } = await params;

  const repository = await getRepository(
    session.user?.name!,
    repo
  );

  return (
    <div className="flex">
      <AppSidebar />

      <main className="flex-1 p-8">
        <h1 className="mb-8 text-4xl font-bold">
          {repository.name}
        </h1>

        <div className="rounded-xl border bg-white p-8 shadow-sm space-y-4">
          <p>
            <strong>Description:</strong>{" "}
            {repository.description ||
              "No description available"}
          </p>

          <p>
            <strong>Language:</strong>{" "}
            {repository.language || "Unknown"}
          </p>

          <p>
            <strong>Stars:</strong>{" "}
            {repository.stargazers_count}
          </p>

          <p>
            <strong>Forks:</strong>{" "}
            {repository.forks_count}
          </p>

          <p>
            <strong>Open Issues:</strong>{" "}
            {repository.open_issues_count}
          </p>

          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(
              repository.updated_at
            ).toLocaleDateString()}
          </p>

          <a
            href={repository.html_url}
            target="_blank"
            className="inline-block rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800"
          >
            Open on GitHub
          </a>
        </div>
      </main>
    </div>
  );
}