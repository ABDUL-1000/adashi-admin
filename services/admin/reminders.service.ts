import { adminApi, unwrap } from "./apiClient";
import type { AdminReminder } from "@/types/admin/reminder.types";

export const remindersService = {
  getReminders: () => unwrap<AdminReminder[]>(adminApi.get("reminders")),
  triggerReminder: () =>
    unwrap<unknown>(adminApi.post("reminders/trigger")),
};
