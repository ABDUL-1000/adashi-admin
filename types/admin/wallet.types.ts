import type { PersonSummary } from "./common.types";

export interface AdminWallet {
  id?: string;
  _id?: string;
  balance?: number;
  owner?: PersonSummary;
  user?: PersonSummary;
  createdAt?: string;
  updatedAt?: string;
}
