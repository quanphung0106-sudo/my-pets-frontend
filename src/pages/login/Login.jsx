import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LoginImage from "~/assets/images/login-background.png";
import { BaseButton } from "~/components/Button/Button";
import { LineTextField } from "~/components/TextField/TextField";
import { userApi } from "~/libs/helpers/axios";
import storage from "~/libs/helpers/localStorage";
import { loginFail, loginStart, loginSuccess } from "~/redux/userSlice";
import { messages } from "~/utils/messages";
import styles from "./Login.module.scss";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  axios.defaults.withCredentials = true;

  const { register, formState, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object({
        username: Yup.string()
          .min(5, messages.minLength("Username", 5))
          .max(30, messages.maxLength("Username", 30))
          .required(messages.requiredField("Username")),
        password: Yup.string().required(messages.requiredField("Password")),
      })
    ),
  });

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      dispatch(loginStart());
      const res = await userApi().login(values);
      storage.setAccessToken(res.data.accessToken);
      storage.setRefreshToken(res.data.refreshToken);
      dispatch(loginSuccess(res.data));
      if (res.data.isAdmin === true) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      if (err.status !== 200) {
        setError(err?.response?.data);
        dispatch(loginFail());
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box padding={{ sm: 4 }} className={styles.Login}>
      <Grid container className={styles.Container} lg={12}>
        <Grid container className={styles.ImgContainer} sm={6} lg={6}>
          <Grid className={styles.Texts}>
            <Typography variant="h1">Welcome Back.</Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              blanditiis nostrum quod, perspiciatis voluptatem nobis ducimus
              modi officiis fuga consequuntur voluptas esse, debitis perferendis
              necessitatibus.
            </Typography>
            <Grid xs={12}>
              <Typography variant="body2">
                Don't you have an account?
              </Typography>
              <BaseButton to="/signup" ghost>
                Register
              </BaseButton>
            </Grid>
          </Grid>
          <img src={LoginImage} alt="login" />
        </Grid>
        <Grid className={styles.Form} sm={6} lg={6}>
          <Grid className={styles.Texts}>
            <Typography variant="h2">Login</Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box
              component="form"
              onSubmit={handleSubmit(handleFormSubmit)}
              data-testid="login-form"
            >
              <LineTextField
                label="Username"
                type="text"
                placeholder="Enter your username"
                spellCheck="false"
                {...register("username")}
                InputLabelProps={{ shrink: true }}
                helperText={formState.errors.username?.message}
                error={!!formState.errors.username}
                InputProps={{
                  inputProps: {
                    "data-testid": "account-username",
                    maxLength: 50,
                  },
                }}
              />
              <LineTextField
                label="Password"
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                data-testid="account-password"
                spellCheck="false"
                {...register("password")}
                InputLabelProps={{ shrink: true }}
                helperText={formState.errors.password?.message}
                error={!!formState.errors.password}
                InputProps={{
                  endAdornment: (
                    <IconButton position="end" onClick={() => setShow(!show)}>
                      {show ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              <BaseButton
                primary
                type="submit"
                disabled={loading}
                disableElevation
                data-testid="login-button"
                startIcon={loading && <CircularProgress size={20} />}
              >
                Sign in
              </BaseButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
