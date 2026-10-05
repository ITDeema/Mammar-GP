import Card from "@/components/Card";

export default function EmptyState({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <Card className="flex flex-col items-center gap-1 border-dashed py-12 text-center">
      <p className="text-sm font-semibold">{title}</p>
      {hint && <p className="text-xs text-navy-900/70">{hint}</p>}
    </Card>
  );
}