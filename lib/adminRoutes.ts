import {
  BarChart3,
  CreditCard,
  Gauge,
  Landmark,
  MessageSquareWarning,
  PiggyBank,
  ReceiptText,
  Settings,
  Users,
  Wallet,
  Workflow,
  Bell,
} from "lucide-react";

export const adminRoutes = [
  { label: "Dashboard", href: "/admin", icon: Gauge },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Groups", href: "/admin/groups", icon: Workflow },
  { label: "Wallets", href: "/admin/wallets", icon: Wallet },
  { label: "Transactions", href: "/admin/transactions", icon: ReceiptText },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Payouts", href: "/admin/payouts", icon: Landmark },
  { label: "Reminders", href: "/admin/reminders", icon: Bell },
  { label: "Disputes", href: "/admin/disputes", icon: MessageSquareWarning },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Revenue", href: "/admin/revenue", icon: PiggyBank },
  { label: "Settings", href: "/admin/settings", icon: Settings },
] as const;
