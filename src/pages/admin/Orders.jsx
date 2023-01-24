import { Box, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";

import Loading from "~/components/Loading/Loading";
import useFetch from "~/libs/hooks/useFetch";
import { UpdateStatus } from "./Action";
import Delete from "./Action/Delete";
import styles from "./Admin.module.scss";

const Orders = ({ handleAlign }) => {
  const navigate = useNavigate();

  const { data, loading, reFetch } = useFetch("allOrders");

  const columnOrders = [
    {
      name: "Order Id",
    },
    {
      name: "Customer",
      align: "center",
    },
    {
      name: "Payment",
      align: "center",
    },
    {
      name: "Status",
      align: "center",
    },
    {
      name: "Total",
      align: "right",
    },
    {
      name: "Action",
      align: "center",
    },
  ];

  const navigateToDetailOrder = (id) => {
    navigate(`/orders/${id}`);
  };

  

  const handleConvertStatus = (status) => {
    if (status === 0) return "Preparing";
    if (status === 1) return "On the way";
    if (status === 2) return "Delivered";
  };

  if (loading) return <Loading />;
  return (
    <Box className={styles.Orders}>
      <TableContainer component={Paper} className={styles.Table}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead classes={{ root: styles.TableHead }}>
            <TableRow>
              {columnOrders.map((column, index) => {
                return (
                  <TableCell
                    classes={{ root: styles.TableCell }}
                    align={handleAlign(index, column.align)}
                    key={index}
                  >
                    {column.name}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody classes={{ root: styles.TableBody }}>
            {data.map((order) => (
              <TableRow
                onClick={() => navigateToDetailOrder(order._id)}
                key={order._id}
                classes={{ root: styles.TableRow }}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell classes={{ root: styles.TableCell }} align="left">
                  {order._id.slice(0, 9)}
                </TableCell>
                <TableCell classes={{ root: styles.TableCell }} align="center">
                  {order.customer}
                </TableCell>
                <TableCell classes={{ root: styles.TableCell }} align="center">
                  {order.method === 0 ? "Cash" : "Paid"}
                </TableCell>
                <TableCell classes={{ root: styles.TableCell }} align="center">
                  {handleConvertStatus(order.status)}
                </TableCell>
                <TableCell classes={{ root: styles.TableCell }} align="right">
                  ${order.total}
                </TableCell>
                <TableCell
                  onClick={(e) => e.stopPropagation()}
                  classes={{ root: styles.TableCell }}
                  align="center"
                >
                  <UpdateStatus data={data} id={order._id} callback={reFetch} />
                  <Delete id={order._id} name="orders" callback={reFetch} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Orders;
