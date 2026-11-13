"use client";

import { Landmark, PiggyBank, ShoppingBag, Store, TrendingUp, UserRound, Users, Wallet, Workflow } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPageLoader } from "@/components/admin/shared/AdminPageLoader";
import { AdminStatCard } from "@/components/admin/shared/AdminStatCard";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import { formatCurrency, formatKobo } from "@/lib/formatCurrency";

export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useAdminDashboard();
  if (isLoading) return <AdminPageLoader />;
  return (
    <>
      <AdminPageHeader title="Dashboard" description="Live admin KPIs from the backend." />
      {isError ? <div className="rounded-lg border border-red-200 bg-white p-4 text-sm text-red-600">Unable to load dashboard.</div> : null}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Total Users" value={data?.totalUsers ?? 0} icon={Users} trend={`New this month: ${data?.newUsers ?? 0}`} />
        <AdminStatCard label="Organisers" value={data?.userTypes?.ORGANISER ?? 0} icon={Workflow} trend={`Group members: ${data?.userTypes?.MEMBER ?? 0}`} />
        <AdminStatCard label="Pay Small Small Shop Owners" value={data?.userTypes?.SHOP_OWNER ?? 0} icon={Store} trend={`Customers with an account: ${data?.userTypes?.PSS_CUSTOMER ?? 0}`} />
        <AdminStatCard label="Signed Up, No Activity" value={data?.userTypes?.SIGNED_UP_ONLY ?? 0} icon={UserRound} trend={`Deleted accounts: ${data?.userTypes?.DELETED ?? 0}`} />
        <AdminStatCard label="Pay Small Small Plans" value={data?.pssPlans ?? 0} icon={ShoppingBag} trend={`Active: ${data?.pssActivePlans ?? 0}`} />
        <AdminStatCard label="PSS Recorded as Paid" value={formatKobo(data?.pssTotalPaidKobo)} icon={ShoppingBag} trend={`of ${formatKobo(data?.pssTotalValueKobo)} in live plans`} />
        <AdminStatCard label="Suspended Users" value={data?.suspendedUsers ?? 0} icon={Users} />
        <AdminStatCard label="Active Groups" value={data?.activeGroups ?? 0} icon={Workflow} trend={`Pending: ${data?.pendingGroups ?? 0}`} />
        <AdminStatCard label="Total Wallet Balance" value={formatCurrency(data?.totalWalletBalance)} icon={Wallet} />
        <AdminStatCard label="Total Contributions" value={formatCurrency(data?.totalContributions)} icon={TrendingUp} />
        <AdminStatCard label="Total Payouts" value={formatCurrency(data?.totalPayouts)} icon={Landmark} trend={`Pending: ${data?.pendingPayouts ?? 0}`} />
        <AdminStatCard label="Total Revenue" value={formatCurrency(data?.totalRevenue)} icon={PiggyBank} />
        <AdminStatCard label="Revenue Today" value={formatCurrency(data?.revenueToday)} icon={PiggyBank} />
        <AdminStatCard label="Revenue This Week" value={formatCurrency(data?.revenueThisWeek)} icon={PiggyBank} />
        <AdminStatCard label="Revenue This Month" value={formatCurrency(data?.revenueThisMonth)} icon={PiggyBank} />
        <AdminStatCard label="Revenue This Year" value={formatCurrency(data?.revenueThisYear)} icon={PiggyBank} />
        <AdminStatCard label="Wallet Funding Revenue" value={formatCurrency(data?.walletFundingRevenue)} icon={Wallet} />
        <AdminStatCard label="Payout Fee Revenue" value={formatCurrency(data?.payoutFeeRevenue ?? data?.payoutRevenue)} icon={Landmark} />
        <AdminStatCard label="Subscription Revenue" value={formatCurrency(data?.subscriptionRevenue)} icon={PiggyBank} />
        <AdminStatCard label="Other Revenue" value={formatCurrency(data?.otherRevenue)} icon={PiggyBank} />
      </div>
    </>
  );
}
