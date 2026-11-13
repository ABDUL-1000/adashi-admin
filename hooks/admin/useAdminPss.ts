"use client";

import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { pssService } from "@/services/admin/pss.service";
import type { ListParams } from "@/types/admin/common.types";

export function useAdminPssSummary() {
  return useQuery({
    queryKey: adminQueryKeys.pssSummary,
    queryFn: pssService.getSummary,
  });
}

export function useAdminPssPlans(params: ListParams) {
  return useQuery({
    queryKey: adminQueryKeys.pssPlans(params),
    queryFn: () => pssService.getPlans(params),
  });
}

export function useAdminPssCustomers(params: ListParams) {
  return useQuery({
    queryKey: adminQueryKeys.pssCustomers(params),
    queryFn: () => pssService.getCustomers(params),
  });
}
