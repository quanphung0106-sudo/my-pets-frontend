import { Box } from '@mui/material';
import styles from './Detail.module.scss';
import ItemDetail from '~/components/ItemDetail/ItemDetail';

const Detail = () => {
  return (
    <Box className={styles.Container}>
      <ItemDetail />
    </Box>
  );
};

export default Detail;
