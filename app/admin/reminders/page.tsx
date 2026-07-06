"use client";

import { Button } from "@/components/ui/button";
import { AdminRemindersTable } from "@/components/admin/reminders/AdminRemindersTable";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPageLoader } from "@/components/admin/shared/AdminPageLoader";
import { useAdminReminders } from "@/hooks/admin/useAdminReminders";
import { useTriggerAdminReminder } from "@/hooks/admin/useTriggerAdminReminder";

export default function AdminRemindersPage() {
  const query = useAdminReminders();
  const trigger = useTriggerAdminReminder();
  return (
    <>
      <AdminPageHeader title="Reminders" description="Review reminder logs and trigger a manual reminder." action={<Button disabled={trigger.isPending} onClick={() => trigger.mutate()} className="bg-[#9244D4] hover:bg-[#7d35bd]">{trigger.isPending ? "Triggering..." : "Trigger reminder"}</Button>} />
      {query.isLoading ? <AdminPageLoader /> : <AdminRemindersTable reminders={query.data ?? []} />}
    </>
  );
}
