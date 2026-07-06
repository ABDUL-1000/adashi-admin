"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminQueryKeys } from "@/lib/adminQueryKeys";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { groupsService } from "@/services/admin/groups.service";
import type { UpdateGroupStatusPayload } from "@/types/admin/group.types";

export function useUpdateGroupStatus(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateGroupStatusPayload) =>
      groupsService.updateGroupStatus(groupId, payload),
    onSuccess: async () => {
      toast.success("Group updated");
      await queryClient.invalidateQueries({ queryKey: ["admin", "groups"] });
      await queryClient.invalidateQueries({ queryKey: adminQueryKeys.group(groupId) });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
