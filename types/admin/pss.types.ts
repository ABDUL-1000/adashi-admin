import type { PaginatedData } from "./common.types";

/** All Pay Small Small money values are in kobo. */
export interface AdminPssSummary {
  plans: { total: number; active: number; completed: number; cancelled: number };
  money: { totalValue: number; totalPaid: number; outstanding: number };
  people: { shopOwners: number; customers: number; customersWithAccount: number };
  payments: { total: number; disputed: number; awaitingConfirmation: number };
}

export interface AdminPssPlan {
  id: string;
  itemName: string;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
  collected: boolean;
  collectionRule: "PAY_BEFORE_COLLECT" | "COLLECT_AFTER_PART_PAYMENT";
  totalPrice: number;
  paid: number;
  balance: number;
  percentPaid: number;
  dueDate: string | null;
  paymentsCount: number;
  disputedPayments: number;
  shopOwner: { id: string; name: string; email: string | null };
  customer: { name: string; phone: string; account: { id: string; name: string } | null };
  createdAt: string;
}

export interface AdminPssCustomer {
  key: string;
  name: string;
  phone: string;
  account: { id: string; name: string } | null;
  plans: number;
  activePlans: number;
  shops: Array<{ id: string; name: string }>;
  totalValue: number;
  totalPaid: number;
  balance: number;
  lastPlanAt: string | null;
}

export type AdminPssPlansData = PaginatedData<AdminPssPlan>;
export type AdminPssCustomersData = PaginatedData<AdminPssCustomer>;
