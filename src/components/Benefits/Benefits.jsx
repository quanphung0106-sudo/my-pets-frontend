import { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import styles from './Benefits.module.scss';
import { Box, Typography } from '@mui/material';
import { BaseButton } from '../Button/Button';
import Pet from '~/assets/images/pet.png';
import Pets from '~/assets/images/pets.jpg';

const Benefits = () => {
  const [scrollY, setScrollY] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 890 && window.scrollY < 1521) {
        setScrollY(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <Grid container className={styles.Container}>
      <Grid className={styles.Item} lg={12}>
        {scrollY ? (
          <Box className={styles.ImgWrapper}>
            <img className={`${styles.active}`} src={Pet} alt="pet" />
          </Box>
        ) : (
          ''
        )}
      </Grid>
      <Grid className={styles.Item} lg={12}>
        <Box className={styles.ModalContainer}>
          {scrollY ? (
            <Box className={`${styles.ModalWrapper} ${styles.activeModalWrapper}`}>
              <Typography variant="h1">Why Dogs Make You Happy</Typography>
              <Typography variant="body1">
                Quam nulla porttitor massa id neque aliquam vestibulum morbi. Eu consequat ac felis donec et odio
                pellentesque. Turpis nunc eget lorem dolor sed. Ornare quam viverra orci sagittis eu volutpat odio. Sed
                vulputate odio ut enim blandit volutpat.
              </Typography>
              <BaseButton ghost>READ MORE</BaseButton>
            </Box>
          ) : (
            ''
          )}

          {scrollY ? (
            <Box className={`${styles.TextWrapper} ${styles.active}`}>
              <Typography variant="h1">Dogs improve your mood:</Typography>
              <ul>
                <li>Duis are iruhe dolor in</li>
                <li>Expepteur sint occaecat</li>
                <li>Utenim ad minim</li>
                <li>Lorem ipsum dolor</li>
              </ul>
            </Box>
          ) : (
            ''
          )}
        </Box>
      </Grid>
      <Grid className={styles.Item} lg={12}>
        {scrollY ? <img className={`${styles.active}`} src={Pets} alt="pet" /> : ''}
      </Grid>
    </Grid>
  );
};

export default Benefits;
