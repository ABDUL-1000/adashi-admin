import { adminApi, unwrap } from "./apiClient";
import type { ListParams, PaginatedData } from "@/types/admin/common.types";
import type { AdminPayout } from "@/types/admin/payout.types";

export const payoutsService = {
  getPayouts: (params: ListParams) =>
    unwrap<PaginatedData<AdminPayout>>(adminApi.get("payouts", { params })),
  approvePayout: (payoutId: string) =>
    unwrap<AdminPayout>(adminApi.post(`payouts/${payoutId}/approve`)),
  retryPayout: (payoutId: string) =>
    unwrap<AdminPayout>(adminApi.post(`payouts/${payoutId}/retry`)),
  manualPayout: (payoutId: string) =>
    unwrap<AdminPayout>(adminApi.post(`payouts/${payoutId}/manual`)),
};
