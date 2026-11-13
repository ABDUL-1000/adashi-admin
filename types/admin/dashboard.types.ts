import type { AdminUserType } from "./user.types";

export interface AdminDashboard {
  totalUsers?: number;
  newUsers?: number;
  suspendedUsers?: number;
  totalGroups?: number;
  activeGroups?: number;
  pendingGroups?: number;
  totalWalletBalance?: number;
  totalContributions?: number;
  totalPayouts?: number;
  pendingPayouts?: number;
  totalRevenue?: number;
  revenueToday?: number;
  revenueThisWeek?: number;
  revenueThisMonth?: number;
  revenueThisYear?: number;
  walletFundingRevenue?: number;
  payoutFeeRevenue?: number;
  payoutRevenue?: number;
  subscriptionRevenue?: number;
  otherRevenue?: number;
  userTypes?: Partial<Record<AdminUserType, number>>;
  pssPlans?: number;
  pssActivePlans?: number;
  pssTotalValueKobo?: number;
  pssTotalPaidKobo?: number;
}
