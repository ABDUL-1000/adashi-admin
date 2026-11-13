"use client";

import Link from "next/link";
import { useState } from "react";
import { AlertTriangle, ShoppingBag, Store, Users, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { AdminPageLoader } from "@/components/admin/shared/AdminPageLoader";
import { AdminStatCard } from "@/components/admin/shared/AdminStatCard";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import { AdminTablePagination } from "@/components/admin/shared/AdminTablePagination";
import { FilterSelect, SearchBox } from "@/components/admin/shared/Filters";
import { useAdminPssCustomers, useAdminPssPlans, useAdminPssSummary } from "@/hooks/admin/useAdminPss";
import { formatKobo } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import { extractList, extractPagination } from "@/types/admin/common.types";
import type { AdminPssCustomer, AdminPssPlan } from "@/types/admin/pss.types";

type View = "plans" | "customers";
const cardClass = "rounded-lg border border-[#E2E4E9] bg-white p-0 shadow-none";

export default function AdminPaySmallSmallPage() {
  const [view, setView] = useState<View>("plans");
  const summary = useAdminPssSummary();
  const s = summary.data;

  return (
    <>
      <AdminPageHeader
        title="Pay Small Small"
        description="Installment plans recorded by shop owners. Adashi records these payments; it does not hold the money."
      />

      {summary.isError ? <div className="rounded-lg border border-red-200 bg-white p-4 text-sm text-red-600">Unable to load the summary.</div> : null}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Plans" value={s?.plans.total ?? 0} icon={ShoppingBag} trend={`Active ${s?.plans.active ?? 0} · Paid off ${s?.plans.completed ?? 0} · Cancelled ${s?.plans.cancelled ?? 0}`} />
        <AdminStatCard label="Shop owners" value={s?.people.shopOwners ?? 0} icon={Store} />
        <AdminStatCard label="Customers" value={s?.people.customers ?? 0} icon={Users} trend={`${s?.people.customersWithAccount ?? 0} have an Adashi account`} />
        <AdminStatCard label="Disputed payments" value={s?.payments.disputed ?? 0} icon={AlertTriangle} trend={`${s?.payments.awaitingConfirmation ?? 0} awaiting customer confirmation`} />
        <AdminStatCard label="Value of live plans" value={formatKobo(s?.money.totalValue)} icon={Wallet} />
        <AdminStatCard label="Recorded as paid" value={formatKobo(s?.money.totalPaid)} icon={Wallet} trend={`${s?.payments.total ?? 0} payments`} />
        <AdminStatCard label="Still outstanding" value={formatKobo(s?.money.outstanding)} icon={Wallet} />
      </div>

      <div className="flex gap-2" role="tablist" aria-label="Pay Small Small view">
        {(["plans", "customers"] as const).map((value) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={view === value}
            onClick={() => setView(value)}
            className={cn(
              "h-9 rounded-lg border px-3 text-sm font-medium transition",
              view === value ? "border-[#9244D4] bg-[#CFACEC3D] text-[#9244D4]" : "border-[#E2E4E9] bg-white text-zinc-700",
            )}
          >
            {value === "plans" ? "Plans" : "Customers"}
          </button>
        ))}
      </div>

      {view === "plans" ? <PlansSection /> : <CustomersSection />}
    </>
  );
}

function PlansSection() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const query = useAdminPssPlans({ page, limit: 10, search, status: status === "All" ? undefined : status });
  const plans = extractList(query.data);

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
        <SearchBox value={search} placeholder="Search item, customer or shop owner" onChange={(value) => { setSearch(value); setPage(1); }} />
        <FilterSelect value={status} options={["All", "ACTIVE", "COMPLETED", "CANCELLED"]} onChange={(value) => { setStatus(value); setPage(1); }} />
      </div>
      {query.isLoading ? <AdminPageLoader /> : <PlansTable plans={plans} />}
      <AdminTablePagination pagination={extractPagination(query.data)} onPageChange={setPage} />
    </>
  );
}

function PlansTable({ plans }: { plans: AdminPssPlan[] }) {
  if (!plans.length) return <AdminEmptyState title="No plans found" />;
  return (
    <Card className={cardClass}>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead><TableHead>Shop owner</TableHead><TableHead>Customer</TableHead>
              <TableHead>Paid</TableHead><TableHead>Balance</TableHead><TableHead>Status</TableHead><TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>
                  <div className="font-medium">{plan.itemName}</div>
                  <div className="text-xs text-[#828587]">
                    {plan.paymentsCount} payment(s){plan.collected ? " · item collected" : ""}
                    {plan.disputedPayments ? <span className="ml-1 font-medium text-red-600">· {plan.disputedPayments} disputed</span> : null}
                  </div>
                </TableCell>
                <TableCell>
                  <Link href={`/admin/users/${plan.shopOwner.id}`} className="font-medium text-[#9244D4] hover:underline">{plan.shopOwner.name}</Link>
                  <div className="text-xs text-[#828587]">{plan.shopOwner.email ?? ""}</div>
                </TableCell>
                <TableCell>
                  {plan.customer.account ? (
                    <Link href={`/admin/users/${plan.customer.account.id}`} className="font-medium text-[#9244D4] hover:underline">{plan.customer.name}</Link>
                  ) : <span className="font-medium">{plan.customer.name}</span>}
                  <div className="text-xs text-[#828587]">{plan.customer.phone}{plan.customer.account ? "" : " · no account"}</div>
                </TableCell>
                <TableCell>{formatKobo(plan.paid)} <span className="text-xs text-[#828587]">of {formatKobo(plan.totalPrice)}</span></TableCell>
                <TableCell>{formatKobo(plan.balance)}</TableCell>
                <TableCell><AdminStatusBadge status={plan.status} /></TableCell>
                <TableCell>{formatDate(plan.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="grid gap-3 p-3 md:hidden">
        {plans.map((plan) => (
          <div key={plan.id} className="rounded-lg border border-[#E2E4E9] p-3">
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium">{plan.itemName}</p>
              <AdminStatusBadge status={plan.status} />
            </div>
            <p className="text-sm text-[#828587]">{plan.shopOwner.name} → {plan.customer.name}</p>
            <p className="mt-1 text-sm">Paid {formatKobo(plan.paid)} of {formatKobo(plan.totalPrice)} · balance {formatKobo(plan.balance)}</p>
            {plan.disputedPayments ? <p className="text-xs font-medium text-red-600">{plan.disputedPayments} disputed payment(s)</p> : null}
          </div>
        ))}
      </div>
    </Card>
  );
}

function CustomersSection() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const query = useAdminPssCustomers({ page, limit: 10, search });
  const customers = extractList(query.data);

  return (
    <>
      <SearchBox value={search} placeholder="Search customer name" onChange={(value) => { setSearch(value); setPage(1); }} />
      <p className="text-xs text-[#828587]">
        One row per phone number. Many customers have never signed up to Adashi, so phone numbers are partly hidden.
      </p>
      {query.isLoading ? <AdminPageLoader /> : <CustomersTable customers={customers} />}
      <AdminTablePagination pagination={extractPagination(query.data)} onPageChange={setPage} />
    </>
  );
}

function CustomersTable({ customers }: { customers: AdminPssCustomer[] }) {
  if (!customers.length) return <AdminEmptyState title="No customers found" />;
  return (
    <Card className={cardClass}>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead><TableHead>Adashi account</TableHead><TableHead>Plans</TableHead>
              <TableHead>Shops</TableHead><TableHead>Paid</TableHead><TableHead>Balance</TableHead><TableHead>Last plan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.key}>
                <TableCell><div className="font-medium">{customer.name}</div><div className="text-xs text-[#828587]">{customer.phone}</div></TableCell>
                <TableCell>
                  {customer.account
                    ? <Link href={`/admin/users/${customer.account.id}`} className="text-[#9244D4] hover:underline">{customer.account.name}</Link>
                    : <span className="text-[#828587]">None</span>}
                </TableCell>
                <TableCell>{customer.plans} <span className="text-xs text-[#828587]">({customer.activePlans} active)</span></TableCell>
                <TableCell className="max-w-48 whitespace-normal">{customer.shops.map((shop) => shop.name).join(", ")}</TableCell>
                <TableCell>{formatKobo(customer.totalPaid)}</TableCell>
                <TableCell>{formatKobo(customer.balance)}</TableCell>
                <TableCell>{formatDate(customer.lastPlanAt ?? undefined)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="grid gap-3 p-3 md:hidden">
        {customers.map((customer) => (
          <div key={customer.key} className="rounded-lg border border-[#E2E4E9] p-3">
            <p className="font-medium">{customer.name}</p>
            <p className="text-sm text-[#828587]">{customer.phone} · {customer.account ? "has account" : "no account"}</p>
            <p className="mt-1 text-sm">{customer.plans} plan(s) · balance {formatKobo(customer.balance)}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
