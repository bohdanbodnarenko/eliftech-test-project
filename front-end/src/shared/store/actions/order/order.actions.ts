import { Dispatch } from "redux";
import { httpService } from "../../../../utils";

export const getOrders = () => async (dispatch: Dispatch) => {
  const { data } = await httpService.get("/order/all");
  console.log(data);
};
