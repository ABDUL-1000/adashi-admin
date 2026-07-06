import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { entityId } from "@/types/admin/common.types";
import type { AdminWallet } from "@/types/admin/wallet.types";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";

export function AdminWalletsTable({ wallets }: { wallets: AdminWallet[] }) {
  if (!wallets.length) return <AdminEmptyState title="No wallets found" />;
  return (
    <Card className="rounded-lg border border-[#E2E4E9] bg-white p-0 shadow-none">
      <div className="hidden md:block"><Table><TableHeader><TableRow><TableHead>Owner</TableHead><TableHead>Balance</TableHead><TableHead>Created</TableHead><TableHead>Updated</TableHead></TableRow></TableHeader><TableBody>{wallets.map((wallet) => <TableRow key={entityId(wallet)}><TableCell>{wallet.owner?.name ?? wallet.user?.name ?? wallet.owner?.email ?? wallet.user?.email ?? "Not available"}</TableCell><TableCell className="font-semibold">{formatCurrency(wallet.balance)}</TableCell><TableCell>{formatDate(wallet.createdAt)}</TableCell><TableCell>{formatDate(wallet.updatedAt)}</TableCell></TableRow>)}</TableBody></Table></div>
      <div className="grid gap-3 p-3 md:hidden">{wallets.map((wallet) => <div key={entityId(wallet)} className="rounded-lg border border-[#E2E4E9] p-3"><p className="font-medium">{wallet.owner?.name ?? wallet.user?.name ?? "Wallet"}</p><p className="text-lg font-semibold">{formatCurrency(wallet.balance)}</p><p className="text-xs text-[#828587]">{formatDate(wallet.createdAt)}</p></div>)}</div>
    </Card>
  );
}
