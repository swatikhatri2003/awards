import VoteClient from "./VoteClient";

// Required for `output: 'export'` (static export) since this is a dynamic route.
// We pre-generate placeholder ids; the actual page logic doesn't read the param.
export function generateStaticParams() {
  return Array.from({ length: 100 }, (_, i) => ({ categoryId: String(i + 1) }));
}

export default function VoteCategoryPage() {
  return <VoteClient />;
}
