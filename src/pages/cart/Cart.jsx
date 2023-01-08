import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseButton } from '~/components/Button/Button';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import CartTotal from '~/components/CartTotal/CartTotal';
import ScrollToTop from '~/components/scroll/Scroll';
import BaseTable from '~/components/Table/Table';
import { reset } from '~/redux/cartSlice';
import styles from './Cart.module.scss';

const Cart = () => {
  const items = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const columns = [
    {
      name: 'Product',
      align: 'left',
      render: ({ img }) => <img src={img} alt="img" />,
    },
    {
      name: 'Name',
      align: 'center',
      render: ({ title }) => <p>{title}</p>,
    },
    {
      name: 'Type',
      align: 'center',
      render: ({ type }) => <p>{type}</p>,
    },
    {
      name: 'Price',
      align: 'right',
      render: ({ price }) => <p>${price}</p>,
    },
    {
      name: 'Quantity',
      align: 'right',
      render: ({ quantity }) => <p>{quantity}</p>,
    },
    {
      name: 'Total',
      align: 'right',
      render: ({ total }) => <p>${total}</p>,
    },
  ];

  const handleClear = () => {
    dispatch(reset());
  };

  return (
    <>
      <Box className={styles.Container}>
        {items.products.length !== 0 ? (
          <>
            <Grid container className={styles.Wrapper} columnSpacing={{ lg: 6 }}>
              <Grid className={styles.Left} sm={12} lg={8}>
                <Box className={styles.ButtonWrapper}>
                  <BaseButton startIcon={<ArrowBackOutlinedIcon />} primary to="/products">
                    Buy more pets
                  </BaseButton>
                  <BaseButton primary onClick={handleClear}>
                    Clear all
                  </BaseButton>
                </Box>
                <BaseTable columns={columns} dataSource={items} edit />
              </Grid>
              <Grid className={styles.Right} sm={12} lg={4}>
                <CartTotal />
              </Grid>
            </Grid>
          </>
        ) : (
          <Box flexDirection="column" className={styles.TextWrapper}>
            <h1>Bạn chưa chọn bất kỳ món hàng nào :(</h1>
            <BaseButton primary to="/products">
              Mua ngay!
            </BaseButton>
          </Box>
        )}
      </Box>
      <ScrollToTop />
    </>
  );
};

export default Cart;
