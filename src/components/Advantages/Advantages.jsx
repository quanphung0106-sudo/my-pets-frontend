import { Stack, Typography } from "@mui/material";

import Advantages1 from "~/assets/images/advantages-1.png";
import Advantages2 from "~/assets/images/advantages-2.png";
import Advantages3 from "~/assets/images/advantages-3.png";
import Advantages4 from "~/assets/images/advantages-4.png";
import { BaseButton } from "../Button/Button";
import styles from "./Advantages.module.scss";

const data = [
  {
    id: 1,
    img: Advantages1,
    title: "Dog Trainings",
  },
  {
    id: 2,
    img: Advantages2,
    title: "Advanced Training",
  },
  {
    id: 3,
    img: Advantages3,
    title: "Health Checks",
  },
  {
    id: 4,
    img: Advantages4,
    title: "Dog Tricks",
  },
];

const Advantages = () => {
  return (
    <Stack className={styles.Advantages} alignItems="center">
      <Stack
        className={styles.Container}
        alignItems="flex-start"
        gap={{ xs: "20px", sm: "30px", lg: "50px" }}
      >
        <Stack
          className={styles.ContentWrapper}
          direction={{ sm: "column", lg: "row" }}
          justifyContent="space-between"
          gap={{ xs: "20px", sm: "30px", lg: "50px" }}
          flexWrap="wrap"
        >
          {data.map((data) => (
            <Stack
              className={styles.TextsWrapper}
              key={data.id}
              direction="row"
              gap="25px"
            >
              <Stack className={styles.IconWrapper} lg={6}>
                <img src={data.img} alt="icon" />
              </Stack>
              <Stack className={styles.Texts} lg={6}>
                <Typography variant="h1">{data.title}</Typography>
                <Typography variant="body1">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
        <Stack className={styles.BoxWrapper}>
          <Typography variant="h2">
            Article evident arrived express highest men did boy. Mistress
            sensible entirely am so. Quick can manor smart money hopes worth
            too. Comfort produce husband boy her had hearing. Law others theirs
            passed but wishes. You day real less till dear read. Considered use
            dispatched melancholy sympathize discretion led. Oh feel if up to
            till like. He an thing rapid these after going drawn or.
          </Typography>
          <BaseButton ghost>READ MORE</BaseButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Advantages;
