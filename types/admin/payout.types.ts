import type { PersonSummary } from "./common.types";

export interface AdminPayout {
  id?: string;
  _id?: string;
  reference?: string;
  amount?: number;
  status?: string;
  isDisbursed?: boolean;
  user?: PersonSummary;
  createdAt?: string;
  updatedAt?: string;
}
