import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import styles from './Advantages.module.scss';
import Advantages1 from '~/assets/images/advantages-1.png';
import Advantages2 from '~/assets/images/advantages-2.png';
import Advantages3 from '~/assets/images/advantages-3.png';
import Advantages4 from '~/assets/images/advantages-4.png';
import { BaseButton } from '../Button/Button';

const Advantages = () => {
  const datas = [
    {
      id: 1,
      img: Advantages1,
      title: 'Dog Trainings',
    },
    {
      id: 2,
      img: Advantages2,
      title: 'Advanced Training',
    },
    {
      id: 3,
      img: Advantages3,
      title: 'Health Checks',
    },
    {
      id: 4,
      img: Advantages4,
      title: 'Dog Tricks',
    },
  ];

  return (
    <Box className={styles.Container}>
      <Grid container className={styles.ContentWrapper}>
        {datas.map((data) => (
          <Grid container className={styles.TextsWrapper} key={data.id} lg={6}>
            <Grid className={styles.IconWrapper} lg={6}>
              <img src={data.img} alt="icon" />
            </Grid>
            <Grid className={styles.Texts} lg={6}>
              <Typography variant="h1">{data.title}</Typography>
              <Typography variant="body1">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid container className={styles.BoxWrapper}>
        <Grid className={styles.Modal}>
          <Typography variant='h2'>
            Article evident arrived express highest men did boy. Mistress sensible entirely am so. Quick can manor smart
            money hopes worth too. Comfort produce husband boy her had hearing. Law others theirs passed but wishes. You
            day real less till dear read. Considered use dispatched melancholy sympathize discretion led. Oh feel if up
            to till like. He an thing rapid these after going drawn or.
          </Typography>
          <BaseButton ghost>READ MORE</BaseButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Advantages;
