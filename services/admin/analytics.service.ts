import { adminApi, unwrap } from "./apiClient";
import type { AdminAnalytics } from "@/types/admin/analytics.types";

export const analyticsService = {
  getAnalytics: () => unwrap<AdminAnalytics>(adminApi.get("/api/v1/admin/analytics")),
};
