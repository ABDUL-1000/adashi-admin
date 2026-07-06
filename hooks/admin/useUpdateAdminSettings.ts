"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { settingsService } from "@/services/admin/settings.service";
import type { AdminSettings } from "@/types/admin/settings.types";

export function useUpdateAdminSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AdminSettings) => settingsService.updateSettings(payload),
    onSuccess: async () => {
      toast.success("Settings updated");
      await queryClient.invalidateQueries({ queryKey: adminQueryKeys.settings });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
