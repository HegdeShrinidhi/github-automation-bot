export default function AISummariesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        🧠 AI Summaries
      </h1>

      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold">
          Login page crashes
        </h2>

        <p className="mt-4 text-muted-foreground">
          Authentication failure after login.
          Session handling should be investigated.
        </p>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold">
          Database connection fails
        </h2>

        <p className="mt-4 text-muted-foreground">
          Database connectivity issue after deployment.
          Check credentials and environment variables.
        </p>
      </div>
    </div>
  );
}