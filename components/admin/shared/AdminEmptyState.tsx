import { Inbox } from "lucide-react";

export function AdminEmptyState({ title = "No records found" }: { title?: string }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed border-[#E2E4E9] bg-white p-8 text-center">
      <Inbox className="size-8 text-[#9244D4]" />
      <p className="mt-3 text-sm font-medium">{title}</p>
      <p className="mt-1 text-xs text-[#828587]">Try adjusting filters or search.</p>
    </div>
  );
}
