"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { authService } from "@/services/admin/auth.service";
import { useAuthStore } from "@/store/auth.store";
import type { AdminLoginPayload } from "@/types/admin/auth.types";

export function useAdminLogin() {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: (payload: AdminLoginPayload) => authService.login(payload),
    onSuccess: (token) => {
      window.localStorage.setItem("adminToken", token);
      setToken(token);
      toast.success("Admin session started");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
