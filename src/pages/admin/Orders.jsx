import { Stack, Tooltip, Typography } from "@mui/material";
import BaseDataGrid from "~/components/BaseDataGrid/BaseDataGrid";

import useFetch from "~/libs/hooks/useFetch";
import { formatDate } from "~/libs/utils";
import { UpdateStatus } from "./Action";
import Delete from "./Action/Delete";
import styles from "./Admin.module.scss";

const Orders = () => {
  const { data, reFetch } = useFetch("allOrders");
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: styles.Id,
      cellClassName: styles.Id,
      flex: 0.5,
    },
    {
      field: "idItem",
      headerName: "Order ID",
      sortable: false,
      minWidth: 180,
      flex: 1,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography
            sx={{
              whiteSpace: " nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            fontSize="14px"
          >
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "customer",
      headerName: "Customer",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "method",
      headerName: "Method",
      minWidth: 80,
      sortable: false,
      flex: 0.8,
      renderCell: (params) => (
        <Typography>{params.value === 0 ? "Cash" : "Paid"}</Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      sortable: false,
      flex: 0.8,
      renderCell: (params) => handleConvertStatus(params.value),
    },
    {
      field: "updatedAt",
      headerName: "Update At",
      headerAlign: "right",
      align: "right",
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
      minWidth: 80,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      headerClassName: styles.Action,
      cellClassName: styles.Action,
      sortable: false,
      minWidth: 80,
      flex: 1,
      renderCell: (params) => {
        if (params.row !== undefined) {
          const idItem = params.row.idItem;
          return (
            <Stack direction="row" alignItems="center">
              <UpdateStatus data={data.orders} id={idItem} callback={reFetch} />
              <Delete id={idItem} name="orders" callback={reFetch} />
            </Stack>
          );
        }
      },
    },
  ];

  const handleConvertStatus = (status) => {
    if (status === 0) return "Preparing";
    if (status === 1) return "On the way";
    if (status === 2) return "Delivered";
  };

  const orderList = data.orders?.map((order, index) => {
    return {
      id: ++index,
      idItem: order._id,
      customer: order.customer,
      method: order.method,
      status: order.status,
      updatedAt: order.updatedAt,
      total: `$${order.totalPrice}`,
    };
  });

  return (
    <Stack className={styles.Orders}>
      <BaseDataGrid
        data={data}
        columns={columns}
        rows={orderList}
        rowPerPage={15}
        rowsPerPageOptions={[15, 25, 50]}
      />
    </Stack>
  );
};

export default Orders;
