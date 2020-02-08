import React, { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";

import { Order } from "../shared/constants";

interface Props {
  orders: Order[];
  limit: number;
  offset: number;
  orderBy: keyof Order;
  totalCount: number;
  isDesc: boolean;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePage: (event: any, pageNumber: number) => void;
  onOrderBy: (orderBy: string) => void;
}

interface HeadCell {
  id: keyof Order;
  label: string;
}

const headCells: HeadCell[] = [
  {
    id: "userEmail",
    label: "User email"
  },
  { id: "date", label: "Date" },
  { id: "value", label: "Value" },
  { id: "currency", label: "Currency" },
  { id: "status", label: "Status" }
];

const OrdersTable = ({
  orders,
  totalCount,
  limit,
  offset,
  orderBy,
  isDesc,
  onChangePage,
  onChangeRowsPerPage,
  onOrderBy
}: Props) => {
  const handleSort = (id: string) => () => {
    onOrderBy(id);
  };

  return (
    <Fragment>
      <Table size={"small"}>
        <TableHead>
          <TableRow>
            {/*<TableCell align="center">User email</TableCell>*/}
            {/*<TableCell align="center">Date</TableCell>*/}
            {/*<TableCell align="center">Value</TableCell>*/}
            {/*<TableCell align="center">Currency</TableCell>*/}
            {/*<TableCell align="center">Status</TableCell>*/}
            {headCells.map(headCell => (
              <TableCell key={headCell.id} align={"center"}>
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={isDesc ? "desc" : "asc"}
                  onClick={handleSort(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(({ userEmail, date, value, currency, status }, index) => (
            <TableRow key={index}>
              <TableCell align="center">{userEmail}</TableCell>
              <TableCell align="center">{date}</TableCell>
              <TableCell align="center">{value}</TableCell>
              <TableCell align="center">{currency}</TableCell>
              <TableCell align="center">{status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[50, 100, 250]}
        component="div"
        count={totalCount}
        rowsPerPage={limit}
        page={offset / limit}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Fragment>
  );
};

export default OrdersTable;
