import { adminApi, unwrap } from "./apiClient";
import type { AdminDashboard } from "@/types/admin/dashboard.types";

export const dashboardService = {
  getDashboard: () => unwrap<AdminDashboard>(adminApi.get("dashboard")),
};
