"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { adminRoutes } from "@/lib/adminRoutes";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#E2E4E9] bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-semibold">Admin Dashboard</p>
        <p className="text-xs text-[#828587]">Operational control center</p>
      </div>
      <Dialog>
        <DialogTrigger render={<Button variant="outline" size="icon" className="lg:hidden" />}>
          <Menu />
        </DialogTrigger>
        <DialogContent className="left-4 top-4 max-h-[calc(100vh-2rem)] max-w-xs translate-x-0 translate-y-0 overflow-y-auto">
          <DialogTitle>Navigation</DialogTitle>
          <nav className="grid gap-1">
            {adminRoutes.map((route) => (
              <Link key={route.href} href={route.href} className="rounded-lg px-3 py-2 text-sm">
                {route.label}
              </Link>
            ))}
          </nav>
        </DialogContent>
      </Dialog>
    </header>
  );
}
