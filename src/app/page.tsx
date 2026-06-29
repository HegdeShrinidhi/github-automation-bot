import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-white to-blue-100 px-6">
      <div className="max-w-2xl rounded-3xl bg-white p-12 text-center shadow-2xl">
        <h1 className="mb-4 text-5xl font-bold text-gray-900">
          GitHub Automation Bot
        </h1>

        <p className="mb-8 text-xl text-gray-600">
          AI-Powered GitHub Workflow Automation Platform
        </p>

        <div className="mb-10 grid gap-3 text-gray-700">
          <p>✅ GitHub Authentication</p>
          <p>✅ Repository Monitoring</p>
          <p>✅ Automation Rules</p>
          <p>✅ Event Tracking Dashboard</p>
        </div>

        <form
          action={async () => {
            "use server";

            await signIn("github", {
              redirectTo: "/dashboard",
            });
          }}
        >
          <button
            className="rounded-xl bg-black px-8 py-4 text-lg font-semibold text-white transition hover:bg-gray-800"
          >
            Login with GitHub
          </button>
        </form>
      </div>
    </main>
  );
}