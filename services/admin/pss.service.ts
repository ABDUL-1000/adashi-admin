import { adminApi, unwrap } from "./apiClient";
import type { ListParams } from "@/types/admin/common.types";
import type {
  AdminPssCustomersData,
  AdminPssPlansData,
  AdminPssSummary,
} from "@/types/admin/pss.types";

export const pssService = {
  getSummary: () => unwrap<AdminPssSummary>(adminApi.get("pss/summary")),
  getPlans: (params: ListParams) =>
    unwrap<AdminPssPlansData>(adminApi.get("pss/plans", { params })),
  getCustomers: (params: ListParams) =>
    unwrap<AdminPssCustomersData>(adminApi.get("pss/customers", { params })),
};
