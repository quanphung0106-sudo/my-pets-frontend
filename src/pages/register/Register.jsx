import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility } from '@mui/icons-material';
import {
  Alert,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import RegisterImage from '~/assets/images/register-background.png';
import { BaseButton } from '~/components/Button/Button';
import { LineTextField } from '~/components/TextField/TextField';
import {userApi} from '~/libs/helpers/axios';
import { messages } from '~/utils/messages';
import styles from './Register.module.scss';

export default function Register() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, formState, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
    resolver: yupResolver(
      Yup.object({
        username: Yup.string()
          .min(5, messages.minLength('Username', 5))
          .max(30, messages.maxLength('Username', 30))
          .required(messages.requiredField('Username')),
        email: Yup.string()
          .email(messages.email)
          .min(5, messages.minLength('Email', 5))
          .max(50, messages.maxLength('Email', 50))
          .required(messages.requiredField('Email')),
        password: Yup.string().required(messages.requiredField('Password')),
        confirmPassword: Yup.string()
          .when('password', {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf([Yup.ref('password')], messages.notMatchPassword),
          })
          .required(messages.requiredField('Confirm password')),
      }),
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

  return (
    <Box padding={{ sm: 4 }} className={styles.Register}>
      <Grid container className={styles.Container} lg={12}>
        <Grid container className={styles.ImgContainer} sm={6} lg={6}>
          <Grid className={styles.Texts}>
            <Typography variant="h1">Welcome, My Friend!</Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil blanditiis nostrum quod, perspiciatis
              voluptatem nobis ducimus modi officiis fuga consequuntur voluptas esse, debitis perferendis
              necessitatibus.
            </Typography>
            <Box className={styles.Account}>
              <Typography variant="body2">Do you already have an account?</Typography>
              <BaseButton to="/signin" ghost>
                Sign in
              </BaseButton>
            </Box>
          </Grid>
          <img src={RegisterImage} alt="register" />
        </Grid>
        <Grid className={styles.Form} sm={6} lg={6}>
          <Box className={styles.Texts}>
            {!error && <Typography variant="h2">Register</Typography>}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Dialog open={true}>
                <DialogTitle sx={{ fontSize: '2.4rem', fontWeight: 'bold' }}>Welcome to Pet Website.</DialogTitle>
                <DialogContent dividers sx={{ borderBottom: 'none', height: 100 }}>
                  We sent you an email with an access link. Please check your inbox.
                </DialogContent>
                <DialogActions>
                  <BaseButton primary to="/signin">
                    Done!
                  </BaseButton>
                </DialogActions>
              </Dialog>
            )}
            <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} data-testid="logup-form">
              <LineTextField
                label="Username"
                type="text"
                spellCheck="false"
                data-testid="account-username"
                placeholder="Enter your username"
                {...register('username')}
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
                {...register('email')}
                helperText={formState.errors.email?.message}
                error={!!formState.errors.email}
              />
              <LineTextField
                label="Password"
                type="password"
                spellCheck="false"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Visibility />
                    </InputAdornment>
                  ),
                }}
                {...register('password')}
                helperText={formState.errors.password?.message}
                error={!!formState.errors.password}
              />
              <LineTextField
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                spellCheck="false"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Visibility />
                    </InputAdornment>
                  ),
                }}
                {...register('confirmPassword')}
                helperText={formState.errors.confirmPassword?.message}
                error={!!formState.errors.confirmPassword}
              />
              <BaseButton
                primary
                disabled={loading}
                data-testid="button"
                type="submit"
                startIcon={loading && <CircularProgress size={20} />}
              >
                Register
              </BaseButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
