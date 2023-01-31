import { Box, Stack, Typography } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";

import styles from "./Contact.module.scss";
import { BaseButton } from "../Button/Button";
import { ContainedTextField } from "../TextField/TextField";

const Contact = () => {
  return (
    <Stack
      className={styles.Contact}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        className={styles.Container}
        direction={{ xs: "column", sm: "column", lg: "row" }}
        gap="25px"
      >
        <Stack className={styles.Left} flex="1">
          <Stack className={styles.ContentWrapper} gap="20px">
            <Typography variant="h1">Contact us</Typography>
            <Stack className={styles.Texts} gap="10px">
              <Typography variant="body1">
                3045 10 Sunrize Avenue, 123-456-7890
              </Typography>
              <Typography variant="body1">
                Mon – Fri: 9:00 am – 8:00 pm
              </Typography>
              <Typography variant="body1">
                Sat – Sun: 9:00 am – 10 pm
              </Typography>
              <Typography variant="body1" className={styles.Email}>
                contacts@gmail.com
              </Typography>
            </Stack>
            <Stack className={styles.IconWrapper} direction="row">
              <FacebookOutlinedIcon className={styles.Icon} />
              <TwitterIcon className={styles.Icon} />
              <InstagramIcon className={styles.Icon} />
              <GoogleIcon className={styles.Icon} />
            </Stack>
          </Stack>
        </Stack>
        <Stack className={styles.Right} flex="1" justifyContent="space-between">
          <ContainedTextField type="text" placeholder="Enter your name" />
          <ContainedTextField
            type="email"
            placeholder="Enter a valid email address"
          />
          <ContainedTextField type="text" placeholder="Enter your message" />
          <BaseButton primary>SUBMIT</BaseButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Contact;
