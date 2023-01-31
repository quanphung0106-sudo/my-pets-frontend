import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseButton } from "~/components/Button/Button";

import Delete from "@mui/icons-material/Delete";
import BaseDataGrid from "~/components/BaseDataGrid/BaseDataGrid";
import Modal from "~/components/Modal/Modal";
import ScrollToTop from "~/components/scroll/Scroll";
import { deleteItem, reset } from "~/redux/cartSlice";
import styles from "./Cart.module.scss";

const Cart = () => {
  const items = useSelector((state) => state.cart);
  const [cartList, setCartList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const dispatch = useDispatch();
  const amount = items.totalPriceOfAllProducts;

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
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      sortable: false,
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        if (params.row !== undefined) {
          const data = params.row;
          return (
            <Stack direction="row" alignItems="center">
              <IconButton onClick={() => handleDeleteItem(data, data.id)}>
                <Delete />
              </IconButton>
            </Stack>
          );
        }
      },
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const cartListMapping = items.products?.map((item, index) => {
      return {
        id: ++index,
        idItem: item._id,
        img: item.img,
        title: item.title,
        check: item.check.title,
        price: item.price,
        quantity: item.quantity,
        total: item.total,
      };
    });
    if (cartListMapping) setCartList(cartListMapping);
  }, [items]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClear = () => {
    dispatch(reset());
  };

  const handleDeleteItem = (data, index) => {
    const newArr = items.products?.filter((_item, indexItem) => {
      return indexItem !== index - 1;
    });
    dispatch(
      deleteItem({
        ...newArr,
        quantity: newArr.length,
        totalData: newArr.length,
        products: newArr,
        totalPriceOfAllProducts:
          items.totalPriceOfAllProducts - data.price * data.quantity,
      })
    );
  };

  return (
    <>
      <Stack className={styles.Container} direction="row">
        {items.products.length !== 0 ? (
          <>
            <Stack
              direction={{ xs: "column", sm: "column", lg: "row" }}
              gap="15px"
              className={styles.Wrapper}
            >
              <Stack className={styles.Left}>
                <Stack className={styles.ButtonWrapper} direction="row">
                  <BaseButton
                    startIcon={<ArrowBackOutlinedIcon />}
                    primary
                    to="/products"
                  >
                    Buy more
                  </BaseButton>
                  <BaseButton primary onClick={handleClear}>
                    Clear all
                  </BaseButton>
                </Stack>
                <BaseDataGrid
                  classes={{
                    row: styles.DataGridRow,
                    cell: styles.DataGridCell,
                  }}
                  data={items}
                  columns={columns}
                  rows={cartList}
                  rowPerPage={5}
                  rowsPerPageOptions={[5, 10, 15]}
                />
              </Stack>
              <Stack className={styles.Right}>
                <Stack className={styles.CartTotal}>
                  <Typography variant="h1">Cart Total</Typography>
                  <List className={styles.TotalWrapper}>
                    <ListItem>
                      <ListItemText
                        className={styles.ListItemText}
                        primary="Subtotal"
                        secondary={`${amount}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        className={styles.ListItemText}
                        primary="Discount"
                        secondary="0"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        className={styles.ListItemText}
                        primary="Total"
                        secondary={`${amount}`}
                      />
                    </ListItem>
                  </List>
                  {openPayment ? (
                    <Stack className={styles.PaymentMethod}>
                      <BaseButton ghost onClick={handleClickOpen}>
                        CASH
                      </BaseButton>
                      <BaseButton primary disabled>
                        Paypal
                      </BaseButton>
                    </Stack>
                  ) : (
                    <BaseButton ghost onClick={() => setOpenPayment(true)}>
                      CHECKOUT NOW!
                    </BaseButton>
                  )}
                </Stack>
                {open && (
                  <Modal totalPrice={amount} setOpen={setOpen} open={open} />
                )}
              </Stack>
            </Stack>
          </>
        ) : (
          <Stack direction="column" className={styles.TextWrapper}>
            <h1>Bạn chưa chọn bất kỳ món hàng nào :(</h1>
            <BaseButton primary to="/products">
              Mua ngay!
            </BaseButton>
          </Stack>
        )}
      </Stack>
      <ScrollToTop />
    </>
  );
};

export default Cart;
