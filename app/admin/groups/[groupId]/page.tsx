"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPageLoader } from "@/components/admin/shared/AdminPageLoader";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import { useAdminGroup } from "@/hooks/admin/useAdminGroup";
import { formatDate } from "@/lib/formatDate";

export default function AdminGroupDetailPage() {
  const params = useParams<{ groupId: string }>();
  const { data, isLoading } = useAdminGroup(params.groupId);
  if (isLoading) return <AdminPageLoader />;
  return (
    <>
      <AdminPageHeader title={data?.name ?? data?.title ?? "Group details"} description="Members and contribution cycle data are rendered when supplied by the backend." />
      <Card className="rounded-lg border border-[#E2E4E9] bg-white shadow-none"><CardHeader><CardTitle>Overview</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2"><Detail label="Status" value={<AdminStatusBadge status={data?.status} />} /><Detail label="Organizer" value={data?.organizer?.name ?? data?.organizer?.email} /><Detail label="Members" value={data?.members?.length ?? 0} /><Detail label="Contribution cycles" value={data?.contributionCycles?.length ?? 0} /><Detail label="Created" value={formatDate(data?.createdAt)} /></CardContent></Card>
    </>
  );
}

function Detail({ label, value }: { label: string; value?: React.ReactNode }) {
  return <div><p className="text-xs text-[#828587]">{label}</p><div className="mt-1 text-sm font-medium">{value ?? "Not available"}</div></div>;
}
