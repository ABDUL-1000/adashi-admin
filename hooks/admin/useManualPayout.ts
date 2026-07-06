"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { payoutsService } from "@/services/admin/payouts.service";

export function useManualPayout(payoutId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => payoutsService.manualPayout(payoutId),
    onSuccess: async () => {
      toast.success("Payout marked manual");
      await queryClient.invalidateQueries({ queryKey: ["admin", "payouts"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
