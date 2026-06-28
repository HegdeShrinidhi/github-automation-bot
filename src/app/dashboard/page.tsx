import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { StatsCard } from "@/components/dashboard/stats-card";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

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

        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard title="Events" value="0" />
          <StatsCard title="Repositories" value="0" />
          <StatsCard title="Rules" value="0" />
        </div>
      </main>
    </div>
  );
}