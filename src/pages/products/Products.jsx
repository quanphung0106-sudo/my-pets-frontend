import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Clear from "@mui/icons-material/Clear";
import {
  Autocomplete,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { BaseButton } from "~/components/Button/Button";
import { ContainedTextField } from "~/components/TextField/TextField";
import useFetch from "~/libs/hooks/useFetch";
import styles from "./Products.module.scss";

const initialState = {
  title: "",
  sort: "",
  min: "",
  max: "",
};

const Products = () => {
  const theme = useTheme();
  const downLg = useMediaQuery(theme.breakpoints.down("lg"));
  const [params, setParams] = useState();
  const [disabled, setDisabled] = useState(false);
  const { data, status, loading, reFetch } = useFetch(
    "items",
    null,
    null,
    params
  );

  const { register, handleSubmit, watch, control, reset, resetField } = useForm(
    {
      defaultValues: initialState,
      mode: "all",
      resolver: yupResolver(
        Yup.object({
          title: Yup.string(),
          sort: Yup.string(),
          min: Yup.string(),
          max: Yup.string(),
        })
      ),
    }
  );

  const watchValue = watch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (params !== undefined) {
      setDisabled(true);
      try {
        reFetch();
        if ([200].includes(status)) {
          setDisabled(false);
          setParams();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [params, reset, reFetch, status]);

  const handleFormSubmit = (values) => {
    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        if (values[key] === "" || values[key] === undefined) {
          delete values[key];
        }
      }
    }
    setParams(values);
  };

  return (
    <Stack
      direction="row"
      gap={{ sm: "25px", lg: "25px", xl: "50px" }}
      className={styles.Container}
    >
      <Stack
        alignSelf="flex-start"
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        className={`${styles.Search} ${downLg ? styles.Tablet : ""}`}
      >
        <Stack>
          <Typography variant="h2">Search</Typography>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                disabled={disabled}
                className={styles.Autocomplete}
                fullWidth
                freeSolo
                options={data.map((option) => option.title)}
                {...register("title")}
                renderInput={(params) => {
                  return (
                    <ContainedTextField
                      {...params}
                      className={styles.AutocompleteTextField}
                      placeholder="Search pet..."
                      {...register("title")}
                      InputProps={{
                        ...params.InputProps,
                      }}
                    />
                  );
                }}
              />
            )}
          />
        </Stack>
        <FormControl disabled={disabled}>
          <Typography variant="h2">Sort by</Typography>
          <Controller
            name="sort"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel
                  value="lowest"
                  control={<Radio classes={{ checked: styles.RadioChecked }} />}
                  label="Price (Lowest first)"
                />
                <FormControlLabel
                  value="highest"
                  control={<Radio classes={{ checked: styles.RadioChecked }} />}
                  label="Price (Highest first)"
                />
              </RadioGroup>
            )}
          />
        </FormControl>

        <Stack className={styles.Options}>
          <Typography variant="h2">Options</Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom="15px"
          >
            <Typography>Min price</Typography>
            <Controller
              name="min"
              control={control}
              render={({ field }) => (
                <ContainedTextField
                  {...field}
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  className={styles.AutocompleteTextField}
                  disabled={disabled}
                  InputProps={{
                    endAdornment: (
                      <>
                        {field.value && (
                          <IconButton
                            position="end"
                            onClick={() => resetField("min")}
                            size="small"
                          >
                            <Clear />
                          </IconButton>
                        )}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Max price</Typography>
            <Controller
              name="max"
              control={control}
              render={({ field }) => (
                <ContainedTextField
                  {...field}
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  className={styles.AutocompleteTextField}
                  disabled={disabled}
                  InputProps={{
                    endAdornment: (
                      <>
                        {field.value && (
                          <IconButton
                            position="end"
                            onClick={() => resetField("max")}
                            size="small"
                          >
                            <Clear />
                          </IconButton>
                        )}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Stack>
        </Stack>
        <BaseButton
          type="submit"
          primary
          disableElevation
          disabled={
            JSON.stringify(watchValue) === JSON.stringify(initialState) ||
            disabled
          }
          startIcon={disabled && <CircularProgress size={20} />}
          className={styles.SubmitBtn}
        >
          Submit
        </BaseButton>
        <BaseButton
          primary
          disableElevation
          disabled={
            JSON.stringify(watchValue) === JSON.stringify(initialState) ||
            disabled
          }
          startIcon={disabled && <CircularProgress size={20} />}
          className={styles.SubmitBtn}
          onClick={() => {
            reset(initialState);
            setParams();
            reFetch();
          }}
        >
          Clear
        </BaseButton>
      </Stack>

      <Stack
        className={styles.Items}
        direction="row"
        flexWrap="wrap"
        width="100%"
      >
        {status === 204 && (
          <Stack
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="calc(100vh - 100px)"
          >
            <Typography
              variant="h2"
              fontSize="3.6rem"
              fontWeight={600}
              color="var(--black_40)"
              sx={{ userSelect: "none" }}
            >
              The item you looking for is not found.
            </Typography>
          </Stack>
        )}
        {!loading
          ? data?.map((data) => (
              <Stack className={styles.Item} key={data._id}>
                <Stack className={styles.Top}>
                  <Link to={`/products/${data._id}`}>
                    <LazyLoadImage
                      effect="blur"
                      alt="items"
                      width="100%"
                      height="200px"
                      src={data.img}
                    />
                  </Link>
                  {data.sellItem !== 0 ? (
                    <Typography variant="body1" className={styles.Sale}>
                      Sale
                    </Typography>
                  ) : (
                    ""
                  )}
                </Stack>
                <Stack className={styles.Bottom} gap="15px" alignItems="center">
                  <Typography variant="h2">{data.title}</Typography>
                  <Typography variant="body1" classes={{ body1: styles.Body1 }}>
                    {data.sellItem !== 0 ? (
                      <>
                        $
                        {data.typeOfOptions[0].price -
                          (data.typeOfOptions[data.typeOfOptions.length - 1]
                            .price *
                            data.sellItem) /
                            100}
                        -
                        {data.typeOfOptions[1].price -
                          (data.typeOfOptions[data.typeOfOptions.length - 1]
                            .price *
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
                </Stack>
              </Stack>
            ))
          : Array.apply(null, { length: 8 }).map((skeleton, index) => (
              <Paper key={index} className={styles.Skeleton}>
                <Skeleton
                  sx={{ width: "24rem", height: "15rem", borderRadius: "5px" }}
                  animation="wave"
                  variant="rectangular"
                />
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{ width: "20rem" }}
                />
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{ width: "10rem" }}
                />
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{ width: "14rem", height: "4.2rem" }}
                />
              </Paper>
            ))}
      </Stack>
    </Stack>
  );
};

export default Products;
