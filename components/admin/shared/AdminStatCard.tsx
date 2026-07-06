import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AdminStatCard({
  label,
  value,
  icon: Icon,
  trend,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
}) {
  return (
    <Card className="rounded-lg border border-[#E2E4E9] bg-white shadow-none">
      <CardContent className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#828587]">{label}</p>
          <p className="mt-2 text-2xl font-semibold">{value}</p>
          {trend ? <p className="mt-2 text-xs font-medium text-[#9244D4]">{trend}</p> : null}
        </div>
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#CFACEC3D] text-[#9244D4]">
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  );
}
