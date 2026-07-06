"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminAnalytics, ChartDatum } from "@/types/admin/analytics.types";

function normalize(data?: ChartDatum[]) {
  return (data ?? []).map((item) => ({
    name: item.name ?? item.label ?? item.month ?? "Unknown",
    value: item.value ?? item.count ?? item.amount ?? 0,
  }));
}

function ChartCard({ title, data, type = "bar" }: { title: string; data: ChartDatum[]; type?: "bar" | "line" }) {
  return (
    <Card className="rounded-lg border border-[#E2E4E9] bg-white shadow-none">
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="h-72">
        {data.length ? (
          <ResponsiveContainer width="100%" height="100%">
            {type === "bar" ? (
              <BarChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#9244D4" radius={[6, 6, 0, 0]} /></BarChart>
            ) : (
              <LineChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Line type="monotone" dataKey="value" stroke="#9244D4" strokeWidth={3} /></LineChart>
            )}
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#828587]">No chart data available</div>
        )}
      </CardContent>
    </Card>
  );
}

export function AdminAnalyticsCharts({ analytics }: { analytics?: AdminAnalytics }) {
  // TODO: Confirm exact backend keys for analytics arrays once the API contract is more specific.
  const organizers = normalize(analytics?.mostActiveOrganizers ?? analytics?.activeOrganizers);
  const sizes = normalize(analytics?.popularContributionSizes);
  const groupSizes = normalize(analytics?.averageGroupSizes);
  const volumes = normalize(analytics?.monthlyTransactionVolume ?? analytics?.transactionVolumes);
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <ChartCard title="Most active organizers" data={organizers} />
      <ChartCard title="Popular contribution sizes" data={sizes} />
      <ChartCard title="Average group size" data={groupSizes} />
      <ChartCard title="Monthly transaction volume" data={volumes} type="line" />
    </div>
  );
}
