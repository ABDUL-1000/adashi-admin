"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AdminAnalyticsCharts } from "@/components/admin/analytics/AdminAnalyticsCharts";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPageLoader } from "@/components/admin/shared/AdminPageLoader";
import { useAdminAnalytics } from "@/hooks/admin/useAdminAnalytics";

export default function AdminAnalyticsPage() {
  const query = useAdminAnalytics();
  if (query.isLoading) return <AdminPageLoader />;
  return (
    <>
      <AdminPageHeader title="Analytics" description="Organizer, group, contribution, and transaction trends." />
      <Card className="rounded-lg border border-[#E2E4E9] bg-white shadow-none"><CardContent><p className="text-sm text-[#828587]">Average group size</p><p className="mt-2 text-3xl font-semibold">{query.data?.averageGroupSize ?? "Not available"}</p></CardContent></Card>
      <AdminAnalyticsCharts analytics={query.data} />
    </>
  );
}
