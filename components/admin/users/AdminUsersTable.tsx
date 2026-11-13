"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminConfirmDialog } from "@/components/admin/shared/AdminConfirmDialog";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import { useSuspendUser } from "@/hooks/admin/useSuspendUser";
import { useVerifyUser } from "@/hooks/admin/useVerifyUser";
import { entityId } from "@/types/admin/common.types";
import type { AdminUser } from "@/types/admin/user.types";
import { formatDate } from "@/lib/formatDate";
import { UserTypeBadges } from "./UserTypeBadges";

function activitySummary(user: AdminUser) {
  const c = user.counts;
  if (!c) return "Not available";
  const parts = [
    c.groupsOrganized ? `Organises ${c.groupsOrganized}` : null,
    c.groupMemberships ? `In ${c.groupMemberships} group(s)` : null,
    c.pssPlansSold ? `Sells ${c.pssPlansSold} PSS plan(s)` : null,
    c.pssPlansBought ? `Buying ${c.pssPlansBought} PSS plan(s)` : null,
  ].filter(Boolean);
  return parts.length ? parts.join(" · ") : "No activity yet";
}

function UserActions({ user }: { user: AdminUser }) {
  const id = entityId(user);
  const suspended = Boolean(user.isSuspended ?? user.suspended);
  const suspend = useSuspendUser(id);
  const verify = useVerifyUser(id);
  return (
    <div className="flex flex-wrap gap-2">
      <Link className={buttonVariants({ variant: "outline" })} href={`/admin/users/${id}`}>View</Link>
      <AdminConfirmDialog
        title={suspended ? "Reactivate user?" : "Suspend user?"}
        description="This will update the user's access status."
        confirmLabel={suspended ? "Reactivate" : "Suspend"}
        pending={suspend.isPending}
        onConfirm={() => suspend.mutate({ suspend: !suspended })}
      >
        <Button variant="outline">{suspended ? "Reactivate" : "Suspend"}</Button>
      </AdminConfirmDialog>
      <AdminConfirmDialog
        title="Verify account?"
        description="This will mark the account as verified."
        confirmLabel="Verify"
        pending={verify.isPending}
        onConfirm={() => verify.mutate()}
      >
        <Button className="bg-[#9244D4] hover:bg-[#7d35bd]">Verify</Button>
      </AdminConfirmDialog>
    </div>
  );
}

export function AdminUsersTable({ users }: { users: AdminUser[] }) {
  if (!users.length) return <AdminEmptyState title="No users found" />;
  return (
    <Card className="rounded-lg border border-[#E2E4E9] bg-white p-0 shadow-none">
      <div className="hidden md:block">
        <Table>
          <TableHeader><TableRow><TableHead>User</TableHead><TableHead>Phone</TableHead><TableHead>Type</TableHead><TableHead>Activity</TableHead><TableHead>Status</TableHead><TableHead>Created</TableHead><TableHead /></TableRow></TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={entityId(user)}>
                <TableCell><div className="font-medium">{user.name ?? user.fullName ?? "Unnamed user"}</div><div className="text-xs text-[#828587]">{user.email ?? "No email"}</div></TableCell>
                <TableCell>{user.phone ?? "Not available"}</TableCell>
                <TableCell><UserTypeBadges types={user.userTypes} /></TableCell>
                <TableCell className="max-w-56 whitespace-normal text-sm text-[#828587]">{activitySummary(user)}</TableCell>
                <TableCell><AdminStatusBadge status={user.deletedAt ? "DELETED" : Boolean(user.isSuspended ?? user.suspended) ? "SUSPENDED" : "ACTIVE"} /></TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell><UserActions user={user} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="grid gap-3 p-3 md:hidden">
        {users.map((user) => (
          <div key={entityId(user)} className="rounded-lg border border-[#E2E4E9] p-3">
            <p className="font-medium">{user.name ?? user.fullName ?? "Unnamed user"}</p>
            <p className="text-sm text-[#828587]">{user.email ?? user.phone ?? "No contact"}</p>
            <div className="mt-2"><UserTypeBadges types={user.userTypes} /></div>
            <p className="mt-2 text-xs text-[#828587]">{activitySummary(user)}</p>
            <div className="mt-3"><UserActions user={user} /></div>
          </div>
        ))}
      </div>
    </Card>
  );
}
