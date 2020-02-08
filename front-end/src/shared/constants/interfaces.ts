export interface Order {
  _id: string;
  userEmail: string;
  date: Date;
  value: number;
  currency: "USD";
  status: "approved" | "pending" | "rejected";
}
