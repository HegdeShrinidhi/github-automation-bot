import { supabase } from "@/lib/supabase";

export default async function EventList() {
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-4">
      {events?.map((event) => (
        <div
          key={event.id}
          className="rounded-lg border p-5 shadow-sm"
        >
          <h3 className="text-lg font-semibold">
            {event.event}
          </h3>

          <p className="text-gray-600">
            Repository: {event.repository}
          </p>

          <span className="mt-2 inline-block rounded bg-green-100 px-3 py-1 text-sm text-green-700">
            {event.status}
          </span>
        </div>
      ))}
    </div>
  );
}