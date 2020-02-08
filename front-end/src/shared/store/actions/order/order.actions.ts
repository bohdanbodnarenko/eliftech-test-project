import { AnyAction, Dispatch } from "redux";

import { httpService } from "../../../../utils";
import store from "../../store";
import * as types from "../actionTypes";

export const getOrders = () => async (dispatch: Dispatch) => {
  const { limit, offset, sortBy, isOrdersDesc } = store.getState().order;
  const { data } = await httpService.get(
    `/order/all?limit=${limit}&offset=${offset}&sortBy=${sortBy}&desc=${isOrdersDesc}`
  );

  return dispatch({ type: types.SET_SELECTED_ORDERS, payload: data });
};

export const setLimit = (limit: number): AnyAction => ({
  type: types.SET_ORDERS_LIMIT,
  payload: limit
});

export const setOffset = (offset: number): AnyAction => ({
  type: types.SET_ORDERS_OFFSET,
  payload: offset
});

export const setOrderBy = (orderBy: string): AnyAction => ({
  type: types.SET_ORDERS_SORT_BY,
  payload: orderBy
});

export const setOrderDesc = (isDesc: boolean): AnyAction => ({
  type: types.SET_ORDERS_DESC,
  payload: isDesc
});

export const getOrdersTotalCount = () => async (dispatch: Dispatch) => {
  const {
    data: { totalCount }
  } = await httpService.get("/order/count");

  return dispatch({ type: types.SET_ORDERS_TOTAL_COUNT, payload: totalCount });
};
