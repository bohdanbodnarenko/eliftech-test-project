import { AnyAction } from "redux";

import * as types from "../../actions/actionTypes";
import { OrderStore } from "./types";

const initialState: OrderStore = {
  selectedOrders: [],
  limit: 50,
  offset: 0,
  sortBy: "userEmail",
  isOrdersDesc: false
};

export const order = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.SET_SELECTED_ORDERS:
      return {
        ...state,
        selectedOrders: action.payload
      };

    case types.SET_ORDERS_LIMIT:
      return {
        ...state,
        limit: action.payload
      };

    case types.SET_ORDERS_OFFSET:
      return {
        ...state,
        offset: action.payload
      };

    case types.SET_ORDERS_SORT_BY:
      return {
        ...state,
        sortBy: action.payload
      };

    case types.SET_ORDERS_DESC:
      return {
        ...state,
        isOrdersDesc: action.payload
      };

    default:
      return state;
  }
};
