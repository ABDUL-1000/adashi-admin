import { adminApi, unwrap } from "./apiClient";
import type { ListParams, PaginatedData } from "@/types/admin/common.types";
import type {
  AdminTransaction,
  FlagTransactionPayload,
} from "@/types/admin/transaction.types";

export const transactionsService = {
  getTransactions: (params: ListParams) =>
    unwrap<PaginatedData<AdminTransaction>>(
      adminApi.get("transactions", { params }),
    ),
  flagTransaction: (transactionId: string, payload: FlagTransactionPayload) =>
    unwrap<AdminTransaction>(
      adminApi.post(`transactions/${transactionId}/flag`, payload),
    ),
  exportTransactions: async () => {
    const response = await adminApi.get<Blob>("transactions/export", {
      responseType: "blob",
    });
    return response.data;
  },
};
