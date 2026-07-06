"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { usersService } from "@/services/admin/users.service";
import type { SuspendUserPayload } from "@/types/admin/user.types";

export function useSuspendUser(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SuspendUserPayload) => usersService.suspendUser(userId, payload),
    onSuccess: async () => {
      toast.success("User status updated");
      await queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      await queryClient.invalidateQueries({ queryKey: adminQueryKeys.user(userId) });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
