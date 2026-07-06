"use client";

import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { disputesService } from "@/services/admin/disputes.service";
import type { ListParams } from "@/types/admin/common.types";

export function useAdminDisputes(params: ListParams) {
  return useQuery({
    queryKey: adminQueryKeys.disputes(params),
    queryFn: () => disputesService.getDisputes(params),
  });
}
