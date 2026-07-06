import axios from "axios";

interface ErrorPayload {
  message?: string;
  error?: string;
}

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError<ErrorPayload>(error)) {
    return error.response?.data?.message ?? error.response?.data?.error ?? error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}
