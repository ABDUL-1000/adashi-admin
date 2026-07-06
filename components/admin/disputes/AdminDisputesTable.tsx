"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminConfirmDialog } from "@/components/admin/shared/AdminConfirmDialog";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import { useUpdateDispute } from "@/hooks/admin/useUpdateDispute";
import { entityId } from "@/types/admin/common.types";
import type { AdminDispute } from "@/types/admin/dispute.types";
import { formatDate } from "@/lib/formatDate";

function DisputeActions({ dispute }: { dispute: AdminDispute }) {
  const id = entityId(dispute);
  const [notes, setNotes] = useState(dispute.adminNotes ?? "");
  const update = useUpdateDispute(id);
  return (
    <div className="flex flex-wrap gap-2">
      <Link className={buttonVariants({ variant: "outline" })} href={`/admin/disputes/${id}`}>View</Link>
      <Input value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Admin notes" className="w-40 bg-white" />
      <AdminConfirmDialog title="Update dispute?" description="This updates dispute status and admin notes." confirmLabel="Resolve" pending={update.isPending} onConfirm={() => update.mutate({ status: "RESOLVED", adminNotes: notes })}><Button className="bg-[#9244D4] hover:bg-[#7d35bd]">Resolve</Button></AdminConfirmDialog>
    </div>
  );
}

export function AdminDisputesTable({ disputes }: { disputes: AdminDispute[] }) {
  if (!disputes.length) return <AdminEmptyState title="No disputes found" />;
  return (
    <Card className="rounded-lg border border-[#E2E4E9] bg-white p-0 shadow-none">
      <div className="hidden md:block"><Table><TableHeader><TableRow><TableHead>Dispute</TableHead><TableHead>User</TableHead><TableHead>Status</TableHead><TableHead>Notes</TableHead><TableHead>Created</TableHead><TableHead /></TableRow></TableHeader><TableBody>{disputes.map((dispute) => <TableRow key={entityId(dispute)}><TableCell className="font-medium">{dispute.title ?? dispute.reason ?? entityId(dispute)}</TableCell><TableCell>{dispute.user?.name ?? dispute.user?.email ?? "Not available"}</TableCell><TableCell><AdminStatusBadge status={dispute.status} /></TableCell><TableCell className="max-w-sm truncate">{dispute.adminNotes ?? "No notes"}</TableCell><TableCell>{formatDate(dispute.createdAt)}</TableCell><TableCell><DisputeActions dispute={dispute} /></TableCell></TableRow>)}</TableBody></Table></div>
      <div className="grid gap-3 p-3 md:hidden">{disputes.map((dispute) => <div key={entityId(dispute)} className="rounded-lg border border-[#E2E4E9] p-3"><p className="font-medium">{dispute.title ?? dispute.reason ?? "Dispute"}</p><p className="text-sm text-[#828587]">{dispute.status ?? "Unknown"}</p><div className="mt-3"><DisputeActions dispute={dispute} /></div></div>)}</div>
    </Card>
  );
}
