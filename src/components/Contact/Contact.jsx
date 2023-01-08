import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';

import styles from './Contact.module.scss';
import { BaseButton } from '../Button/Button';
import { ContainedTextField } from '../TextField/TextField';

const Contact = () => {
  return (
    <Box className={styles.Container}>
      <Grid container className={styles.FormContainer} lg={12}>
        <Grid className={styles.Left} lg={6}>
          <Grid container className={styles.ContentWrapper}>
            <Typography variant="h1">Contact us</Typography>
            <Grid className={styles.Texts}>
              <Typography variant="body1">3045 10 Sunrize Avenue, 123-456-7890</Typography>
              <Typography variant="body1">Mon – Fri: 9:00 am – 8:00 pm</Typography>
              <Typography variant="body1">Sat – Sun: 9:00 am – 10 pm</Typography>
              <Typography variant="body1" className={styles.Email}>
                contacts@gmail.com
              </Typography>
            </Grid>
            <Grid container className={styles.IconWrapper}>
              <FacebookOutlinedIcon className={styles.Icon} />
              <TwitterIcon className={styles.Icon} />
              <InstagramIcon className={styles.Icon} />
              <GoogleIcon className={styles.Icon} />
            </Grid>
          </Grid>
        </Grid>
        <Grid className={styles.Right} lg={6}>
          <Grid container className={styles.InputWrapper}>
            <ContainedTextField type="text" placeholder="Enter your name" />
            <ContainedTextField type="email" placeholder="Enter a valid email address" />
            <ContainedTextField type="text" placeholder="Enter your message" />
            <BaseButton primary>SUBMIT</BaseButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
