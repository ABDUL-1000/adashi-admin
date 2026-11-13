import { adminApi, unwrap } from "./apiClient";
import type { AdminDashboard } from "@/types/admin/dashboard.types";
import type { AdminUserType } from "@/types/admin/user.types";

/** Shape returned by GET /admin/dashboard (grouped by section). */
interface DashboardSummaryResponse {
  overview?: {
    totalUsers?: number;
    newUsersThisMonth?: number;
    suspendedUsers?: number;
    totalGroups?: number;
    activeGroups?: number;
    pendingGroups?: number;
  };
  wallet?: { totalBalance?: number };
  payments?: { totalContributions?: number };
  payouts?: { totalPayouts?: number; pending?: number };
  revenue?: {
    total?: number;
    today?: number;
    thisWeek?: number;
    thisMonth?: number;
    thisYear?: number;
    walletFees?: number;
    payoutFees?: number;
    subscriptions?: number;
    otherFees?: number;
  };
  userTypes?: Partial<Record<AdminUserType, number>>;
  pss?: { plans?: number; activePlans?: number; totalValueKobo?: number; totalPaidKobo?: number };
}

/** Flatten the grouped response into the fields the dashboard pages read. */
const toDashboard = (d: DashboardSummaryResponse): AdminDashboard => ({
  totalUsers: d.overview?.totalUsers,
  newUsers: d.overview?.newUsersThisMonth,
  suspendedUsers: d.overview?.suspendedUsers,
  totalGroups: d.overview?.totalGroups,
  activeGroups: d.overview?.activeGroups,
  pendingGroups: d.overview?.pendingGroups,
  totalWalletBalance: d.wallet?.totalBalance,
  totalContributions: d.payments?.totalContributions,
  totalPayouts: d.payouts?.totalPayouts,
  pendingPayouts: d.payouts?.pending,
  totalRevenue: d.revenue?.total,
  revenueToday: d.revenue?.today,
  revenueThisWeek: d.revenue?.thisWeek,
  revenueThisMonth: d.revenue?.thisMonth,
  revenueThisYear: d.revenue?.thisYear,
  walletFundingRevenue: d.revenue?.walletFees,
  payoutFeeRevenue: d.revenue?.payoutFees,
  subscriptionRevenue: d.revenue?.subscriptions,
  otherRevenue: d.revenue?.otherFees,
  userTypes: d.userTypes,
  pssPlans: d.pss?.plans,
  pssActivePlans: d.pss?.activePlans,
  pssTotalValueKobo: d.pss?.totalValueKobo,
  pssTotalPaidKobo: d.pss?.totalPaidKobo,
});

export const dashboardService = {
  getDashboard: async () =>
    toDashboard(await unwrap<DashboardSummaryResponse>(adminApi.get("dashboard"))),
};
