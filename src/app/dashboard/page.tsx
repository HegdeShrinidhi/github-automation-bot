import { AppSidebar } from "@/components/layout/app-sidebar";
import { StatsCard } from "@/components/dashboard/stats-card";

export default function DashboardPage() {
  return (
    <div className="flex">
      <AppSidebar />

      <main className="flex-1 p-8 space-y-6">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard title="Events" value="0" />
          <StatsCard title="Repositories" value="0" />
          <StatsCard title="Rules" value="0" />
        </div>
      </main>
    </div>
  );
}