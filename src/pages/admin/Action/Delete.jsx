import {
  CircularProgress,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { itemApi, orderApi, userApi } from "~/libs/helpers/axios";
import styles from "./style.module.scss";
import storage from "~/libs/helpers/localStorage";
import { useDispatch } from "react-redux";
import { showNotification } from "~/redux/notificationSlice";
import { notificationMessage } from "~/utils/messages";

const Delete = ({ id, name, callback }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const openPopover = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteItem = async () => {
    setLoading(true);
    try {
      switch (name) {
        case "products":
          const productRes = await itemApi(storage.getAccessToken()).delete(id);
          if (productRes.status === 200) {
            setAnchorEl(null);
            dispatch(
              showNotification({ message: notificationMessage.delete("Item") })
            );
            callback();
          }
          break;
        case "orders":
          const orderRes = await orderApi(storage.getAccessToken()).delete(id);
          if (orderRes.status === 200) {
            console.log(orderRes);
            setAnchorEl(null);
            dispatch(
              showNotification({ message: notificationMessage.delete("Order") })
            );
            callback();
          }
          break;
        case "users":
          const userRes = await userApi(storage.getAccessToken()).delete(id);
          if (userRes.status === 200) {
            setAnchorEl(null);
            dispatch(
              showNotification({ message: notificationMessage.delete("User") })
            );
            callback();
          }
          break;

        default:
          break;
      }
    } catch (err) {
      dispatch(
        showNotification({
          message: notificationMessage.error(),
          type: "error",
        })
      );
      console.log(err);
    }
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        classes={{ paper: styles.Paper }}
      >
        <Typography sx={{ p: 2 }}>Are you sure?</Typography>
        <IconButton
          className={styles.ClearIcon}
          onClick={() => setAnchorEl(null)}
        >
          <ClearIcon />
        </IconButton>
        <IconButton
          className={styles.AcceptIcon}
          disabled={loading}
          onClick={handleDeleteItem}
        >
          {loading ? <CircularProgress size="24px" /> : <CheckIcon />}
        </IconButton>
      </Popover>
    </>
  );
};

export default Delete;
