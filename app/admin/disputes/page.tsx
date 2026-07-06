"use client";

import { useState } from "react";
import { AdminDisputesTable } from "@/components/admin/disputes/AdminDisputesTable";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPageLoader } from "@/components/admin/shared/AdminPageLoader";
import { AdminTablePagination } from "@/components/admin/shared/AdminTablePagination";
import { FilterSelect } from "@/components/admin/shared/Filters";
import { useAdminDisputes } from "@/hooks/admin/useAdminDisputes";
import { extractList, extractPagination } from "@/types/admin/common.types";

export default function AdminDisputesPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("All");
  const query = useAdminDisputes({ page, limit: 10, status: status === "All" ? undefined : status });
  return (
    <>
      <AdminPageHeader title="Disputes" description="Review open and resolved disputes with admin notes." />
      <FilterSelect value={status} options={["All", "OPEN", "RESOLVED"]} onChange={(value) => { setStatus(value); setPage(1); }} />
      {query.isLoading ? <AdminPageLoader /> : <AdminDisputesTable disputes={extractList(query.data)} />}
      <AdminTablePagination pagination={extractPagination(query.data)} onPageChange={setPage} />
    </>
  );
}
