"use client";

import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { analyticsService } from "@/services/admin/analytics.service";

export function useAdminAnalytics() {
  return useQuery({
    queryKey: adminQueryKeys.analytics,
    queryFn: analyticsService.getAnalytics,
  });
}
