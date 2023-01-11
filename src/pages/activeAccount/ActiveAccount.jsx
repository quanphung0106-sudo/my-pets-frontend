/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Dialog, DialogActions } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { BaseButton } from '~/components/Button/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {userApi} from '~/libs/helpers/axios';

const ActiveAccount = () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const token = searchParam.get('token');

  useEffect(() => {
    const activeAccount = async () => {
      // await axios.post('http://localhost:8808/api/auth/token', { token });
      await userApi.active(token);
    };
    activeAccount();
  }, [token]);

  return (
    <Dialog open={true}>
      <DialogTitle sx={{ fontSize: '2.4rem', fontWeight: 'bold' }}>Welcome to Pet Website</DialogTitle>
      <DialogContent dividers sx={{ borderBottom: 'none', width: 450, height: 100 }}>
        Your account has been activated.
      </DialogContent>
      <DialogActions>
        <BaseButton primary to="/signin" endIcon={<ArrowForwardIcon />}>
          Login now
        </BaseButton>
      </DialogActions>
    </Dialog>
  );
};

export default ActiveAccount;
