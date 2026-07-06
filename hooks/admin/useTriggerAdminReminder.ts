"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { remindersService } from "@/services/admin/reminders.service";

export function useTriggerAdminReminder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: remindersService.triggerReminder,
    onSuccess: async () => {
      toast.success("Reminder triggered");
      await queryClient.invalidateQueries({ queryKey: adminQueryKeys.reminders });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
