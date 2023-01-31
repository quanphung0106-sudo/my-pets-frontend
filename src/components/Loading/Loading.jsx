import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import clsx from "clsx";
import styles from "./Loading.module.scss";

export default function Loading({ className }) {
  return (
    <Box className={clsx(styles.Loading, className)}>
      <Typography variant="h1">Đang tải tài nguyên, vui lòng chờ</Typography>
      <CircularProgress classes={{ root: styles.LoadingIcon }} />
    </Box>
  );
}
