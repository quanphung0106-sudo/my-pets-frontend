import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  CircularProgress,
  Dialog,
  IconButton,
} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import { reset } from "~/redux/cartSlice";
import { messages } from "~/utils/messages";
import { BaseButton } from "../Button/Button";
import { ContainedTextField } from "../TextField/TextField";
import styles from "./Modal.module.scss";
import { orderApi } from "~/libs/helpers/axios";

const Modal = ({ total, setOpen, open }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const cartProducts = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, formState, handleSubmit } = useForm({
    defaultValues: {
      customer: "",
      phoneNumber: "",
      address: "",
    },
    mode: "all",
    resolver: yupResolver(
      Yup.object({
        customer: Yup.string()
          .max(25, messages.maxLength("Name", 25))
          .required(messages.requiredField("Name")),
        phoneNumber: Yup.string().required(
          messages.requiredField("Phone Number")
        ),
        address: Yup.string()
          .min(20, messages.minLength("Address", 20))
          .max(200, messages.maxLength("Address", 200))
          .required(messages.requiredField("Address")),
      })
    ),
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitForm = async (values) => {
    const { customer, phoneNumber, address } = values;
    setLoading(true);
    const products = cartProducts.map((product) => ({
      _id: product._id,
      check: product.check,
      img: product.img,
      title: product.title,
      quantity: product.quantity,
      total: product.total,
    }));
    const data = {
      userId: user ? user?._id : null,
      products,
      total,
      customer,
      phoneNumber,
      address,
      method: 0,
    };
    try {
      const res = user
        ? await orderApi.post(data)
        : await orderApi.postNoUser(data);
      setError(false);
      if (res.status === 201) {
        dispatch(reset());
        navigate(`/orders/${res.data._id}`);
      }
    } catch (err) {
      setError(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle onClose={handleClose}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        You will pay <Box component="b">${total}</Box> after delivery.
      </DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <Box
          component="form"
          onSubmit={handleSubmit(handleSubmitForm)}
          className={styles.ContentWrapper}
        >
          <ContainedTextField
            label="Name"
            name="Name"
            type="text"
            placeholder="John Doe"
            spellCheck="false"
            {...register("customer")}
            helperText={formState.errors.customer?.message}
            error={!!formState.errors.customer}
          >
            Hello
          </ContainedTextField>
          <ContainedTextField
            label="Phone Number"
            name="Phone Number"
            type="number"
            placeholder="0935 5xx xxx"
            {...register("phoneNumber")}
            helperText={formState.errors.phoneNumber?.message}
            error={!!formState.errors.phoneNumber}
          >
            Hello
          </ContainedTextField>
          <ContainedTextField
            label="Address"
            name="Address"
            type="text"
            placeholder="512 Truong Chinh, Cam Le, Da Nang"
            {...register("address")}
            spellCheck="false"
            helperText={formState.errors.address?.message}
            error={!!formState.errors.address}
          >
            Hello
          </ContainedTextField>
          <BaseButton
            primary
            disabled={loading}
            type="submit"
            startIcon={loading && <CircularProgress size={20} />}
          >
            ORDER NOW!
          </BaseButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
