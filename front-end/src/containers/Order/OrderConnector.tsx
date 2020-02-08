import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Paper, TableContainer } from "@material-ui/core";

import { AppStore } from "../../shared/store/store";
import {
  getOrders,
  getOrdersTotalCount,
  setLimit,
  setOffset,
  setOrderBy,
  setOrderDesc
} from "../../shared/store/actions";
import OrdersTable from "../../components/OrdersTable";

const OrderConnector = ({
  selectedOrders,
  limit,
  offset,
  sortBy,
  isOrdersDesc,
  totalCount,
  getOrders,
  setLimit,
  setOffset,
  setOrderBy,
  setOrderDesc,
  getTotalCount
}: any) => {
  useEffect(() => {
    getTotalCount();
    getOrders();
  }, [getOrders, getTotalCount]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(+event.target.value);
    setOffset(0);
    getOrders();
  };

  const handlePageChange = (_: any, pageNumber: number) => {
    setOffset(limit * pageNumber);
    getOrders();
  };

  const handleOrderBy = (sortedBy: string) => {
    if (sortedBy === sortBy) {
      setOrderDesc(!isOrdersDesc);
    } else {
      setOrderBy(sortedBy);
    }
    getOrders();
  };

  return (
    <TableContainer component={Paper}>
      <OrdersTable
        orders={selectedOrders}
        limit={limit}
        totalCount={totalCount}
        offset={offset}
        orderBy={sortBy}
        isDesc={isOrdersDesc}
        onOrderBy={handleOrderBy}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onChangePage={handlePageChange}
      />
    </TableContainer>
  );
};

const mapStateToProps = ({
  order: { selectedOrders, limit, offset, sortBy, isOrdersDesc, totalCount }
}: AppStore) => ({
  selectedOrders,
  limit,
  offset,
  sortBy,
  isOrdersDesc,
  totalCount
});

const mpaDispatchToProps = (dispatch: any) => ({
  getOrders: () => dispatch(getOrders()),
  setLimit: (limit: number) => dispatch(setLimit(limit)),
  setOffset: (offset: number) => dispatch(setOffset(offset)),
  setOrderBy: (orderBy: string) => dispatch(setOrderBy(orderBy)),
  setOrderDesc: (isDesc: boolean) => dispatch(setOrderDesc(isDesc)),
  getTotalCount: () => dispatch(getOrdersTotalCount())
});

export default connect(
  mapStateToProps,
  mpaDispatchToProps
)(OrderConnector);
