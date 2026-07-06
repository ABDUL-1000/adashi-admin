"use client";

import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { walletsService } from "@/services/admin/wallets.service";
import type { ListParams } from "@/types/admin/common.types";

export function useAdminWallets(params: ListParams) {
  return useQuery({
    queryKey: adminQueryKeys.wallets(params),
    queryFn: () => walletsService.getWallets(params),
  });
}
