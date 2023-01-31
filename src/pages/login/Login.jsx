import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert, CircularProgress,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
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
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up("sm"));
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
    <Stack className={styles.Login} justifyContent="center" alignItems="center">
      <Stack className={styles.Container} direction="row">
        {upSm && (
          <Stack
            className={styles.ImgContainer}
            justifyContent="center"
            flex="1"
          >
            <Stack className={styles.Texts} gap="50px">
              <Typography variant="h1">Welcome Back.</Typography>
              <Typography variant="body1">
                A pet, or companion animal, is an animal kept primarily for a
                person's company or entertainment rather than as a working
                animal, livestock, or a laboratory animal.
              </Typography>
              <Stack>
                <Typography variant="body2">
                  Don't you have an account?
                </Typography>
                <BaseButton to="/signup" ghost>
                  Register
                </BaseButton>
              </Stack>
            </Stack>
            <img src={LoginImage} alt="login" />
          </Stack>
        )}
        <Stack className={styles.Form} flex="1" justifyContent="center">
          <Stack className={styles.Texts}>
            <Typography variant="h1">Login</Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Stack
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
                className={styles.Btn}
                primary
                type="submit"
                disabled={loading}
                disableElevation
                data-testid="login-button"
                startIcon={loading && <CircularProgress size={20} />}
              >
                Sign in
              </BaseButton>
              {!upSm && (
                <Stack gap="10px" marginTop="20px">
                  <Typography variant="body2">
                    Don't you have an account?
                  </Typography>
                  <BaseButton className={styles.Btn} to="/signup" ghost>
                    Register
                  </BaseButton>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
