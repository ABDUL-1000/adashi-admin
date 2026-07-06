"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPageLoader } from "@/components/admin/shared/AdminPageLoader";
import { useAdminSettings } from "@/hooks/admin/useAdminSettings";
import { useUpdateAdminSettings } from "@/hooks/admin/useUpdateAdminSettings";
import type { AdminSettings } from "@/types/admin/settings.types";

const emptySettings: AdminSettings = {
  platformFee: 0,
  transactionFee: 0,
  reminderSchedule: "",
  groupLimits: 0,
  walletLimits: 0,
  paymentProvider: "PAYSTACK",
};

export default function AdminSettingsPage() {
  const query = useAdminSettings();
  if (query.isLoading) return <AdminPageLoader />;
  return (
    <>
      <AdminPageHeader title="Platform Settings" description="Fees, limits, reminder schedule, and payment provider." />
      <SettingsForm settings={query.data ?? emptySettings} />
    </>
  );
}

function SettingsForm({ settings }: { settings: AdminSettings }) {
  const update = useUpdateAdminSettings();
  const [form, setForm] = useState<AdminSettings>(settings);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    update.mutate(form);
  }

  return (
      <Card className="rounded-lg border border-[#E2E4E9] bg-white shadow-none">
        <CardContent>
          <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
            <Field label="Platform fee" type="number" value={form.platformFee} onChange={(value) => setForm({ ...form, platformFee: Number(value) })} />
            <Field label="Transaction fee" type="number" value={form.transactionFee} onChange={(value) => setForm({ ...form, transactionFee: Number(value) })} />
            <Field label="Reminder schedule" value={form.reminderSchedule} onChange={(value) => setForm({ ...form, reminderSchedule: value })} />
            <Field label="Group limits" type="number" value={form.groupLimits} onChange={(value) => setForm({ ...form, groupLimits: Number(value) })} />
            <Field label="Wallet limits" type="number" value={form.walletLimits} onChange={(value) => setForm({ ...form, walletLimits: Number(value) })} />
            <div className="grid gap-1.5">
              <label className="text-sm font-medium">Payment provider</label>
              <select value={form.paymentProvider} onChange={(event) => setForm({ ...form, paymentProvider: event.target.value })} className="h-10 rounded-lg border border-[#E2E4E9] bg-white px-3 text-sm">
                <option value="PAYSTACK">PAYSTACK</option>
                <option value="FLUTTERWAVE">FLUTTERWAVE</option>
              </select>
            </div>
            <div className="sm:col-span-2"><Button disabled={update.isPending} className="bg-[#9244D4] hover:bg-[#7d35bd]">{update.isPending ? "Saving..." : "Save settings"}</Button></div>
          </form>
        </CardContent>
      </Card>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string | number; type?: string; onChange: (value: string) => void }) {
  return <div className="grid gap-1.5"><label className="text-sm font-medium">{label}</label><Input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="h-10 bg-white" /></div>;
}
