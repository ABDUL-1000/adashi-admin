"use client";

import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPageLoader } from "@/components/admin/shared/AdminPageLoader";
import { AdminTablePagination } from "@/components/admin/shared/AdminTablePagination";
import { FilterSelect } from "@/components/admin/shared/Filters";
import { AdminTransactionsTable, ExportTransactionsButton } from "@/components/admin/transactions/AdminTransactionsTable";
import { useAdminTransactions } from "@/hooks/admin/useAdminTransactions";
import { extractList, extractPagination } from "@/types/admin/common.types";

export default function AdminTransactionsPage() {
  const [page, setPage] = useState(1);
  const [type, setType] = useState("All");
  const query = useAdminTransactions({ page, limit: 10, type: type === "All" ? undefined : type });
  return (
    <>
      <AdminPageHeader title="Transactions" description="Filter, export, and flag suspicious transactions." action={<ExportTransactionsButton />} />
      <FilterSelect value={type} options={["All", "CONTRIBUTION", "PAYOUT", "FUNDING", "WITHDRAWAL"]} onChange={(value) => { setType(value); setPage(1); }} />
      {query.isLoading ? <AdminPageLoader /> : <AdminTransactionsTable transactions={extractList(query.data)} />}
      <AdminTablePagination pagination={extractPagination(query.data)} onPageChange={setPage} />
    </>
  );
}
