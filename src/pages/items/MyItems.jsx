import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Paper } from "@mui/material";

import Loading from "~/components/Loading/Loading";
import styles from "./MyItems.module.scss";
import { useSelector } from "react-redux";
import { formatDate } from "~/libs/utils";
import { orderApi } from "~/libs/helpers/axios";
import useFetch from "~/libs/hooks/useFetch";

const MyItem = () => {
  const user = useSelector((state) => state.user.user);
  const { data, loading } = useFetch("orders", user?._id);

  const navigate = useNavigate();

  const navigateToDetailItem = (id) => {
    navigate(`/orders/${id}`);
  };
  const columns = [
    {
      name: "Order Code",
      align: "left",
    },
    {
      name: "Customer",
      align: "center",
    },
    {
      name: "Address",
      align: "center",
    },
    {
      name: "Method",
      align: "center",
    },
    {
      name: "Order time",
      align: "center",
    },
    {
      name: "Total",
      align: "right",
    },
  ];

  const handleAlign = (array, index, align) => {
    if (index === 0) return "left";
    if (index === array.length - 1) return "right";
    return align;
  };

  if (loading) return <Loading className={styles.Loading} />;
  return (
    <>
      <Box className={styles.Container}>
        {data.length !== 0 ? (
          <TableContainer classes={{ root: styles.TableContainer }} component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead classes={{ root: styles.TableHead }}>
                <TableRow>
                  {columns.map((column, index) => {
                    return (
                      <TableCell
                        classes={{ root: styles.TableCell }}
                        align={handleAlign(columns, index, column.align)}
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
                    onClick={() => navigateToDetailItem(order._id)}
                    key={order._id}
                    classes={{ root: styles.TableRow }}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell
                      classes={{ root: styles.TableCell }}
                      align="left"
                    >
                      {order._id}
                    </TableCell>
                    <TableCell
                      classes={{ root: styles.TableCell }}
                      align="center"
                    >
                      {order.customer}
                    </TableCell>
                    <TableCell
                      classes={{ root: styles.TableCell }}
                      align="center"
                    >
                      {order.address}
                    </TableCell>
                    <TableCell
                      classes={{ root: styles.TableCell }}
                      align="center"
                    >
                      {order.method === 0 ? "Cash" : "Visa"}
                    </TableCell>
                    <TableCell
                      classes={{ root: styles.TableCell }}
                      align="center"
                    >
                      {formatDate(order.createdAt)}
                    </TableCell>
                    <TableCell
                      classes={{ root: styles.TableCell }}
                      align="right"
                    >
                      ${order.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Loading className={styles.Loading} />
        )}
      </Box>
    </>
  );
};

export default MyItem;
