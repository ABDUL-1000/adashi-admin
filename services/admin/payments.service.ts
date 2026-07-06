import { adminApi, unwrap } from "./apiClient";
import type { ListParams, PaginatedData } from "@/types/admin/common.types";
import type { AdminPayment } from "@/types/admin/payment.types";

export const paymentsService = {
  getPayments: (params: ListParams) =>
    unwrap<PaginatedData<AdminPayment>>(adminApi.get("payments", { params })),
};
