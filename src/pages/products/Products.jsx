import { useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import Item from '~/components/Item/Item';
import styles from './Products.module.scss';
import Search from '~/components/Search/Search';
import { Box, useMediaQuery } from '@mui/material';

const Products = () => {
  const matches = useMediaQuery('(max-width:1023px)');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box>
      <Grid container className={styles.Container} lg={12}>
        <Grid md={12} lg={2} className={styles.Search}>
          <Search />
        </Grid>
        <Grid
          wrap="wrap"
          columnGap={{ xs: 1, sm: 2, lg: 6 }}
          rowGap={{ xs: 1, sm: 2, lg: 6 }}
          container
          md={12}
          lg={10}
          className={`${styles.Items} ${matches ? styles.Tablet : ''}`}
        >
          <Item />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Products;
