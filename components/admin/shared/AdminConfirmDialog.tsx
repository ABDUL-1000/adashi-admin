"use client";

import type { ReactElement } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function AdminConfirmDialog({
  title,
  description,
  confirmLabel,
  children,
  pending,
  onConfirm,
}: {
  title: string;
  description: string;
  confirmLabel: string;
  children: ReactElement;
  pending?: boolean;
  onConfirm: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger render={children} />
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter>
          <Button disabled={pending} onClick={onConfirm} className="bg-[#9244D4] hover:bg-[#7d35bd]">
            {pending ? "Working..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
