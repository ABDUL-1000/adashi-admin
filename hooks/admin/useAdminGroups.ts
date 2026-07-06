"use client";

import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { groupsService } from "@/services/admin/groups.service";
import type { ListParams } from "@/types/admin/common.types";

export function useAdminGroups(params: ListParams) {
  return useQuery({
    queryKey: adminQueryKeys.groups(params),
    queryFn: () => groupsService.getGroups(params),
  });
}
