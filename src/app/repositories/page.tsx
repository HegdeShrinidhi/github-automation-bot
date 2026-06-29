import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getRepositories } from "@/lib/github";
import { AppSidebar } from "@/components/layout/app-sidebar";
import Link from "next/link";

export default async function RepositoriesPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const username = session.user?.name;

  const repositories = await getRepositories(username!);

  return (
    <div className="flex">
      <AppSidebar />

      <main className="flex-1 p-8">
        <h1 className="mb-8 text-4xl font-bold">
          Your Repositories
        </h1>

        <div className="space-y-4">
          {repositories.map((repo: any) => (
            <div
              key={repo.id}
              className="rounded-lg border p-5 shadow-sm"
            >
              <Link href={`/repositories/${repo.name}`}>
                <h2 className="text-xl font-semibold hover:text-blue-600 cursor-pointer">
                  {repo.name}
                </h2>
              </Link>

              <p className="text-gray-500">
                {repo.description || "No description"}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}