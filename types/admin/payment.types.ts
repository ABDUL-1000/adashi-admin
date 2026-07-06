import type { PersonSummary } from "./common.types";

export type AdminPaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | string;

export interface AdminPayment {
  id?: string;
  _id?: string;
  reference?: string;
  amount?: number;
  status?: AdminPaymentStatus;
  user?: PersonSummary;
  provider?: string;
  createdAt?: string;
  updatedAt?: string;
}
