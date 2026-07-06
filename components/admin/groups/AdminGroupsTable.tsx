"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminConfirmDialog } from "@/components/admin/shared/AdminConfirmDialog";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import { useDeleteGroup } from "@/hooks/admin/useDeleteGroup";
import { useUpdateGroupStatus } from "@/hooks/admin/useUpdateGroupStatus";
import { entityId } from "@/types/admin/common.types";
import type { AdminGroup } from "@/types/admin/group.types";
import { formatDate } from "@/lib/formatDate";

function GroupActions({ group }: { group: AdminGroup }) {
  const id = entityId(group);
  const update = useUpdateGroupStatus(id);
  const remove = useDeleteGroup();
  return (
    <div className="flex flex-wrap gap-2">
      <Link className={buttonVariants({ variant: "outline" })} href={`/admin/groups/${id}`}>View</Link>
      <AdminConfirmDialog title="Activate group?" description="This updates the group status to ACTIVE." confirmLabel="Activate" pending={update.isPending} onConfirm={() => update.mutate({ status: "ACTIVE" })}><Button variant="outline">Activate</Button></AdminConfirmDialog>
      <AdminConfirmDialog title="Flag group?" description="This marks the group for admin review." confirmLabel="Flag" pending={update.isPending} onConfirm={() => update.mutate({ isFlagged: !group.isFlagged })}><Button variant="outline">{group.isFlagged ? "Unflag" : "Flag"}</Button></AdminConfirmDialog>
      <AdminConfirmDialog title="Suspend group?" description="This updates the group suspension state." confirmLabel={group.isSuspended ? "Unsuspend" : "Suspend"} pending={update.isPending} onConfirm={() => update.mutate({ isSuspended: !group.isSuspended })}><Button variant="outline">{group.isSuspended ? "Unsuspend" : "Suspend"}</Button></AdminConfirmDialog>
      <AdminConfirmDialog title="Delete group?" description="This action cannot be undone." confirmLabel="Delete" pending={remove.isPending} onConfirm={() => remove.mutate(id)}><Button variant="destructive">Delete</Button></AdminConfirmDialog>
    </div>
  );
}

export function AdminGroupsTable({ groups }: { groups: AdminGroup[] }) {
  if (!groups.length) return <AdminEmptyState title="No groups found" />;
  return (
    <Card className="rounded-lg border border-[#E2E4E9] bg-white p-0 shadow-none">
      <div className="hidden md:block"><Table><TableHeader><TableRow><TableHead>Group</TableHead><TableHead>Organizer</TableHead><TableHead>Status</TableHead><TableHead>Flags</TableHead><TableHead>Created</TableHead><TableHead /></TableRow></TableHeader><TableBody>{groups.map((group) => <TableRow key={entityId(group)}><TableCell className="font-medium">{group.name ?? group.title ?? "Unnamed group"}</TableCell><TableCell>{group.organizer?.name ?? group.organizer?.email ?? "Not available"}</TableCell><TableCell><AdminStatusBadge status={group.status} /></TableCell><TableCell className="space-x-1"><AdminStatusBadge status={group.isFlagged ? "FLAGGED" : "CLEAR"} /> <AdminStatusBadge status={group.isSuspended ? "SUSPENDED" : "LIVE"} /></TableCell><TableCell>{formatDate(group.createdAt)}</TableCell><TableCell><GroupActions group={group} /></TableCell></TableRow>)}</TableBody></Table></div>
      <div className="grid gap-3 p-3 md:hidden">{groups.map((group) => <div key={entityId(group)} className="rounded-lg border border-[#E2E4E9] p-3"><p className="font-medium">{group.name ?? group.title ?? "Unnamed group"}</p><p className="text-sm text-[#828587]">{group.status ?? "Unknown"}</p><div className="mt-3"><GroupActions group={group} /></div></div>)}</div>
    </Card>
  );
}
