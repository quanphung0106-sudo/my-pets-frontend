import { Stack, Typography } from "@mui/material";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <Stack className={styles.Container} direction="row">
      <Stack
        sx={{
          display: { xs: "none", sm: "none", lg: "flex" },
        }}
        className={styles.Left}
      >
        <Stack component="img" src="/img/footer.jpg" alt="footer" />
      </Stack>
      <Stack className={styles.Right} direction="column">
        <Stack className={styles.Texts} display={{ xs: "none", sm: "block" }}>
          <Typography variant="h1">
            A pet is a domesticated animal that lives with people, but is not
            forced to work and is not eaten, in most instances. In most cases, a
            pet is kept to entertain people or for companionship. Some pets such
            as dogs and cats are placed in an animal shelter if there is no one
            willing to take care of them.
          </Typography>
        </Stack>
        <Stack direction={{ xs: "column", sm: "row", lg: "row" }}>
          <Stack className={styles.Texts}>
            <Typography variant="h1">find our shop</Typography>
            <Stack className={styles.TextWrapper}>
              <Typography variant="body1">
                50 Nguyễn Xuân Hữu, Đà Nẵng
              </Typography>
              <Typography variant="body1">
                42 Cống Quỳnh, Cẩm Lệ, Đã Nẵng
              </Typography>
              <Typography variant="body1">
                52 Cách Mạng Tháng 8, Đà Nẵng
              </Typography>
            </Stack>
            <Stack className={styles.TextWrapper}>
              <Typography variant="body1">
                Số 2/47, Nguyễn Khả Trạc, Hà Nội
              </Typography>
              <Typography variant="body1">
                Số nhà 88, ngõ 79 Cầu Giấy, Hà Nội
              </Typography>
              <Typography variant="body1">
                Số 7 Đại Lộ Thăng Long, Hà Nội
              </Typography>
            </Stack>
            <Stack className={styles.TextWrapper}>
              <Typography variant="body1">
                Số 1 Công xã Paris, Quận 1, thành phố Hồ Chí Minh
              </Typography>
              <Typography variant="body1">
                Số 135 đường Nam Kỳ Khởi Nghĩa, thành phố Hồ Chí Minh
              </Typography>
              <Typography variant="body1">
                {" "}
                Số 125 Công xã Paris, Bến Nghé, Quận 1
              </Typography>
            </Stack>
          </Stack>
          <Stack
            className={styles.Texts}
            display={{ xs: "block", sm: "block" }}
          >
            <Typography variant="h1">working hour</Typography>
            <Stack className={styles.TextWrapper}>
              <Typography variant="body1">MONDAY ULTI FRIDAY</Typography>
              <Typography variant="body1">9:00 - 22:00</Typography>
            </Stack>
            <Stack className={styles.TextWrapper}>
              <Typography variant="body1">SATURDAY - SUNDAY</Typography>
              <Typography variant="body1">12:00 - 24:00</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Footer;
