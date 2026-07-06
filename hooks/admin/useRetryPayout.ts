"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { payoutsService } from "@/services/admin/payouts.service";

export function useRetryPayout(payoutId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => payoutsService.retryPayout(payoutId),
    onSuccess: async () => {
      toast.success("Payout retry started");
      await queryClient.invalidateQueries({ queryKey: ["admin", "payouts"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
