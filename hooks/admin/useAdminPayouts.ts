"use client";

import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { payoutsService } from "@/services/admin/payouts.service";
import type { ListParams } from "@/types/admin/common.types";

export function useAdminPayouts(params: ListParams) {
  return useQuery({
    queryKey: adminQueryKeys.payouts(params),
    queryFn: () => payoutsService.getPayouts(params),
  });
}
