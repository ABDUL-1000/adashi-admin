import { adminApi, unwrap } from "./apiClient";
import type { ListParams } from "@/types/admin/common.types";
import type {
  AdminUser,
  AdminUserDetails,
  AdminUsersData,
  SuspendUserPayload,
} from "@/types/admin/user.types";

export const usersService = {
  getUsers: (params: ListParams) =>
    unwrap<AdminUsersData>(adminApi.get("users", { params })),
  getUser: (userId: string) => unwrap<AdminUserDetails>(adminApi.get(`users/${userId}`)),
  suspendUser: (userId: string, payload: SuspendUserPayload) =>
    unwrap<AdminUser>(adminApi.post(`users/${userId}/suspend`, payload)),
  verifyUser: (userId: string) =>
    unwrap<AdminUser>(adminApi.post(`users/${userId}/verify`)),
};
