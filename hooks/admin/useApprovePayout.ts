"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { payoutsService } from "@/services/admin/payouts.service";

export function useApprovePayout(payoutId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => payoutsService.approvePayout(payoutId),
    onSuccess: async () => {
      toast.success("Payout approved");
      await queryClient.invalidateQueries({ queryKey: ["admin", "payouts"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
