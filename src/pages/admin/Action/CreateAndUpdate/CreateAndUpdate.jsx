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
import * as Yup from "yup";

import { BaseButton } from "~/components/Button/Button";
import { ContainedTextField } from "~/components/TextField/TextField";
import { itemApi } from "~/libs/helpers/axios";
import styles from "./CreateAndUpdate.module.scss";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { messages } from "~/utils/messages";
import storage from "~/libs/helpers/localStorage";

const initialState = {
  title: "",
  desc: "",
  img: null,
  typeOfOptions: [],
};

const CreateAndUpdate = ({ open, setOpen, callback, id }) => {
  const [loading, setLoading] = useState(false);
  const title = id ? "Update Item" : "Create New Item";

  const { register, formState, handleSubmit, reset, clearErrors, control } =
    useForm({
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
          typeOfOptions: Yup.array()
            .min(1, messages.min("Options", 1))
            .ensure(),
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
  const previewImg = useWatch({ name: "img", control });

  useEffect(() => {
    const getItemById = async () => {
      try {
        if (open && id === null) {
          reset(initialState);
        } else if (open && id !== null) {
          const res = await itemApi().get(id);
          if (res.data) {
            reset({
              title: res.data.title,
              desc: res.data.desc,
              img: res.data.img,
              typeOfOptions: res.data.typeOfOptions,
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getItemById();
  }, [id, reset, open]);

  const handleClose = () => {
    setOpen(false);
  };

  const previewImage = () => {
    if (!previewImg) return "/img/pets.jpg";
    if (typeof previewImg === "string") return previewImg;
    return URL.createObjectURL(previewImg[0]);
  };

  const handlePost = async (data, id) => {
    const res = id
      ? await itemApi(storage.getAccessToken()).update(id, data)
      : await itemApi(storage.getAccessToken()).post(data);
    if (res.data) return res;
  };

  const handleFormSubmit = async (values) => {
    const myData = new FormData();
    myData.append("file", values.img[0]);
    myData.append("upload_preset", "pet-websites");
    setLoading(true);
    const cheapestPrice = values.typeOfOptions.reduce((acc, initialValue) => {
      return acc.price < initialValue.price ? acc : initialValue;
    });
    try {
      const uploadRes =
        typeof values.img === "string"
          ? values.img
          : await axios.post(
              "https://api.cloudinary.com/v1_1/dw0r3ayk2/image/upload",
              myData,
              {
                "Access-Control-Allow-Credentials": true,
                withCredentials: false,
              }
            );
      const res = id
        ? await handlePost(
            {
              ...values,
              img:
                typeof values.img === "string" ? uploadRes : uploadRes.data.url,
              cheapestPrice: cheapestPrice.price,
            },
            id
          )
        : await handlePost({
            ...values,
            img: uploadRes.data.url,
            cheapestPrice: cheapestPrice.price,
          });
      if ([200, 201].includes(res.status) && res.data) {
        setLoading(false);
        reset(initialState);
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
                helperText={formState.errors.title?.message}
                error={!!formState.errors.title}
                disabled={loading}
              />
              <ContainedTextField
                label="Description"
                name="desc"
                type="text"
                placeholder="The Siberian Husky is a medium-sized ..."
                {...register("desc")}
                helperText={formState.errors.desc?.message}
                error={!!formState.errors.desc}
                disabled={loading}
              />
              <BaseButton
                primary
                size="large"
                component="label"
                endIcon={<CameraAltIcon />}
                disabled={loading}
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
                {formState.errors.img?.message}
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
                  helperText={formState.errors?.extraTitle?.message}
                  error={formState.errors.extraTitle?.message}
                  disabled={loading}
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
                  helperText={formState.errors?.price?.message}
                  error={formState.errors.price?.message}
                  disabled={loading}
                />
              </Box>
              <Box component="span" className={styles.ErrorMessage}>
                {formState.errors.typeOfOptions?.message}
              </Box>
              <BaseButton
                className={styles.Btn}
                primary
                disabled={loading}
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
                        disabled={loading}
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
            <img src={previewImage()} alt="preview" name="preview" />
            <Typography variant="h1">
              {useWatch({ name: "title", control })}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default CreateAndUpdate;
