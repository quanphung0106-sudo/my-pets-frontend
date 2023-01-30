import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import {
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Bake from "~/assets/images/bake.png";
import Bike from "~/assets/images/bike.png";
import Checked from "~/assets/images/checked.png";
import Delivered from "~/assets/images/delivered.png";
import Paid from "~/assets/images/paid.png";
import BaseDataGrid from "~/components/BaseDataGrid/BaseDataGrid";
import { BaseButton } from "~/components/Button/Button";
import useFetch from "~/libs/hooks/useFetch";
import styles from "./Order.module.scss";

const Order = () => {
  const user = useSelector((state) => state.user.user);
  const params = useParams();
  const navigate = useNavigate();
  const { data, loading } = useFetch("orders", params.id, user ? user : null);
  const status = data.status;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "img",
      headerName: "Product",
      sortable: false,
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <Stack
          className={styles.CellImage}
          sx={{ objectFit: "cover" }}
          component="img"
          src={params.value}
          alt="product"
        />
      ),
    },
    {
      field: "title",
      headerName: "Name",
      editable: true,
      minWidth: 180,
      flex: 1,
      renderCell: (params) => {
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
        </Tooltip>;
      },
    },
    {
      field: "check",
      headerName: "Option",
      sortable: false,
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
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
      ),
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "right",
      align: "right",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
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

  const orderList = data.products?.map((item, index) => {
    return {
      id: ++index,
      idItem: item._id,
      img: item.img,
      title: item.title,
      check: item.check.title,
      price: item.check.price,
      quantity: item.quantity,
      total: item.total,
    };
  });

  return (
    <Stack
      className={styles.Container}
      direction="row"
      justifyContent={{ lg: "center" }}
    >
      <Stack
        className={styles.Wrapper}
        direction={{ xs: "column", sm: "column", lg: "row" }}
        gap="15px"
      >
        <Stack
          className={styles.Left}
          direction={{ xs: "column", sm: "column", lg: "column" }}
          alignItems="center"
        >
          <Stack className={styles.ButtonWrapper} alignItems="flex-start">
            <BaseButton
              startIcon={<ArrowBackOutlinedIcon />}
              primary
              onClick={() => navigate(-1)}
            >
              Back to order list
            </BaseButton>
            <Typography variant="body1">
              *Warning: You should store the "Order Code" on the right side to
              check the order information.
            </Typography>
          </Stack>
          <>
            {!loading ? (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-around"
                className={styles.DeliveryState}
              >
                <Stack className={statusClass(0)}>
                  <Stack component="img" src={Paid} alt="Paid" />
                  <Stack component="span">Payment</Stack>
                  <Stack
                    component="img"
                    className={styles.checkedIcon}
                    src={Checked}
                    alt="CheckedImg"
                  />
                </Stack>
                <Stack className={statusClass(1)}>
                  <Stack component="img" src={Bake} alt="Bake" />
                  <Stack component="span">Preparing</Stack>
                  <Stack
                    component="img"
                    className={styles.checkedIcon}
                    src={Checked}
                    alt="CheckedImg"
                  />
                </Stack>
                <Stack className={statusClass(2)}>
                  <Stack component="img" src={Bike} alt="Bike" />
                  <Stack component="span">On the way</Stack>
                  <Stack
                    component="img"
                    className={styles.checkedIcon}
                    src={Checked}
                    alt="CheckedImg"
                  />
                </Stack>
                <Stack className={statusClass(3)}>
                  <Stack component="img" src={Delivered} alt="Delivered" />
                  <Stack component="span">Delivered</Stack>
                  <Stack
                    component="img"
                    className={styles.checkedIcon}
                    src={Checked}
                    alt="CheckedImg"
                  />
                </Stack>
              </Stack>
            ) : (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-around"
                className={styles.DeliveryState}
              >
                {Array.apply(null, { length: 4 }).map((skeleton, index) => (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    key={index}
                    className={statusClass(index)}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="60px"
                      height="60px"
                    />
                    <Skeleton
                      variant="text"
                      sx={{ width: { xs: "60px", sm: "120px", lg: "120px" } }}
                    />
                  </Stack>
                ))}
              </Stack>
            )}
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
            />
          </>
        </Stack>
        <Stack className={styles.Right}>
          <Stack className={styles.TotalWrapper}>
            <Typography variant="h1">Order Information</Typography>
            <List className={styles.List}>
              <ListItem>
                <ListItemText
                  className={styles.ListItemText}
                  primary="Order Code:"
                  secondary={data._id}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  className={styles.ListItemText}
                  primary="Customer:"
                  secondary={data.customer}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  className={styles.ListItemText}
                  primary="Address:"
                  secondary={data.address}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  className={styles.ListItemText}
                  primary="Total:"
                  secondary={`${data.totalPrice}`}
                />
              </ListItem>
            </List>
            <BaseButton disabled primary>
              PAID!
            </BaseButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Order;
