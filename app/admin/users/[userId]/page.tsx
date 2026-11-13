"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPageLoader } from "@/components/admin/shared/AdminPageLoader";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import { UserTypeBadges } from "@/components/admin/users/UserTypeBadges";
import { useAdminUser } from "@/hooks/admin/useAdminUser";
import { formatCurrency, formatKobo } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import type { AdminUserPssPlan } from "@/types/admin/user.types";

const cardClass = "rounded-lg border border-[#E2E4E9] bg-white shadow-none";

export default function AdminUserDetailPage() {
  const params = useParams<{ userId: string }>();
  const { data, isLoading } = useAdminUser(params.userId);
  if (isLoading) return <AdminPageLoader />;

  const status = data?.deletedAt ? "DELETED" : Boolean(data?.isSuspended ?? data?.suspended) ? "SUSPENDED" : "ACTIVE";

  return (
    <>
      <AdminPageHeader title={data?.name ?? data?.fullName ?? "User details"} description={data?.email ?? undefined} />

      <Card className={cardClass}>
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Detail label="User type" value={<UserTypeBadges types={data?.userTypes} />} />
          <Detail label="Status" value={<AdminStatusBadge status={status} />} />
          <Detail label="Phone" value={data?.phone} />
          <Detail label="Joined" value={formatDate(data?.createdAt)} />
          <Detail label="Privacy consent" value={data?.privacyConsentAt ? formatDate(data.privacyConsentAt) : "Not recorded"} />
          <Detail label="Wallet balance" value={data?.walletBalance === null || data?.walletBalance === undefined ? "No wallet" : formatCurrency(data.walletBalance)} />
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className={cardClass}>
          <CardHeader><CardTitle>Groups organised ({data?.counts?.groupsOrganized ?? 0})</CardTitle></CardHeader>
          <CardContent>
            {data?.groupsOrganized?.length ? (
              <ul className="grid gap-2">
                {data.groupsOrganized.map((group) => (
                  <Row
                    key={group.id}
                    href={`/admin/groups/${group.id}`}
                    title={group.name}
                    subtitle={`${formatCurrency(Number(group.contributionAmount))} ${group.frequency.toLowerCase()} · ${group.slots} slots`}
                    status={group.status}
                  />
                ))}
              </ul>
            ) : <Empty text="Does not organise any group." />}
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader><CardTitle>Group memberships ({data?.counts?.groupMemberships ?? 0})</CardTitle></CardHeader>
          <CardContent>
            {data?.memberships?.length ? (
              <ul className="grid gap-2">
                {data.memberships.map((membership) => (
                  <Row
                    key={membership.id}
                    href={`/admin/groups/${membership.group.id}`}
                    title={membership.group.name}
                    subtitle={`Payout position ${membership.payoutPosition} · joined ${formatDate(membership.joinedAt)}`}
                    status={membership.group.status}
                  />
                ))}
              </ul>
            ) : <Empty text="Not a member of any group." />}
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader><CardTitle>Pay Small Small: selling ({data?.counts?.pssPlansSold ?? 0})</CardTitle></CardHeader>
          <CardContent>
            <PlanList plans={data?.pssPlansSold} who={(plan) => `To ${plan.customerName}`} empty="Does not sell on Pay Small Small." />
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader><CardTitle>Pay Small Small: buying ({data?.counts?.pssPlansBought ?? 0})</CardTitle></CardHeader>
          <CardContent>
            <PlanList plans={data?.pssPlansBought} who={(plan) => `From ${plan.shopName ?? "a shop"}`} empty="No Pay Small Small plan linked to this account." />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function PlanList({ plans, who, empty }: { plans?: AdminUserPssPlan[]; who: (plan: AdminUserPssPlan) => string; empty: string }) {
  if (!plans?.length) return <Empty text={empty} />;
  return (
    <ul className="grid gap-2">
      {plans.map((plan) => (
        <li key={plan.id} className="rounded-lg border border-[#E2E4E9] p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-medium">{plan.itemName}</p>
              <p className="text-xs text-[#828587]">
                {who(plan)} · paid {formatKobo(plan.paid)} of {formatKobo(plan.totalPrice)} · balance {formatKobo(plan.balance)}
              </p>
              {plan.disputedPayments ? (
                <p className="mt-1 text-xs font-medium text-red-600">{plan.disputedPayments} disputed payment(s)</p>
              ) : null}
            </div>
            <AdminStatusBadge status={plan.status} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Row({ href, title, subtitle, status }: { href: string; title: string; subtitle: string; status: string }) {
  return (
    <li>
      <Link href={href} className="flex items-start justify-between gap-3 rounded-lg border border-[#E2E4E9] p-3 hover:border-[#9244D4]/40">
        <div className="min-w-0">
          <p className="truncate font-medium">{title}</p>
          <p className="text-xs text-[#828587]">{subtitle}</p>
        </div>
        <AdminStatusBadge status={status} />
      </Link>
    </li>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="text-sm text-[#828587]">{text}</p>;
}

function Detail({ label, value }: { label: string; value?: React.ReactNode }) {
  return <div><p className="text-xs text-[#828587]">{label}</p><div className="mt-1 text-sm font-medium">{value ?? "Not available"}</div></div>;
}
