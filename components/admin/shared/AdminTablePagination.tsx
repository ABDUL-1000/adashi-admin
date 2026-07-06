import { Button } from "@/components/ui/button";
import type { PaginationMeta } from "@/types/admin/common.types";

export function AdminTablePagination({
  pagination,
  onPageChange,
}: {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2 border-t border-[#E2E4E9] px-4 py-3 text-sm text-[#828587] sm:flex-row sm:items-center sm:justify-between">
      <span>
        Page {pagination.page} of {Math.max(pagination.totalPages, 1)} - {pagination.total} records
      </span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={pagination.page <= 1}
          onClick={() => onPageChange(pagination.page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          disabled={pagination.page >= pagination.totalPages}
          onClick={() => onPageChange(pagination.page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
