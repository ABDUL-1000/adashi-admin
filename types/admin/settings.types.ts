export interface AdminSettings {
  platformFee: number;
  transactionFee: number;
  reminderSchedule: string;
  groupLimits: number;
  walletLimits: number;
  paymentProvider: "PAYSTACK" | "FLUTTERWAVE" | string;
}
