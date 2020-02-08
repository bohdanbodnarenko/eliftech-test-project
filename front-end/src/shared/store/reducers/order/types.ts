import { Order } from "../../../constants";

export interface OrderStore {
  selectedOrders: Order[];
  offset: number;
  limit: number;
  sortBy: keyof Order;
  isOrdersDesc: boolean;
  totalCount: number;
}
