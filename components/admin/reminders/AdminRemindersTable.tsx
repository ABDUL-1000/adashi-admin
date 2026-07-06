import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import { entityId } from "@/types/admin/common.types";
import type { AdminReminder } from "@/types/admin/reminder.types";
import { formatDate } from "@/lib/formatDate";

export function AdminRemindersTable({ reminders }: { reminders: AdminReminder[] }) {
  if (!reminders.length) return <AdminEmptyState title="No reminder logs found" />;
  return (
    <Card className="rounded-lg border border-[#E2E4E9] bg-white p-0 shadow-none">
      <div className="hidden md:block"><Table><TableHeader><TableRow><TableHead>Recipient</TableHead><TableHead>Channel</TableHead><TableHead>Status</TableHead><TableHead>Message</TableHead><TableHead>Created</TableHead></TableRow></TableHeader><TableBody>{reminders.map((reminder) => <TableRow key={entityId(reminder)}><TableCell>{reminder.recipient ?? "Not available"}</TableCell><TableCell>{reminder.channel ?? "Unknown"}</TableCell><TableCell><AdminStatusBadge status={reminder.status} /></TableCell><TableCell className="max-w-sm truncate">{reminder.message ?? "Not available"}</TableCell><TableCell>{formatDate(reminder.createdAt)}</TableCell></TableRow>)}</TableBody></Table></div>
      <div className="grid gap-3 p-3 md:hidden">{reminders.map((reminder) => <div key={entityId(reminder)} className="rounded-lg border border-[#E2E4E9] p-3"><p className="font-medium">{reminder.recipient ?? "Recipient"}</p><p className="text-sm text-[#828587]">{reminder.channel ?? "Unknown"} - {reminder.status ?? "Unknown"}</p></div>)}</div>
    </Card>
  );
}
