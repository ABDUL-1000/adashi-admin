"use client";

import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { groupsService } from "@/services/admin/groups.service";

export function useAdminGroup(groupId: string) {
  return useQuery({
    queryKey: adminQueryKeys.group(groupId),
    queryFn: () => groupsService.getGroup(groupId),
    enabled: Boolean(groupId),
  });
}
