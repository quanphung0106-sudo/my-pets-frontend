import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import RegisterImage from "~/assets/images/register-background.png";
import { BaseButton } from "~/components/Button/Button";
import { LineTextField } from "~/components/TextField/TextField";
import { userApi } from "~/libs/helpers/axios";
import { messages } from "~/utils/messages";
import styles from "./Register.module.scss";

export default function Register() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up("sm"));
  const { register, formState, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
    resolver: yupResolver(
      Yup.object({
        username: Yup.string()
          .min(5, messages.minLength("Username", 5))
          .max(30, messages.maxLength("Username", 30))
          .required(messages.requiredField("Username")),
        email: Yup.string()
          .email(messages.email)
          .min(5, messages.minLength("Email", 5))
          .max(50, messages.maxLength("Email", 50))
          .required(messages.requiredField("Email")),
        password: Yup.string().required(messages.requiredField("Password")),
        confirmPassword: Yup.string()
          .when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              messages.notMatchPassword
            ),
          })
          .required(messages.requiredField("Confirm password")),
      })
    ),
  });

  const handleFormSubmit = async (values) => {
    const { username, email, password } = values;
    setLoading(true);
    try {
      const res = await userApi().register({ username, email, password });
      setError(false);
      if (res.status === 200) return setSuccess(true);
    } catch (err) {
      setError(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Stack
      className={styles.Register}
      alignItems="center"
      justifyContent="center"
    >
      <Stack className={styles.Container} direction="row">
        {upSm && (
          <Stack
            className={styles.ImgContainer}
            justifyContent="center"
            flex="1"
          >
            <Stack className={styles.Texts} gap="50px">
              <Typography variant="h1">Welcome, My Friend!</Typography>
              <Typography variant="body1">
                A pet, or companion animal, is an animal kept primarily for a
                person's company or entertainment rather than as a working
                animal, livestock, or a laboratory animal.
              </Typography>
              <Stack className={styles.Account}>
                <Typography variant="body2">
                  Do you already have an account?
                </Typography>
                <BaseButton to="/signin" ghost>
                  Sign in
                </BaseButton>
              </Stack>
            </Stack>
            <img src={RegisterImage} alt="register" />
          </Stack>
        )}
        <Stack className={styles.Form} flex="1" justifyContent="center">
          <Stack className={styles.Texts}>
            {!error && <Typography variant="h1">Register</Typography>}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Dialog open={true}>
                <DialogTitle sx={{ fontSize: "2.4rem", fontWeight: "bold" }}>
                  Welcome to Pet Website.
                </DialogTitle>
                <DialogContent
                  dividers
                  sx={{ borderBottom: "none", height: 100 }}
                >
                  We sent you an email with an access link. Please check your
                  inbox.
                </DialogContent>
                <DialogActions>
                  <BaseButton primary to="/signin">
                    Done!
                  </BaseButton>
                </DialogActions>
              </Dialog>
            )}
            <Stack
              component="form"
              onSubmit={handleSubmit(handleFormSubmit)}
              data-testid="logup-form"
            >
              <LineTextField
                label="Username"
                type="text"
                spellCheck="false"
                data-testid="account-username"
                placeholder="Enter your username"
                {...register("username", {
                  onChange: () => setError(""),
                })}
                InputLabelProps={{ shrink: true }}
                helperText={formState.errors.username?.message}
                error={!!formState.errors.username}
              />
              <LineTextField
                label="Email"
                type="email"
                spellCheck="false"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter your email"
                {...register("email", {
                  onChange: () => setError(""),
                })}
                helperText={formState.errors.email?.message}
                error={!!formState.errors.email}
              />
              <LineTextField
                label="Password"
                type={showPassword ? "text" : "password"}
                spellCheck="false"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" onClick={handleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </InputAdornment>
                  ),
                }}
                {...register("password", {
                  onChange: () => setError(""),
                })}
                helperText={formState.errors.password?.message}
                error={!!formState.errors.password}
              />
              <LineTextField
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                spellCheck="false"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" onClick={handleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </InputAdornment>
                  ),
                }}
                {...register("confirmPassword", {
                  onChange: () => setError(""),
                })}
                helperText={formState.errors.confirmPassword?.message}
                error={!!formState.errors.confirmPassword}
              />
              <BaseButton
                className={styles.Btn}
                primary
                disabled={loading}
                data-testid="button"
                type="submit"
                startIcon={loading && <CircularProgress size={20} />}
              >
                Register
              </BaseButton>
              {!upSm && (
                <Stack gap="10px" marginTop="20px">
                  <Typography variant="body2">
                    Do you already have an account?
                  </Typography>
                  <BaseButton className={styles.Btn} to="/signin" ghost>
                    Sign in
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
