"use client";

import { useState } from "react";
import { AdminPayoutsTable } from "@/components/admin/payouts/AdminPayoutsTable";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPageLoader } from "@/components/admin/shared/AdminPageLoader";
import { AdminTablePagination } from "@/components/admin/shared/AdminTablePagination";
import { FilterSelect } from "@/components/admin/shared/Filters";
import { useAdminPayouts } from "@/hooks/admin/useAdminPayouts";
import { extractList, extractPagination } from "@/types/admin/common.types";

export default function AdminPayoutsPage() {
  const [page, setPage] = useState(1);
  const [disbursed, setDisbursed] = useState("All");
  const query = useAdminPayouts({ page, limit: 10, isDisbursed: disbursed === "All" ? undefined : disbursed === "Disbursed" });
  return (
    <>
      <AdminPageHeader title="Payouts" description="Approve, retry, or mark manual payouts." />
      <FilterSelect value={disbursed} options={["All", "Disbursed", "Not disbursed"]} onChange={(value) => { setDisbursed(value); setPage(1); }} />
      {query.isLoading ? <AdminPageLoader /> : <AdminPayoutsTable payouts={extractList(query.data)} />}
      <AdminTablePagination pagination={extractPagination(query.data)} onPageChange={setPage} />
    </>
  );
}
