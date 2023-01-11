import { IconButton, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import { itemApi } from '~/libs/helpers/axios';
import styles from './style.module.scss';

const Delete = ({ id, callback }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteItem = async () => {
    try {
      const res = await itemApi.delete(id);
      if (res.status === 200) callback();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{ paper: styles.Paper }}
      >
        <Typography sx={{ p: 2 }}>Are you sure?</Typography>
        <IconButton className={styles.ClearIcon} onClick={() => setAnchorEl(null)}>
          <ClearIcon />
        </IconButton>
        <IconButton className={styles.AcceptIcon} onClick={handleDeleteItem}>
          <CheckIcon />
        </IconButton>
      </Popover>
    </>
  );
};

export default Delete;
