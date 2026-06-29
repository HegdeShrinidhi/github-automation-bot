import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import DashboardCards from "@/components/dashboard/dashboard-cards";
import { getRepositories } from "@/lib/github";


export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const username = session.user?.name;

  const repositories = await getRepositories(username!);

  return (
    <div className="flex">
      <AppSidebar />

      <main className="flex-1 p-8 space-y-6">
        <h1 className="text-4xl font-bold">
          Welcome, {session.user?.name}
        </h1>

        <p className="text-muted-foreground">
          GitHub Automation Dashboard
        </p>

        <DashboardCards
          repositoryCount={repositories.length}
        />
        
      </main>
    </div>
  );
}