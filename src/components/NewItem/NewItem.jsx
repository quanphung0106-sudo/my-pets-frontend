import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, IconButton, ListItem, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import { BaseButton } from "~/components/Button/Button";
import { ContainedTextField } from "~/components/TextField/TextField";
import { itemApi } from '~/libs/helpers/axios';
import styles from "./NewItem.module.scss";

const initialState = {
  title: "",
  desc: "",
  img: null,
  typeOfOptions: [],
};

const Modal = ({ open, setOpen, callback }) => {
  const [data, setData] = useState(initialState);
  const [extra, setExtra] = useState(null);
  const location = useLocation();

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

  const handleDelete = (index) => () => {
    const options = data.typeOfOptions.filter((chips, chipsIndex) => {
      return chipsIndex !== index;
    });
    setData((prev) => {
      return {
        ...prev,
        typeOfOptions: [...options],
      };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "img" ? e.target.files[0] : e.target.value,
    }));
  };

  const handleChangeExtra = (e) => {
    setExtra((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleExtra = () => {
    setData((prev) => {
      return {
        ...prev,
        typeOfOptions: [...prev.typeOfOptions, extra],
      };
    });
  };

  const renderImg = () => {
    if (data.img) {
      if (typeof data.img === "string") return data.img;
      return URL.createObjectURL(data.img);
    }
    return "/img/pets.jpg";
  };

  const handlePost = async (imgRes, id) => {
    const res = id
      ? await itemApi.update(id, {
          ...data,
          img: imgRes.data.url,
        })
      : await itemApi.post({
          ...data,
          img: imgRes.data.url,
        });
    if (res.data) return res;
  };

  const handleCreate = async () => {
    const myData = new FormData();
    myData.append("file", data.img);
    myData.append("upload_preset", "pet-websites");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dw0r3ayk2/image/upload",
        myData,
        {
          "Access-Control-Allow-Credentials": true,
          withCredentials: false,
        }
      );
      const res = id
        ? await handlePost(uploadRes, id)
        : await handlePost(uploadRes);
      if ([200, 201].includes(res.status) && res.data) {
        console.log(res.data);
        callback();
      }
      setOpen(false);
    } catch (err) {
      console.log(err);
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
          <Grid container className={styles.Left} sm={12} lg={8}>
            <Grid sm={12} lg={6}>
              <ContainedTextField
                onChange={handleChange}
                label="Title"
                name="title"
                type="text"
                placeholder="Siberian Husky"
                value={data?.title ? data.title : ""}
              />
              <ContainedTextField
                onChange={handleChange}
                label="Description"
                name="desc"
                type="text"
                placeholder="The Siberian Husky is a medium-sized ..."
                value={data?.desc ? data.desc : ""}
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
                  onChange={handleChange}
                  label="Image"
                  name="img"
                  type="file"
                  accept="image/*"
                />
              </BaseButton>
            </Grid>
            <Grid sm={12} lg={6}>
              <Box className={styles.ExtraPrice}>
                <ContainedTextField
                  onChange={handleChangeExtra}
                  label="Extra Title"
                  name="title"
                  type="text"
                  placeholder="White Coat"
                />
                <ContainedTextField
                  onChange={handleChangeExtra}
                  label="Price"
                  name="price"
                  type="number"
                  placeholder="50"
                />
              </Box>
              <BaseButton primary onClick={handleExtra} className={styles.Btn}>
                Add
              </BaseButton>
              <Box className={styles.ListExtras}>
                {data.typeOfOptions.map((data, index) => {
                  return (
                    <ListItem key={index}>
                      <Chip
                        classes={{ root: styles.Root }}
                        label={
                          <>
                            <Typography variant="span">
                              ${data.price}
                            </Typography>{" "}
                            {data.title}
                          </>
                        }
                        onDelete={handleDelete(index)}
                      />
                    </ListItem>
                  );
                })}
              </Box>
            </Grid>
            <BaseButton primary size="large" onClick={handleCreate}>
              {id ? " Update Item " : "Add product"}
            </BaseButton>
          </Grid>
          <Grid className={styles.Right} sm={12} lg={4}>
            <img src={renderImg()} alt="preview" />
            <Typography variant="h1">{data?.title}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
