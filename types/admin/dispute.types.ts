import type { PersonSummary } from "./common.types";

export type AdminDisputeStatus = "OPEN" | "RESOLVED" | string;

export interface AdminDispute {
  id?: string;
  _id?: string;
  title?: string;
  reason?: string;
  status?: AdminDisputeStatus;
  adminNotes?: string;
  user?: PersonSummary;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateDisputePayload {
  status: AdminDisputeStatus;
  adminNotes: string;
}
