import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import styles from './Featured.module.scss';
import HomeBackground from '~/assets/images/home-background.png';
import KissPet from '~/assets/images/kiss-pet.png';
import { BaseButton } from '../Button/Button';

const Featured = () => {
  return (
    <Box className={styles.Container}>
      <Grid container className={styles.ImgContainer} lg={12}>
        <img className={styles.HomeBackground} src={HomeBackground} alt="homeBackground" />
        <Grid container className={styles.Items}>
          <Grid className={styles.Item} lg={6}>
              <Grid className={styles.Texts}>
                <Typography variant="h1">We make pets pretty!</Typography>
                <Typography variant="body1">
                  They were very nice to Russy and he enjoyed getting his hair cut together with the other dogs.
                </Typography>
                <BaseButton ghost>READ MORE</BaseButton>
              </Grid>
          </Grid>
          <Grid className={styles.Item} lg={6}>
            <img className={`${styles.subImg}`} src={KissPet} alt="kissPet" />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Featured;
