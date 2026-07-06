"use client";

import { AdminAnalyticsCharts } from "@/components/admin/analytics/AdminAnalyticsCharts";
import { AdminRevenueCards } from "@/components/admin/revenue/AdminRevenueCards";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPageLoader } from "@/components/admin/shared/AdminPageLoader";
import { useAdminAnalytics } from "@/hooks/admin/useAdminAnalytics";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";

export default function AdminRevenuePage() {
  const dashboard = useAdminDashboard();
  const analytics = useAdminAnalytics();
  if (dashboard.isLoading || analytics.isLoading) return <AdminPageLoader />;
  return (
    <>
      <AdminPageHeader title="Revenue" description="Revenue totals, sources, and growth indicators." />
      <AdminRevenueCards dashboard={dashboard.data} />
      <AdminAnalyticsCharts analytics={analytics.data} />
    </>
  );
}
