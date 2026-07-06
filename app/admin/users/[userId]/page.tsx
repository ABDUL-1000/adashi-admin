"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPageLoader } from "@/components/admin/shared/AdminPageLoader";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import { useAdminUser } from "@/hooks/admin/useAdminUser";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";

export default function AdminUserDetailPage() {
  const params = useParams<{ userId: string }>();
  const { data, isLoading } = useAdminUser(params.userId);
  if (isLoading) return <AdminPageLoader />;
  return (
    <>
      <AdminPageHeader title={data?.name ?? data?.fullName ?? "User details"} description={data?.email} />
      <Card className="rounded-lg border border-[#E2E4E9] bg-white shadow-none"><CardHeader><CardTitle>Profile</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2"><Detail label="Phone" value={data?.phone} /><Detail label="Created" value={formatDate(data?.createdAt)} /><Detail label="Wallet balance" value={formatCurrency(data?.walletBalance)} /><Detail label="Suspended" value={<AdminStatusBadge status={Boolean(data?.isSuspended ?? data?.suspended)} />} /><Detail label="Verified" value={<AdminStatusBadge status={Boolean(data?.isVerified ?? data?.verified)} />} /></CardContent></Card>
    </>
  );
}

function Detail({ label, value }: { label: string; value?: React.ReactNode }) {
  return <div><p className="text-xs text-[#828587]">{label}</p><div className="mt-1 text-sm font-medium">{value ?? "Not available"}</div></div>;
}
