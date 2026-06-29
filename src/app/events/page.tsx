import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import EventList from "@/components/events/event-list";

export default async function EventsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex">
      <AppSidebar />

      <main className="flex-1 p-8">
        <h1 className="mb-8 text-4xl font-bold">
          Event Logs
        </h1>

        <EventList />
      </main>
    </div>
  );
}