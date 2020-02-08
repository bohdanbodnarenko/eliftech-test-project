import { AnyAction } from "redux";

import * as types from "../../actions/actionTypes";
import { OrderStore } from "./types";

const initialState: OrderStore = {
  selectedOrders: [],
  limit: 100,
  offset: 0
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

    default:
      return state;
  }
};
