import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default async function SettingsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex">
      <AppSidebar />

      <main className="flex-1 p-8">
        <h1 className="mb-8 text-4xl font-bold">
          Settings
        </h1>

        <div className="max-w-2xl rounded-xl border bg-white p-8 shadow-sm">
          <div className="flex items-center gap-6">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt="Profile"
                className="h-20 w-20 rounded-full"
              />
            )}

            <div>
              <h2 className="text-2xl font-semibold">
                {session.user?.name}
              </h2>

              <p className="text-gray-500">
                {session.user?.email}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold">
                GitHub Account
              </h3>

              <p className="mt-2 text-gray-600">
                Connected Successfully ✅
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold">
                Application
              </h3>

              <p className="mt-2 text-gray-600">
                GitHub Automation Bot v1.0
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}