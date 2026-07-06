import type { PersonSummary } from "./common.types";

export type AdminGroupStatus = "PENDING" | "ACTIVE" | "COMPLETED" | string;

export interface AdminGroup {
  id?: string;
  _id?: string;
  name?: string;
  title?: string;
  status?: AdminGroupStatus;
  isSuspended?: boolean;
  isFlagged?: boolean;
  organizer?: PersonSummary;
  members?: PersonSummary[];
  contributionCycles?: unknown[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateGroupStatusPayload {
  status?: AdminGroupStatus;
  isSuspended?: boolean;
  isFlagged?: boolean;
}
