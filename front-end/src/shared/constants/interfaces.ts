export interface Order {
  userEmail: string;
  date: Date;
  value: number;
  currency: "USD";
  status: "approved" | "pending" | "rejected";
}
