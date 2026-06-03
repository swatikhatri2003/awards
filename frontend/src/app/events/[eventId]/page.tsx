import EventDetailClient from "./EventDetailClient";

// Required for `output: 'export'` (static export) since this is a dynamic route.
// Pre-generate placeholder ids; the client page loads event data by id at runtime.
export function generateStaticParams() {
  return Array.from({ length: 100 }, (_, i) => ({ eventId: String(i + 1) }));
}

export default function EventDetailPage() {
  return <EventDetailClient />;
}
