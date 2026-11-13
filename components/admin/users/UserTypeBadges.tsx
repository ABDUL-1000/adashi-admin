import { Badge } from "@/components/ui/badge";
import { USER_TYPE_LABELS, type AdminUserType } from "@/types/admin/user.types";

const tones: Record<AdminUserType, string> = {
  ORGANISER: "bg-[#CFACEC3D] text-[#9244D4] border-transparent",
  MEMBER: "bg-sky-50 text-sky-700 border-transparent",
  SHOP_OWNER: "bg-amber-50 text-amber-700 border-transparent",
  PSS_CUSTOMER: "bg-emerald-50 text-emerald-700 border-transparent",
  SIGNED_UP_ONLY: "border-[#E2E4E9] text-[#828587]",
  ADMIN: "bg-zinc-900 text-white border-transparent",
  DELETED: "bg-red-50 text-red-700 border-transparent",
};

export function UserTypeBadges({ types }: { types?: AdminUserType[] }) {
  if (!types?.length) return <span className="text-sm text-[#828587]">Unknown</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {types.map((type) => (
        <Badge key={type} variant="outline" className={tones[type]}>
          {USER_TYPE_LABELS[type]}
        </Badge>
      ))}
    </div>
  );
}
