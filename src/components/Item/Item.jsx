import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";

import { itemApi } from "~/libs/helpers/axios";
import useFetch from "~/libs/hooks/useFetch";
import { BaseButton } from "../Button/Button";
import Loading from "../Loading/Loading";
import styles from "./Item.module.scss";

const Item = ({ data, loading }) => {
  if (loading) return <Loading className={styles.Loading} />;
  return (
    <>
      {data?.map((data) => (
        <Grid
          container
          className={styles.Container}
          key={data._id}
          sm={4}
          md={3}
          lg={3}
        >
          <Grid className={styles.Top} lg={12}>
            <Link to={`/products/${data._id}`}>
              <Box component="img" src={data.img} alt="items" />
            </Link>
            {data.sellItem !== 0 ? (
              <Typography variant="body1" className={styles.Sale}>
                Sale
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid className={styles.Bottom} lg={12}>
            <Typography variant="h2">{data.title}</Typography>

            <Typography variant="body1" classes={{ body1: styles.Body1 }}>
              {data.sellItem !== 0 ? (
                <>
                  $
                  {data.typeOfOptions[0].price -
                    (data.typeOfOptions[data.typeOfOptions.length - 1].price *
                      data.sellItem) /
                      100}
                  -
                  {data.typeOfOptions[1].price -
                    (data.typeOfOptions[data.typeOfOptions.length - 1].price *
                      data.sellItem) /
                      100}
                  <Typography
                    component="span"
                    variant="body2"
                    classes={{ body2: styles.Body2 }}
                  >
                    (-{data.sellItem}%)
                  </Typography>
                </>
              ) : (
                `$${data.typeOfOptions[0].price}`
              )}
            </Typography>
            <BaseButton to={`/products/${data._id}`} ghost>
              View Options
            </BaseButton>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default Item;
