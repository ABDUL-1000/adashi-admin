import { adminApi, unwrap } from "./apiClient";
import type { ListParams, PaginatedData } from "@/types/admin/common.types";
import type { AdminUser, SuspendUserPayload } from "@/types/admin/user.types";

export const usersService = {
  getUsers: (params: ListParams) =>
    unwrap<PaginatedData<AdminUser>>(adminApi.get("users", { params })),
  getUser: (userId: string) => unwrap<AdminUser>(adminApi.get(`users/${userId}`)),
  suspendUser: (userId: string, payload: SuspendUserPayload) =>
    unwrap<AdminUser>(adminApi.post(`users/${userId}/suspend`, payload)),
  verifyUser: (userId: string) =>
    unwrap<AdminUser>(adminApi.post(`users/${userId}/verify`)),
};
