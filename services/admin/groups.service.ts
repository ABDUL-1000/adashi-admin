import { adminApi, unwrap } from "./apiClient";
import type { ListParams, PaginatedData } from "@/types/admin/common.types";
import type { AdminGroup, UpdateGroupStatusPayload } from "@/types/admin/group.types";

export const groupsService = {
  getGroups: (params: ListParams) =>
    unwrap<PaginatedData<AdminGroup>>(adminApi.get("groups", { params })),
  getGroup: (groupId: string) => unwrap<AdminGroup>(adminApi.get(`groups/${groupId}`)),
  updateGroupStatus: (groupId: string, payload: UpdateGroupStatusPayload) =>
    unwrap<AdminGroup>(adminApi.post(`groups/${groupId}/status`, payload)),
  deleteGroup: (groupId: string) =>
    unwrap<unknown>(adminApi.delete(`groups/${groupId}`)),
};
