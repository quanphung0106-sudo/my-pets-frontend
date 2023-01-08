import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import Arrow from '~/assets/images/arrow.png';
import styles from './ListData.module.scss';

const ListData = () => {
  const datas = [
    {
      id: 1,
      number: '8827',
      span: 'HAPPY DOG OWNERS',
      text: 'Sample text. Click to select the text box. Click again or double click to start editing the text.',
    },
    {
      id: 2,
      number: 'only 10',
      span: 'MINUTES OF DAILY TRAINING TIME NEEDED',
      text: 'Sample text. Click to select the text box. Click again or double click to start editing the text.',
    },
    {
      id: 3,
      number: '$650',
      span: 'AVERAGE SAVINGS COMPARED TO IN-PERSON CLASSES',
      text: 'Sample text. Click to select the text box. Click again or double click to start editing the text.',
    },
    {
      id: 4,
      number: '219.844',
      span: 'TOTAL TRAINING VIDEO VIEWS',
      text: 'Sample text. Click to select the text box. Click again or double click to start editing the text.',
    },
  ];

  return (
    <Box className={styles.Container}>
      <Grid container className={styles.Left} lg={6}>
        <Grid container className={styles.Card}>
          <Typography variant="h1">
            Join thousands of Happy Dog Owners Who Have Successfully Completed Our Courses.
          </Typography>
          <Typography variant="body1">
            By following our programs, you will see definite changes in your dog’s behavior after one month. However,
            many owners report that their dogs a a lot better after as little as two weeks!
          </Typography>
          <Box className={styles.ImgWrapper}>
            <img src={Arrow} alt="arrow" />
          </Box>
        </Grid>
      </Grid>
      <Grid container className={styles.Right} lg={6}>
        {datas.map((data) => (
          <Grid className={styles.Texts} key={data.id} lg={6}>
            <Typography variant="h2">{data.number}</Typography>
            <Typography variant="h3">{data.span}</Typography>
            <Typography variant="body1">{data.text}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListData;
