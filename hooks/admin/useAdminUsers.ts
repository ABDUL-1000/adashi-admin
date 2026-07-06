"use client";

import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { usersService } from "@/services/admin/users.service";
import type { ListParams } from "@/types/admin/common.types";

export function useAdminUsers(params: ListParams) {
  return useQuery({
    queryKey: adminQueryKeys.users(params),
    queryFn: () => usersService.getUsers(params),
  });
}
