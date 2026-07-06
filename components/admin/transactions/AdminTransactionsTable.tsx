"use client";

import { toast } from "sonner";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminConfirmDialog } from "@/components/admin/shared/AdminConfirmDialog";
import { AdminEmptyState } from "@/components/admin/shared/AdminEmptyState";
import { AdminStatusBadge } from "@/components/admin/shared/AdminStatusBadge";
import { useFlagTransaction } from "@/hooks/admin/useFlagTransaction";
import { transactionsService } from "@/services/admin/transactions.service";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { entityId } from "@/types/admin/common.types";
import type { AdminTransaction } from "@/types/admin/transaction.types";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";

function TransactionActions({ transaction }: { transaction: AdminTransaction }) {
  const id = entityId(transaction);
  const flag = useFlagTransaction(id);
  return <AdminConfirmDialog title="Update transaction flag?" description="This changes the suspicious transaction flag." confirmLabel={transaction.isFlagged ? "Unflag" : "Flag"} pending={flag.isPending} onConfirm={() => flag.mutate({ isFlagged: !transaction.isFlagged })}><Button variant="outline">{transaction.isFlagged ? "Unflag" : "Flag"}</Button></AdminConfirmDialog>;
}

export function ExportTransactionsButton() {
  async function download() {
    try {
      const blob = await transactionsService.exportTransactions();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "transactions.csv";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("CSV export started");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }
  return <Button onClick={download} className="bg-[#9244D4] hover:bg-[#7d35bd]"><Download /> Export CSV</Button>;
}

export function AdminTransactionsTable({ transactions }: { transactions: AdminTransaction[] }) {
  if (!transactions.length) return <AdminEmptyState title="No transactions found" />;
  return (
    <Card className="rounded-lg border border-[#E2E4E9] bg-white p-0 shadow-none">
      <div className="hidden md:block"><Table><TableHeader><TableRow><TableHead>Reference</TableHead><TableHead>Type</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Created</TableHead><TableHead /></TableRow></TableHeader><TableBody>{transactions.map((transaction) => <TableRow key={entityId(transaction)}><TableCell className="font-medium">{transaction.reference ?? entityId(transaction)}</TableCell><TableCell>{transaction.type ?? "Unknown"}</TableCell><TableCell>{formatCurrency(transaction.amount)}</TableCell><TableCell><AdminStatusBadge status={transaction.isFlagged ? "FLAGGED" : transaction.status} /></TableCell><TableCell>{formatDate(transaction.createdAt)}</TableCell><TableCell><TransactionActions transaction={transaction} /></TableCell></TableRow>)}</TableBody></Table></div>
      <div className="grid gap-3 p-3 md:hidden">{transactions.map((transaction) => <div key={entityId(transaction)} className="rounded-lg border border-[#E2E4E9] p-3"><p className="font-medium">{transaction.reference ?? entityId(transaction)}</p><p className="text-sm text-[#828587]">{transaction.type ?? "Unknown"} - {formatCurrency(transaction.amount)}</p><div className="mt-3"><TransactionActions transaction={transaction} /></div></div>)}</div>
    </Card>
  );
}
