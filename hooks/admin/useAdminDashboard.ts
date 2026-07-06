"use client";

import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { dashboardService } from "@/services/admin/dashboard.service";

export function useAdminDashboard() {
  return useQuery({
    queryKey: adminQueryKeys.dashboard,
    queryFn: dashboardService.getDashboard,
  });
}
