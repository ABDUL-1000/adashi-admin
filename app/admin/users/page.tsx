"use client";

import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPageLoader } from "@/components/admin/shared/AdminPageLoader";
import { AdminTablePagination } from "@/components/admin/shared/AdminTablePagination";
import { SearchBox } from "@/components/admin/shared/Filters";
import { AdminUsersTable } from "@/components/admin/users/AdminUsersTable";
import { useAdminUsers } from "@/hooks/admin/useAdminUsers";
import { cn } from "@/lib/utils";
import { extractList, extractPagination } from "@/types/admin/common.types";
import { USER_TYPE_LABELS, type AdminUserType } from "@/types/admin/user.types";

const TYPE_FILTERS: Array<AdminUserType | "ALL"> = [
  "ALL",
  "ORGANISER",
  "MEMBER",
  "SHOP_OWNER",
  "PSS_CUSTOMER",
  "SIGNED_UP_ONLY",
  "ADMIN",
  "DELETED",
];

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<AdminUserType | "ALL">("ALL");
  const query = useAdminUsers({ page, limit: 10, search, type: type === "ALL" ? undefined : type });
  const users = extractList(query.data);
  const pagination = extractPagination(query.data);
  const typeCounts = query.data?.typeCounts;

  return (
    <>
      <AdminPageHeader
        title="Users"
        description="Every account: organisers, group members, Pay Small Small shop owners and customers. One person can be several types."
      />
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by user type">
        {TYPE_FILTERS.map((value) => {
          const active = type === value;
          const count = value === "ALL" ? undefined : typeCounts?.[value];
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => { setType(value); setPage(1); }}
              className={cn(
                "h-9 rounded-lg border px-3 text-sm font-medium transition",
                active ? "border-[#9244D4] bg-[#CFACEC3D] text-[#9244D4]" : "border-[#E2E4E9] bg-white text-zinc-700 hover:border-[#9244D4]/40",
              )}
            >
              {value === "ALL" ? "All active" : USER_TYPE_LABELS[value]}
              {count !== undefined ? <span className="ml-1.5 text-xs text-[#828587]">{count}</span> : null}
            </button>
          );
        })}
      </div>
      <SearchBox value={search} placeholder="Search name, email, or phone" onChange={(value) => { setSearch(value); setPage(1); }} />
      {query.isLoading ? <AdminPageLoader /> : <AdminUsersTable users={users} />}
      <AdminTablePagination pagination={pagination} onPageChange={setPage} />
    </>
  );
}
