"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminConfirmDialog } from "@/components/admin/shared/AdminConfirmDialog";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import { useApprovePayout } from "@/hooks/admin/useApprovePayout";
import { useManualPayout } from "@/hooks/admin/useManualPayout";
import { useRetryPayout } from "@/hooks/admin/useRetryPayout";
import { entityId } from "@/types/admin/common.types";
import type { AdminPayout } from "@/types/admin/payout.types";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";

function PayoutActions({ payout }: { payout: AdminPayout }) {
  const id = entityId(payout);
  const approve = useApprovePayout(id);
  const retry = useRetryPayout(id);
  const manual = useManualPayout(id);
  return (
    <div className="flex flex-wrap gap-2">
      <AdminConfirmDialog title="Approve payout?" description="This approves the pending payout." confirmLabel="Approve" pending={approve.isPending} onConfirm={() => approve.mutate()}><Button variant="outline">Approve</Button></AdminConfirmDialog>
      <AdminConfirmDialog title="Retry payout?" description="This retries the payout disbursement." confirmLabel="Retry" pending={retry.isPending} onConfirm={() => retry.mutate()}><Button variant="outline">Retry</Button></AdminConfirmDialog>
      <AdminConfirmDialog title="Mark manual payout?" description="This marks the payout as manually handled." confirmLabel="Mark manual" pending={manual.isPending} onConfirm={() => manual.mutate()}><Button className="bg-[#9244D4] hover:bg-[#7d35bd]">Manual</Button></AdminConfirmDialog>
    </div>
  );
}

export function AdminPayoutsTable({ payouts }: { payouts: AdminPayout[] }) {
  if (!payouts.length) return <AdminEmptyState title="No payouts found" />;
  return (
    <Card className="rounded-lg border border-[#E2E4E9] bg-white p-0 shadow-none">
      <div className="hidden md:block"><Table><TableHeader><TableRow><TableHead>Reference</TableHead><TableHead>User</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Disbursed</TableHead><TableHead>Created</TableHead><TableHead /></TableRow></TableHeader><TableBody>{payouts.map((payout) => <TableRow key={entityId(payout)}><TableCell className="font-medium">{payout.reference ?? entityId(payout)}</TableCell><TableCell>{payout.user?.name ?? payout.user?.email ?? "Not available"}</TableCell><TableCell>{formatCurrency(payout.amount)}</TableCell><TableCell><AdminStatusBadge status={payout.status} /></TableCell><TableCell><AdminStatusBadge status={Boolean(payout.isDisbursed)} /></TableCell><TableCell>{formatDate(payout.createdAt)}</TableCell><TableCell><PayoutActions payout={payout} /></TableCell></TableRow>)}</TableBody></Table></div>
      <div className="grid gap-3 p-3 md:hidden">{payouts.map((payout) => <div key={entityId(payout)} className="rounded-lg border border-[#E2E4E9] p-3"><p className="font-medium">{payout.reference ?? entityId(payout)}</p><p>{formatCurrency(payout.amount)}</p><div className="mt-3"><PayoutActions payout={payout} /></div></div>)}</div>
    </Card>
  );
}
