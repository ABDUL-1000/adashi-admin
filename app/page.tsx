"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAdminLogin } from "@/hooks/admin/useAdminLogin";

export default function Home() {
  const router = useRouter();
  const login = useAdminLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim();
    const normalizedPassword = password.trim();
    login.mutate(
      { email: normalizedEmail, password: normalizedPassword },
      {
        onSuccess: () => router.push("/admin"),
      },
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F5F5] px-4 py-10">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
        <section className="hidden lg:block">
          <div className="inline-flex size-12 items-center justify-center rounded-xl bg-[#9244D4] text-lg font-bold text-white">
            A
          </div>
          <h1 className="mt-6 max-w-xl text-5xl font-semibold tracking-tight text-zinc-950">
            Adashi Admin Panel
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-[#828587]">
            Sign in to monitor users, groups, wallets, transactions, payouts,
            revenue, disputes, reminders, and platform settings.
          </p>
          <div className="mt-8 grid max-w-lg gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-[#E2E4E9] bg-white p-4">
              <ShieldCheck className="size-5 text-[#9244D4]" />
              <p className="mt-3 text-sm font-medium">Protected access</p>
              <p className="mt-1 text-xs text-[#828587]">JWT authorization for admin APIs.</p>
            </div>
            <div className="rounded-lg border border-[#E2E4E9] bg-white p-4">
              <LockKeyhole className="size-5 text-[#9244D4]" />
              <p className="mt-3 text-sm font-medium">Operational console</p>
              <p className="mt-1 text-xs text-[#828587]">Built for careful admin action.</p>
            </div>
          </div>
        </section>

        <Card className="rounded-lg border border-[#E2E4E9] bg-white shadow-none">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-8">
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#CFACEC3D] text-[#9244D4] lg:hidden">
                <ShieldCheck className="size-5" />
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">Admin login</h2>
              <p className="mt-2 text-sm text-[#828587]">
                Enter your admin credentials to continue to the dashboard.
              </p>
            </div>

            <form onSubmit={submit} className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="admin-email">
                  Email address
                </label>
                <Input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="email"
                  className="h-11 bg-white"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="admin-password">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    className="h-11 bg-white pr-11"
                    autoComplete="current-password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1.5 top-1.5 size-8 text-[#828587]"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                disabled={login.isPending}
                className="h-11 bg-[#9244D4] hover:bg-[#7d35bd]"
              >
                {login.isPending ? "Signing in..." : "Continue to dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
