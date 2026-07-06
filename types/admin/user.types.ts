export interface AdminUser {
  id?: string;
  _id?: string;
  name?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  isSuspended?: boolean;
  suspended?: boolean;
  isVerified?: boolean;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  walletBalance?: number;
}

export interface SuspendUserPayload {
  suspend: boolean;
}
