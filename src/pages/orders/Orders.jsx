import { Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import BaseDataGrid from "~/components/BaseDataGrid/BaseDataGrid";
import useFetch from "~/libs/hooks/useFetch";
import { formatDate } from "~/libs/utils";
import styles from "./Orders.module.scss";

const Orders = () => {
  const user = useSelector((state) => state.user.user);
  const { data } = useFetch("orders", null, user);
  const navigate = useNavigate();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "idOrder",
      headerName: "Order Code",
      sortable: false,
      minWidth: 240,
      flex: 1,
      renderCell: (params) => (
        <Link to={`/orders/${params.row.idOrder}`}>
          <Typography fontSize="14px">{params.value}</Typography>
        </Link>
      ),
    },
    {
      field: "address",
      headerName: "Address",
      headerAlign: "left",
      align: "left",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "method",
      headerName: "Method",
      headerAlign: "left",
      align: "left",
      minWidth: 80,
      flex: 1,
      renderCell: (params) => (params.value === 0 ? "Cash" : "Paypal"),
    },
    {
      field: "createdAt",
      headerName: "Order Time",
      headerAlign: "right",
      align: "right",
      sortable: false,
      minWidth: 200,
      flex: 1,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "updatedAt",
      headerName: "Updated Time",
      headerAlign: "right",
      align: "right",
      sortable: false,
      minWidth: 200,
      flex: 1,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "total",
      headerName: "Total",
      headerAlign: "right",
      align: "right",
      sortable: false,
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <Typography fontSize="14px" fontWeight="bold">
          {params.value}
        </Typography>
      ),
    },
  ];

  const orderList = data.userOrders?.map((order, index) => {
    return {
      id: ++index,
      idOrder: order._id,
      address: order.address,
      method: order.method,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      total: order.totalPrice,
    };
  });

  return (
    <>
      <Stack className={styles.Container} justifyContent="center">
        <BaseDataGrid
          classes={{
            row: styles.DataGridRow,
            cell: styles.DataGridCell,
          }}
          data={data}
          columns={columns}
          rows={orderList}
          rowPerPage={5}
          rowsPerPageOptions={[5, 10, 15]}
          onRowClick={(params) => navigate(`/orders/${params.row.idOrder}`)}
        />
      </Stack>
    </>
  );
};

export default Orders;
