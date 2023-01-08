import { Box } from '@mui/material';
import styles from './Error.module.scss';
import ErrorImage from '~/assets/images/error.png'

export default function Error() {

  return (
    <Box sx={{ flexGrow: 1 }} className={styles.Error}>
      <img src={ErrorImage} alt="error" />
    </Box>
  );
}
