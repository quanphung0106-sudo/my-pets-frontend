import { Box, Stack, Typography } from "@mui/material";

import Arrow from "~/assets/images/arrow.png";
import styles from "./ListData.module.scss";

const data = [
  {
    id: 1,
    number: "8827",
    span: "HAPPY DOG OWNERS",
    text: "Sample text. Click to select the text box. Click again or double click to start editing the text.",
  },
  {
    id: 2,
    number: "only 10",
    span: "MINUTES OF DAILY TRAINING TIME NEEDED",
    text: "Sample text. Click to select the text box. Click again or double click to start editing the text.",
  },
  {
    id: 3,
    number: "$650",
    span: "AVERAGE SAVINGS COMPARED TO IN-PERSON CLASSES",
    text: "Sample text. Click to select the text box. Click again or double click to start editing the text.",
  },
  {
    id: 4,
    number: "219.844",
    span: "TOTAL TRAINING VIDEO VIEWS",
    text: "Sample text. Click to select the text box. Click again or double click to start editing the text.",
  },
];

const ListData = () => {
  return (
    <Stack className={styles.ListData} alignItems="center">
      <Stack
        className={styles.Container}
        direction={{ xs: "column-reverse", sm: "column-reverse", lg: "row" }}
        gap={{ xs: "20px", sm: "30px", lg: "50px" }}
      >
        <Stack className={styles.Left} justifyContent="space-around">
          <Typography variant="h1">
            Join thousands of Happy Dog Owners Who Have Successfully Completed
            Our Courses.
          </Typography>
          <Typography variant="body1">
            By following our programs, you will see definite changes in your
            dog’s behavior after one month. However, many owners report that
            their dogs a a lot better after as little as two weeks! A pet, or
            companion animal, is an animal kept primarily for a person's company
            or entertainment rather than as a working animal, livestock, or a
            laboratory animal. Popular pets are often considered to have
            attractive/cute appearances, intelligence.
          </Typography>
          <Box className={styles.ImgWrapper}>
            <img src={Arrow} alt="arrow" />
          </Box>
        </Stack>
        <Stack
          className={styles.Right}
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
          gap={{ xs: "20px", sm: "30px", lg: "50px" }}
        >
          {data.map((data) => (
            <Stack
              className={styles.Texts}
              key={data.id}
              justifyContent="flex-start"
              alignItems="center"
              textAlign="center"
              gap="25px"
            >
              <Typography variant="h1">{data.number}</Typography>
              <Typography variant="h2">{data.span}</Typography>
              <Typography variant="body1">{data.text}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ListData;
