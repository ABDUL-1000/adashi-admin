"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { groupsService } from "@/services/admin/groups.service";

export function useDeleteGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (groupId: string) => groupsService.deleteGroup(groupId),
    onSuccess: async () => {
      toast.success("Group deleted");
      await queryClient.invalidateQueries({ queryKey: ["admin", "groups"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
