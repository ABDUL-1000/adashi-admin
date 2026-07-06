"use client";

import { create } from "zustand";

interface AuthState {
  token?: string;
  setToken: (token?: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: undefined,
  setToken: (token) => set({ token }),
}));

export function getAdminToken() {
  const storeToken = useAuthStore.getState().token;
  if (storeToken) return storeToken;
  if (typeof window === "undefined") return undefined;
  // TODO: Replace these fallbacks with the app's canonical auth token utility when it exists.
  return (
    window.localStorage.getItem("adminToken") ??
    window.localStorage.getItem("token") ??
    window.localStorage.getItem("accessToken") ??
    undefined
  );
}
