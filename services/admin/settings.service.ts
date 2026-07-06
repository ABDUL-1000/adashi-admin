import { adminApi, unwrap } from "./apiClient";
import type { AdminSettings } from "@/types/admin/settings.types";

export const settingsService = {
  getSettings: () => unwrap<AdminSettings>(adminApi.get("settings")),
  updateSettings: (payload: AdminSettings) =>
    unwrap<AdminSettings>(adminApi.put("settings", payload)),
};
