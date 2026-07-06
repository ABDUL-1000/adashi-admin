import { Card, CardContent } from "@/components/ui/card";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";

export default function AdminTransactionDetailPage() {
  return (
    <>
      <AdminPageHeader title="Transaction details" description="TODO: The API contract does not document a GET transaction detail endpoint." />
      <Card className="rounded-lg border border-[#E2E4E9] bg-white shadow-none"><CardContent className="text-sm text-[#828587]">No request is made here because only list, flag, and export transaction endpoints are documented.</CardContent></Card>
    </>
  );
}
