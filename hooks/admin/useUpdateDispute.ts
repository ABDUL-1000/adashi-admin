"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { disputesService } from "@/services/admin/disputes.service";
import type { UpdateDisputePayload } from "@/types/admin/dispute.types";

export function useUpdateDispute(disputeId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateDisputePayload) =>
      disputesService.updateDispute(disputeId, payload),
    onSuccess: async () => {
      toast.success("Dispute updated");
      await queryClient.invalidateQueries({ queryKey: ["admin", "disputes"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
