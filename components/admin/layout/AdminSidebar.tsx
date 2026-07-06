"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminRoutes } from "@/lib/adminRoutes";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-[#E2E4E9] bg-white lg:block">
      <div className="flex h-16 items-center gap-2 border-b border-[#E2E4E9] px-5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-[#9244D4] text-sm font-bold text-white">
          A
        </div>
        <div>
          <p className="text-sm font-semibold">Adashi</p>
          <p className="text-xs text-[#828587]">Admin Panel</p>
        </div>
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {adminRoutes.map((route) => {
          const active =
            pathname === route.href || (route.href !== "/admin" && pathname.startsWith(route.href));
          const Icon = route.icon;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-zinc-700",
                active && "bg-[#CFACEC3D] text-[#9244D4]",
              )}
            >
              <Icon className="size-4" />
              {route.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
