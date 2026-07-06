"use client";

import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPageLoader } from "@/components/admin/shared/AdminPageLoader";
import { AdminTablePagination } from "@/components/admin/shared/AdminTablePagination";
import { SearchBox } from "@/components/admin/shared/Filters";
import { AdminUsersTable } from "@/components/admin/users/AdminUsersTable";
import { useAdminUsers } from "@/hooks/admin/useAdminUsers";
import { extractList, extractPagination } from "@/types/admin/common.types";

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const query = useAdminUsers({ page, limit: 10, search });
  const users = extractList(query.data);
  const pagination = extractPagination(query.data);
  return (
    <>
      <AdminPageHeader title="Users" description="Search, verify, suspend, and inspect users." />
      <SearchBox value={search} placeholder="Search name, email, or phone" onChange={(value) => { setSearch(value); setPage(1); }} />
      {query.isLoading ? <AdminPageLoader /> : <AdminUsersTable users={users} />}
      <AdminTablePagination pagination={pagination} onPageChange={setPage} />
    </>
  );
}
