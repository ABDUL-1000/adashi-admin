import { adminApi, unwrap } from "./apiClient";
import type { ListParams, PaginatedData } from "@/types/admin/common.types";
import type { AdminDispute, UpdateDisputePayload } from "@/types/admin/dispute.types";

export const disputesService = {
  getDisputes: (params: ListParams) =>
    unwrap<PaginatedData<AdminDispute>>(adminApi.get("disputes", { params })),
  updateDispute: (disputeId: string, payload: UpdateDisputePayload) =>
    unwrap<AdminDispute>(adminApi.patch(`disputes/${disputeId}`, payload)),
};
