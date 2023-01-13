import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  CircularProgress,
  Dialog,
  IconButton,
  ListItem,
  Typography,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";

import { BaseButton } from "~/components/Button/Button";
import { ContainedTextField } from "~/components/TextField/TextField";
import { itemApi } from "~/libs/helpers/axios";
import styles from "./NewItem.module.scss";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { messages } from "~/utils/messages";

const initialState = {
  title: "",
  desc: "",
  img: null,
  typeOfOptions: [],
};

const Modal = ({ open, setOpen, callback }) => {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [extra, setExtra] = useState(null);
  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    clearErrors,
    control,
    watch,
  } = useForm({
    defaultValues: initialState,
    mode: "all",
    resolver: yupResolver(
      Yup.object({
        title: Yup.string()
          .max(30, messages.minLength("Title", 30))
          .required(messages.requiredField("Title")),
        desc: Yup.string()
          .max(270, messages.minLength("Title", 270))
          .required(messages.requiredField("Description")),
        img: Yup.mixed().required(messages.requiredField("Image")),
        typeOfOptions: Yup.array().min(1, messages.min("Options", 1)).ensure(),
      })
    ),
  });

  const { fields, append, remove } = useFieldArray({
    name: "typeOfOptions",
    control,
  });

  const optionsTitle = useWatch({
    name: "typeOfOptions.title",
    control,
    exact: true,
  });
  const optionsPrice = useWatch({
    name: "typeOfOptions.price",
    control,
    exact: true,
  });

  console.log({
    optionsTitle,
    optionsPrice,
    fields,
    // defaultValues: formState.defaultValues,
    error: errors,
  });

  function getDetailId() {
    if (typeof location === "undefined" || location.pathname.includes("/add"))
      return null;
    if (location.pathname.includes("/edit")) {
      const id = location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1
      );
      return id;
    }
  }

  const id = getDetailId();
  const title = id ? "Update Item" : "Create New Item";

  useEffect(() => {
    const getItemById = async () => {
      try {
        if (id) {
          const res = await itemApi.get(id);
          if (res.data) return setData(res.data);
        }
        setData(initialState);
      } catch (err) {
        console.log(err);
      }
    };
    getItemById();
  }, [id]);

  const handleClose = () => {
    setExtra(null);
    if (id) {
      setData(initialState);
    }
    setError(false);
    setOpen(false);
  };

  const previewImage = () => {
    const previewImg = watch("img", false);
    if (!previewImg) return "/img/pets.jpg";
    if (typeof previewImg === "string") return previewImg;
    return URL.createObjectURL(previewImg[0]);
  };

  const handlePost = async (data, id) => {
    const res = id ? await itemApi.update(id, data) : await itemApi.post(data);
    if (res.data) return res;
  };

  const handleFormSubmit = async (values) => {
    const myData = new FormData();
    myData.append("file", values.img[0]);
    myData.append("upload_preset", "pet-websites");

    setLoading(true);
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dw0r3ayk2/image/upload",
        myData,
        {
          "Access-Control-Allow-Credentials": true,
          withCredentials: false,
        }
      );
      const res = await handlePost({ ...values, img: uploadRes.data.url });
      if ([200, 201].includes(res.status) && res.data) {
        setLoading(false);
        reset();
        callback();
      }
      setOpen(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
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
        {title}
      </DialogTitle>
      <DialogContent>
        <Grid container className={styles.ContentWrapper} rowGap={2}>
          <Grid
            component="form"
            onSubmit={handleSubmit(handleFormSubmit)}
            container
            className={styles.Left}
            sm={12}
            lg={8}
          >
            <Grid sm={12} lg={6}>
              <ContainedTextField
                label="Title"
                name="title"
                type="text"
                placeholder="Siberian Husky"
                {...register("title")}
                helperText={errors.title?.message}
                error={!!errors.title}
              />
              <ContainedTextField
                label="Description"
                name="desc"
                type="text"
                placeholder="The Siberian Husky is a medium-sized ..."
                {...register("desc")}
                helperText={errors.desc?.message}
                error={!!errors.desc}
              />
              <BaseButton
                primary
                size="large"
                component="label"
                endIcon={<CameraAltIcon />}
              >
                Upload
                <input
                  hidden
                  label="Image"
                  name="img"
                  type="file"
                  accept="image/*"
                  {...register("img")}
                />
              </BaseButton>
              <Box component="span" className={styles.ErrorMessage}>
                {errors.img?.message}
              </Box>
            </Grid>
            <Grid sm={12} lg={6}>
              <Box className={styles.ExtraPrice}>
                <ContainedTextField
                  label="Extra Title"
                  name="title"
                  type="text"
                  placeholder="White Coat"
                  {...register("typeOfOptions.title", {
                    onChange: () => {
                      clearErrors("typeOfOptions");
                    },
                  })}
                  helperText={errors?.extraTitle?.message}
                  error={errors.extraTitle?.message}
                />
                <ContainedTextField
                  label="Price"
                  name="price"
                  type="number"
                  placeholder="50"
                  {...register("typeOfOptions.price", {
                    valueAsNumber: true,
                    onChange: () => {
                      clearErrors("typeOfOptions");
                    },
                  })}
                  helperText={errors?.price?.message}
                  error={errors.price?.message}
                />
              </Box>
              <Box component="span" className={styles.ErrorMessage}>
                {errors.typeOfOptions?.message}
              </Box>
              <BaseButton
                className={styles.Btn}
                primary
                onClick={() => {
                  if (
                    optionsTitle !== undefined &&
                    optionsTitle !== "" &&
                    optionsPrice !== undefined &&
                    !isNaN(optionsPrice)
                  ) {
                    append({
                      title: optionsTitle,
                      price: optionsPrice,
                    });
                  }
                }}
              >
                Add
              </BaseButton>
              <Box className={styles.ListExtras}>
                {fields.map((data, index) => {
                  return (
                    <ListItem key={index}>
                      <Chip
                        name="typeOfOptions"
                        classes={{ root: styles.Root }}
                        label={
                          <>
                            <Typography variant="span">
                              ${data.price}
                            </Typography>
                            {data.title}
                          </>
                        }
                        onDelete={() => remove(index)}
                      />
                    </ListItem>
                  );
                })}
              </Box>
            </Grid>
            <BaseButton
              primary
              size="large"
              type="submit"
              disableElevation
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {id ? " Update Item " : "Add product"}
            </BaseButton>
          </Grid>
          <Grid className={styles.Right} sm={12} lg={4}>
            <img src={previewImage()} alt="preview" />
            <Typography variant="h1">
              {useWatch({ name: "title", control })}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
