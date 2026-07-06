import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import { entityId } from "@/types/admin/common.types";
import type { AdminPayment } from "@/types/admin/payment.types";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";

export function AdminPaymentsTable({ payments }: { payments: AdminPayment[] }) {
  if (!payments.length) return <AdminEmptyState title="No payments found" />;
  return (
    <Card className="rounded-lg border border-[#E2E4E9] bg-white p-0 shadow-none">
      <div className="hidden md:block"><Table><TableHeader><TableRow><TableHead>Reference</TableHead><TableHead>User</TableHead><TableHead>Provider</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Created</TableHead></TableRow></TableHeader><TableBody>{payments.map((payment) => <TableRow key={entityId(payment)}><TableCell className="font-medium">{payment.reference ?? entityId(payment)}</TableCell><TableCell>{payment.user?.name ?? payment.user?.email ?? "Not available"}</TableCell><TableCell>{payment.provider ?? "Not available"}</TableCell><TableCell>{formatCurrency(payment.amount)}</TableCell><TableCell><AdminStatusBadge status={payment.status} /></TableCell><TableCell>{formatDate(payment.createdAt)}</TableCell></TableRow>)}</TableBody></Table></div>
      <div className="grid gap-3 p-3 md:hidden">{payments.map((payment) => <div key={entityId(payment)} className="rounded-lg border border-[#E2E4E9] p-3"><p className="font-medium">{payment.reference ?? entityId(payment)}</p><p>{formatCurrency(payment.amount)}</p><p className="text-sm text-[#828587]">{payment.status ?? "Unknown"}</p></div>)}</div>
    </Card>
  );
}
