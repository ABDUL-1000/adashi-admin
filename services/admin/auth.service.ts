import axios from "axios";
import type { AdminLoginPayload, AdminLoginResponse } from "@/types/admin/auth.types";
import type { ApiResponse } from "@/types/admin/common.types";

type LoginEnvelope = AdminLoginResponse | ApiResponse<AdminLoginResponse>;

const loginApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

function findToken(value: unknown): string | undefined {
  if (!value || typeof value !== "object") return undefined;

  const record = value as Record<string, unknown>;
  for (const key of ["token", "accessToken", "access_token", "jwt", "authToken"]) {
    const candidate = record[key];
    if (typeof candidate === "string" && candidate.length > 0) return candidate;
  }

  for (const nestedValue of Object.values(record)) {
    const token = findToken(nestedValue);
    if (token) return token;
  }

  return undefined;
}

export const authService = {
  login: async (payload: AdminLoginPayload) => {
    const response = await loginApi.post<LoginEnvelope>("/login", payload);
    if ("success" in response.data && response.data.success === false) {
      throw new Error(response.data.message || "Login failed.");
    }

    const token = findToken(response.data);
    if (!token) throw new Error("Login succeeded but no token was returned.");
    return token;
  },
};
