import { Order } from "../../../constants";

export interface OrderStore {
  selectedOrders: Order[];
  offset: number;
  limit: number;
}
