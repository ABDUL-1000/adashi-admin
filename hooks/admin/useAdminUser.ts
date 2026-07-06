"use client";

import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { usersService } from "@/services/admin/users.service";

export function useAdminUser(userId: string) {
  return useQuery({
    queryKey: adminQueryKeys.user(userId),
    queryFn: () => usersService.getUser(userId),
    enabled: Boolean(userId),
  });
}
