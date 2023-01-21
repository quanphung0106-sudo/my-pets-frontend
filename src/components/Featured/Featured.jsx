import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import styles from "./Featured.module.scss";
import HomeBackground from "~/assets/images/home-background.png";
import KissPet from "~/assets/images/kiss-pet.png";
import { BaseButton } from "../Button/Button";

const Featured = () => {
  return (
    <Box className={styles.Container}>
      <Stack className={styles.ImgContainer}>
        <img
          className={styles.HomeBackground}
          src={HomeBackground}
          alt="homeBackground"
        />
        <Stack direction="row" className={styles.Items}>
          <Stack
            alignItems="center"
            justifyContent="center"
            className={styles.Item}
          >
            <Stack width="50%" className={styles.Texts}>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <Typography variant="h1">We make pets pretty!</Typography>
                <Typography variant="body1">
                  They were very nice to Russy and he enjoyed getting his hair
                  cut together with the other dogs.
                </Typography>
                <BaseButton ghost size="large">READ MORE</BaseButton>
              </motion.div>
            </Stack>
          </Stack>
          <Stack className={styles.Item}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <img src={KissPet} alt="kissPet" />
            </motion.div>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Featured;
