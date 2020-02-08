import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Paper, TableContainer, Fab } from "@material-ui/core";
import { Add, CloudDownload } from "@material-ui/icons";

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
import UploadCsvForm from "../../components/UploadCsvForm";
import { httpService } from "../../utils";

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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [uploadedPercent, setUploadedPercent] = useState<number>(0);

  useEffect(() => {
    getTotalCount();
    getOrders();
  }, [getOrders, getTotalCount]);

  const handleFilesSubmit = async (files: File[]) => {
    for (const file of files) {
      let fd = new FormData();
      fd.append("csv", file);
      try {
        const {
          data: { message }
        } = await httpService.post("/order/upload", fd, {
          onUploadProgress: ({ loaded, total }) =>
            setUploadedPercent(Math.round(loaded / total) * 100)
        });
        alert(message);
      } catch (error) {
        alert(error);
      } finally {
        setUploadedPercent(0);
      }
    }
    getTotalCount();
    getOrders();
    setModalOpen(false);
  };

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
    <Fragment>
      <UploadCsvForm
        open={modalOpen}
        uploadedPercent={uploadedPercent}
        onClose={() => setModalOpen(false)}
        onFilesSubmit={handleFilesSubmit}
      />
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
      <div className={"buttons-wrapper"}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setModalOpen(true)}
        >
          <Add />
        </Fab>
        <Fab color="secondary" aria-label="download">
          <CloudDownload />
        </Fab>
      </div>
    </Fragment>
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
