"use client";

import { useState } from "react";
import { AdminPaymentsTable } from "@/components/admin/payments/AdminPaymentsTable";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPageLoader } from "@/components/admin/shared/AdminPageLoader";
import { AdminTablePagination } from "@/components/admin/shared/AdminTablePagination";
import { FilterSelect, SearchBox } from "@/components/admin/shared/Filters";
import { useAdminPayments } from "@/hooks/admin/useAdminPayments";
import { extractList, extractPagination } from "@/types/admin/common.types";

export default function AdminPaymentsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const query = useAdminPayments({ page, limit: 10, status: status === "All" ? undefined : status, search });
  return (
    <>
      <AdminPageHeader title="Payments" description="Search and filter payment attempts." />
      <div className="grid gap-3 sm:grid-cols-[1fr_180px]"><SearchBox value={search} placeholder="Search payments" onChange={(value) => { setSearch(value); setPage(1); }} /><FilterSelect value={status} options={["All", "PENDING", "SUCCESS", "FAILED"]} onChange={(value) => { setStatus(value); setPage(1); }} /></div>
      {query.isLoading ? <AdminPageLoader /> : <AdminPaymentsTable payments={extractList(query.data)} />}
      <AdminTablePagination pagination={extractPagination(query.data)} onPageChange={setPage} />
    </>
  );
}
