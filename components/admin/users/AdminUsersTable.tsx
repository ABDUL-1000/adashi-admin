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
          <TableHeader><TableRow><TableHead>User</TableHead><TableHead>Phone</TableHead><TableHead>Status</TableHead><TableHead>Verified</TableHead><TableHead>Created</TableHead><TableHead /></TableRow></TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={entityId(user)}>
                <TableCell><div className="font-medium">{user.name ?? user.fullName ?? "Unnamed user"}</div><div className="text-xs text-[#828587]">{user.email ?? "No email"}</div></TableCell>
                <TableCell>{user.phone ?? "Not available"}</TableCell>
                <TableCell><AdminStatusBadge status={Boolean(user.isSuspended ?? user.suspended) ? "SUSPENDED" : "ACTIVE"} /></TableCell>
                <TableCell><AdminStatusBadge status={Boolean(user.isVerified ?? user.verified)} /></TableCell>
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
            <div className="mt-3"><UserActions user={user} /></div>
          </div>
        ))}
      </div>
    </Card>
  );
}
