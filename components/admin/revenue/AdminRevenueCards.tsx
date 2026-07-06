import { Landmark, PiggyBank, ReceiptText, Wallet } from "lucide-react";
import { AdminStatCard } from "@/components/admin/shared/AdminStatCard";
import type { AdminDashboard } from "@/types/admin/dashboard.types";
import { formatCurrency } from "@/lib/formatCurrency";

export function AdminRevenueCards({ dashboard }: { dashboard?: AdminDashboard }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <AdminStatCard label="Total revenue" value={formatCurrency(dashboard?.totalRevenue)} icon={PiggyBank} />
      <AdminStatCard label="Wallet funding revenue" value={formatCurrency(dashboard?.walletFundingRevenue)} icon={Wallet} />
      <AdminStatCard label="Payout fee revenue" value={formatCurrency(dashboard?.payoutFeeRevenue ?? dashboard?.payoutRevenue)} icon={Landmark} />
      <AdminStatCard label="Subscription revenue" value={formatCurrency(dashboard?.subscriptionRevenue)} icon={ReceiptText} />
    </div>
  );
}
