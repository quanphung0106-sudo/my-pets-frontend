import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import EastIcon from "@mui/icons-material/East";
import {
  CircularProgress,
  IconButton,
  Popover,
  Tooltip,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { orderApi } from "~/libs/helpers/axios";
import storage from "~/libs/helpers/localStorage";
import { showNotification } from "~/redux/notificationSlice";
import { notificationMessage } from "~/utils/messages";
import styles from "./style.module.scss";

const UpdateStatus = ({ data, id, callback }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const openPopover = Boolean(anchorEl);
  const order = data.filter((order) => order._id === id)[0];
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatus = async () => {
    setLoading(true);
    const currentStatus = order.status;
    try {
      const res = await orderApi(storage.getAccessToken()).updateStatus(id, {
        status: currentStatus + 1,
      });
      if (res.data) {
        dispatch(
          showNotification({
            message: notificationMessage.update("Order status"),
          })
        );
        callback();
        setAnchorEl(null);
      }
    } catch (err) {
      dispatch(
        showNotification({
          message: notificationMessage.error(),
          type: "error",
        })
      );
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton onClick={handleClick} disabled={order.status === 2}>
        <Tooltip title="Update status">
          <EastIcon />
        </Tooltip>
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
          onClick={handleStatus}
        >
          {loading ? <CircularProgress size="24px" /> : <CheckIcon />}
        </IconButton>
      </Popover>
    </>
  );
};

export default UpdateStatus;
