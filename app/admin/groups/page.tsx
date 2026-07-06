"use client";

import { useState } from "react";
import { AdminGroupsTable } from "@/components/admin/groups/AdminGroupsTable";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPageLoader } from "@/components/admin/shared/AdminPageLoader";
import { AdminTablePagination } from "@/components/admin/shared/AdminTablePagination";
import { FilterSelect } from "@/components/admin/shared/Filters";
import { useAdminGroups } from "@/hooks/admin/useAdminGroups";
import { extractList, extractPagination } from "@/types/admin/common.types";

export default function AdminGroupsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("All");
  const query = useAdminGroups({ page, limit: 10, status: status === "All" ? undefined : status });
  return (
    <>
      <AdminPageHeader title="Groups" description="Review group status, members, cycles, and risk flags." />
      <FilterSelect value={status} options={["All", "PENDING", "ACTIVE", "COMPLETED"]} onChange={(value) => { setStatus(value); setPage(1); }} />
      {query.isLoading ? <AdminPageLoader /> : <AdminGroupsTable groups={extractList(query.data)} />}
      <AdminTablePagination pagination={extractPagination(query.data)} onPageChange={setPage} />
    </>
  );
}
