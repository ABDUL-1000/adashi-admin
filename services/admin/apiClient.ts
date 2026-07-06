import axios from "axios";
import { getAdminToken } from "@/store/auth.store";
import type { ApiResponse } from "@/types/admin/common.types";

export const adminApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

adminApi.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function unwrap<T>(request: Promise<{ data: ApiResponse<T> }>) {
  const response = await request;
  return response.data.data;
}
