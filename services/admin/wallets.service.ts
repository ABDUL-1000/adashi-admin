import { adminApi, unwrap } from "./apiClient";
import type { ListParams, PaginatedData } from "@/types/admin/common.types";
import type { AdminWallet } from "@/types/admin/wallet.types";

export const walletsService = {
  getWallets: (params: ListParams) =>
    unwrap<PaginatedData<AdminWallet>>(adminApi.get("wallets", { params })),
};
