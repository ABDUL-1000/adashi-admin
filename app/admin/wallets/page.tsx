"use client";

import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPageLoader } from "@/components/admin/shared/AdminPageLoader";
import { AdminTablePagination } from "@/components/admin/shared/AdminTablePagination";
import { AdminWalletsTable } from "@/components/admin/wallets/AdminWalletsTable";
import { useAdminWallets } from "@/hooks/admin/useAdminWallets";
import { extractList, extractPagination } from "@/types/admin/common.types";

export default function AdminWalletsPage() {
  const [page, setPage] = useState(1);
  const query = useAdminWallets({ page, limit: 10 });
  return (
    <>
      <AdminPageHeader title="Wallets" description="Wallet balances, owners, and timestamps." />
      {query.isLoading ? <AdminPageLoader /> : <AdminWalletsTable wallets={extractList(query.data)} />}
      <AdminTablePagination pagination={extractPagination(query.data)} onPageChange={setPage} />
    </>
  );
}
