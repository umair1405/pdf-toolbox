export interface Plan {
  name: string;
  amount: string;
  period: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    name: "Free",
    amount: "$0",
    period: "/forever",
    features: ["5 conversions / day", "10MB max file size", "Standard formats", "Files deleted after 1 hour"],
    cta: "Start free",
  },
  {
    name: "Pro",
    amount: "$12",
    period: "/month",
    features: ["Unlimited conversions", "200MB max file size", "OCR included", "Batch processing", "Priority queue"],
    cta: "Start Pro trial",
    featured: true,
  },
  {
    name: "Team",
    amount: "$39",
    period: "/month",
    features: ["Everything in Pro", "5 seats included", "Shared workspace", "API access", "Priority support"],
    cta: "Talk to us",
  },
];
