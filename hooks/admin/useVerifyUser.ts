"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { usersService } from "@/services/admin/users.service";

export function useVerifyUser(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => usersService.verifyUser(userId),
    onSuccess: async () => {
      toast.success("User verified");
      await queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      await queryClient.invalidateQueries({ queryKey: adminQueryKeys.user(userId) });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
