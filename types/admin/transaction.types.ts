import type { PersonSummary } from "./common.types";

export type AdminTransactionType =
  | "CONTRIBUTION"
  | "PAYOUT"
  | "FUNDING"
  | "WITHDRAWAL"
  | string;

export interface AdminTransaction {
  id?: string;
  _id?: string;
  reference?: string;
  type?: AdminTransactionType;
  amount?: number;
  status?: string;
  isFlagged?: boolean;
  user?: PersonSummary;
  createdAt?: string;
  updatedAt?: string;
}

export interface FlagTransactionPayload {
  isFlagged: boolean;
}
