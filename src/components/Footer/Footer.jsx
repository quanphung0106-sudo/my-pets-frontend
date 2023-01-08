import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <Box className={styles.Container}>
      <Grid
        container
        sx={{
          display: { xs: 'none', sm: 'none', lg: 'flex' },
        }}
        className={styles.Left}
        lg={4}
      >
        <Box className={styles.ImgContainer}>
          <img src="/img/footer.jpg" alt="footer" />
        </Box>
      </Grid>
      <Grid container className={styles.Right} lg={8}>
        <Grid className={styles.Texts} lg={4}>
          <Typography variant="h1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</Typography>
        </Grid>
        <Grid className={styles.Texts} lg={4}>
          <Typography variant="h1">find our shop</Typography>
          <Box className={styles.TextWrapper}>
            <Typography variant="body1">50 Nguyễn Xuân Hữu, Đà Nẵng</Typography>
            <Typography variant="body1">42 Cống Quỳnh, Cẩm Lệ, Đã Nẵng</Typography>
            <Typography variant="body1">52 Cách Mạng Tháng 8, Đà Nẵng</Typography>
          </Box>
          <Box className={styles.TextWrapper}>
            <Typography variant="body1">Số 2/47, Nguyễn Khả Trạc, Hà Nội</Typography>
            <Typography variant="body1">Số nhà 88, ngõ 79 Cầu Giấy, Hà Nội</Typography>
            <Typography variant="body1">Số 7 Đại Lộ Thăng Long, Hà Nội</Typography>
          </Box>
          <Box className={styles.TextWrapper}>
            <Typography variant="body1">Số 1 Công xã Paris, Quận 1, thành phố Hồ Chí Minh</Typography>
            <Typography variant="body1">Số 135 đường Nam Kỳ Khởi Nghĩa, thành phố Hồ Chí Minh</Typography>
            <Typography variant="body1"> Số 125 Công xã Paris, Bến Nghé, Quận 1</Typography>
          </Box>
        </Grid>
        <Grid className={styles.Texts} lg={4}>
          <Typography variant="h1">working hour</Typography>
          <Box className={styles.TextWrapper}>
            <Typography variant="body1">MONDAY ULTI FRIDAY</Typography>
            <Typography variant="body1">9:00 - 22:00</Typography>
          </Box>
          <Box className={styles.TextWrapper}>
            <Typography variant="body1">SATURDAY - SUNDAY</Typography>
            <Typography variant="body1">12:00 - 24:00</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
