"use client";

import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { remindersService } from "@/services/admin/reminders.service";

export function useAdminReminders() {
  return useQuery({
    queryKey: adminQueryKeys.reminders,
    queryFn: remindersService.getReminders,
  });
}
