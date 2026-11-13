import type { PaginatedData } from "./common.types";

export type AdminUserType =
  | "ORGANISER"
  | "MEMBER"
  | "SHOP_OWNER"
  | "PSS_CUSTOMER"
  | "SIGNED_UP_ONLY"
  | "ADMIN"
  | "DELETED";

export const USER_TYPE_LABELS: Record<AdminUserType, string> = {
  ORGANISER: "Organiser",
  MEMBER: "Group member",
  SHOP_OWNER: "Shop owner (PSS)",
  PSS_CUSTOMER: "PSS customer",
  SIGNED_UP_ONLY: "Signed up only",
  ADMIN: "Admin",
  DELETED: "Deleted account",
};

export interface AdminUserCounts {
  groupsOrganized: number;
  groupMemberships: number;
  pssPlansSold: number;
  pssPlansBought: number;
}

export interface AdminUser {
  id?: string;
  _id?: string;
  name?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  role?: "USER" | "ADMIN";
  isSuspended?: boolean;
  suspended?: boolean;
  isVerified?: boolean;
  verified?: boolean;
  deletedAt?: string | null;
  privacyConsentAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  walletBalance?: number | null;
  userTypes?: AdminUserType[];
  counts?: AdminUserCounts;
}

export interface AdminUserPssPlan {
  id: string;
  itemName: string;
  customerName: string;
  shopName?: string;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
  totalPrice: number; // kobo
  paid: number; // kobo
  balance: number; // kobo
  disputedPayments: number;
  createdAt: string;
}

export interface AdminUserDetails extends AdminUser {
  groupsOrganized?: Array<{
    id: string;
    name: string;
    status: string;
    slots: number;
    contributionAmount: string;
    frequency: string;
    createdAt: string;
  }>;
  memberships?: Array<{
    id: string;
    payoutPosition: number;
    joinedAt: string;
    group: { id: string; name: string; status: string; contributionAmount: string; frequency: string };
  }>;
  pssPlansSold?: AdminUserPssPlan[];
  pssPlansBought?: AdminUserPssPlan[];
}

export type AdminUsersData = PaginatedData<AdminUser> & {
  typeCounts?: Record<AdminUserType, number>;
};

export interface SuspendUserPayload {
  suspend: boolean;
}
