"use client";

import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { paymentsService } from "@/services/admin/payments.service";
import type { ListParams } from "@/types/admin/common.types";

export function useAdminPayments(params: ListParams) {
  return useQuery({
    queryKey: adminQueryKeys.payments(params),
    queryFn: () => paymentsService.getPayments(params),
  });
}
