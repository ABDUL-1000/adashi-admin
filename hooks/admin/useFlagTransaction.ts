"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { transactionsService } from "@/services/admin/transactions.service";
import type { FlagTransactionPayload } from "@/types/admin/transaction.types";

export function useFlagTransaction(transactionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: FlagTransactionPayload) =>
      transactionsService.flagTransaction(transactionId, payload),
    onSuccess: async () => {
      toast.success("Transaction updated");
      await queryClient.invalidateQueries({ queryKey: ["admin", "transactions"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
