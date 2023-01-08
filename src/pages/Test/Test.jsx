import { Box } from '@mui/material';
import React from 'react';
import styles from './Test.module.scss';
import Grid from '@mui/material/Unstable_Grid2';

const Test = () => {
  //sm: tablet
  //xs: mobile
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container className={styles.Container}>
        <Grid
          sx={{
            display: { xs: 'block', sm: 'block', lg: 'block' },
          }}
          xs={12}
          sm={12}
          lg={12}
          className={`${styles.Item} ${styles.Item1}`}
        >
          HEADER
        </Grid>
        <Grid
          xs={12}
          sm={12}
          lg={2}
          className={`${styles.Item} ${styles.Item2}`}
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          SIDEBAR
        </Grid>
        <Grid xs={12} sm={12} lg={10} container className={`${styles.Item} ${styles.Item3}`}>
          <Grid
            justifyContent="center"
            alignItems="center"
            xs={12}
            sm={6}
            lg={4}
            className={`${styles.Article} ${styles.Article1}`}
          >
            Content 1
          </Grid>
          <Grid xs={12} sm={6} lg={4} className={`${styles.Article} ${styles.Article2}`}>
            Content 2
          </Grid>
          <Grid xs={12} sm={6} lg={4} className={`${styles.Article} ${styles.Article3}`}>
            Content 3
          </Grid>
          <Grid xs={12} sm={6} lg={4} className={`${styles.Article} ${styles.Article4}`}>
            Content 4
          </Grid>
          <Grid xs={12} sm={6} lg={4} className={`${styles.Article} ${styles.Article5}`}>
            Content 5
          </Grid>
          <Grid xs={12} sm={6} lg={4} className={`${styles.Article} ${styles.Article6}`}>
            Content 6
          </Grid>
        </Grid>
        <Grid xs={12} sm={12} lg={12} className={`${styles.Item} ${styles.Item4}`}>
          FOOTER
        </Grid>
      </Grid>
    </Box>
  );
};

export default Test;
