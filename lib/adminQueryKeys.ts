import type { ListParams } from "@/types/admin/common.types";

export const adminQueryKeys = {
  dashboard: ["admin", "dashboard"] as const,
  users: (params: ListParams) => ["admin", "users", params] as const,
  user: (id: string) => ["admin", "users", id] as const,
  groups: (params: ListParams) => ["admin", "groups", params] as const,
  group: (id: string) => ["admin", "groups", id] as const,
  wallets: (params: ListParams) => ["admin", "wallets", params] as const,
  transactions: (params: ListParams) => ["admin", "transactions", params] as const,
  payments: (params: ListParams) => ["admin", "payments", params] as const,
  payouts: (params: ListParams) => ["admin", "payouts", params] as const,
  reminders: ["admin", "reminders"] as const,
  disputes: (params: ListParams) => ["admin", "disputes", params] as const,
  dispute: (id: string) => ["admin", "disputes", id] as const,
  analytics: ["admin", "analytics"] as const,
  settings: ["admin", "settings"] as const,
};
