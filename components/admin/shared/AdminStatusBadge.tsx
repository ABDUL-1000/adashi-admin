import { Badge } from "@/components/ui/badge";

export function AdminStatusBadge({ status }: { status?: string | boolean }) {
  const label = typeof status === "boolean" ? (status ? "Yes" : "No") : status ?? "Unknown";
  const tone =
    ["SUCCESS", "ACTIVE", "RESOLVED", "COMPLETED", "Yes"].includes(label) ? "default" : "outline";
  return (
    <Badge
      variant={tone}
      className={tone === "default" ? "bg-[#CFACEC3D] text-[#9244D4]" : "border-[#E2E4E9]"}
    >
      {label}
    </Badge>
  );
}
