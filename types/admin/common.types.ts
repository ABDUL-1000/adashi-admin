export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedData<T> {
  items?: T[];
  users?: T[];
  groups?: T[];
  transactions?: T[];
  payments?: T[];
  payouts?: T[];
  wallets?: T[];
  reminders?: T[];
  disputes?: T[];
  pagination?: PaginationMeta;
}

export interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  type?: string;
  isDisbursed?: boolean;
}

export interface PersonSummary {
  id?: string;
  _id?: string;
  name?: string;
  fullName?: string;
  email?: string;
  phone?: string;
}

export type UnknownRecord = Record<string, unknown>;

export function extractList<T>(data: PaginatedData<T> | T[] | undefined): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return (
    data.items ??
    data.users ??
    data.groups ??
    data.transactions ??
    data.payments ??
    data.payouts ??
    data.wallets ??
    data.reminders ??
    data.disputes ??
    []
  );
}

export function extractPagination<T>(
  data: PaginatedData<T> | T[] | undefined,
): PaginationMeta {
  if (!data || Array.isArray(data) || !data.pagination) {
    return { page: 1, limit: 10, total: 0, totalPages: 1 };
  }
  return data.pagination;
}

export function entityId(entity: { id?: string; _id?: string }): string {
  return entity.id ?? entity._id ?? "";
}
