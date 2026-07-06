"use client";

import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { transactionsService } from "@/services/admin/transactions.service";
import type { ListParams } from "@/types/admin/common.types";

export function useAdminTransactions(params: ListParams) {
  return useQuery({
    queryKey: adminQueryKeys.transactions(params),
    queryFn: () => transactionsService.getTransactions(params),
  });
}
