"use client";

import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { settingsService } from "@/services/admin/settings.service";

export function useAdminSettings() {
  return useQuery({
    queryKey: adminQueryKeys.settings,
    queryFn: settingsService.getSettings,
  });
}
