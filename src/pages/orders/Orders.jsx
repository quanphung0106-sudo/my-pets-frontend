import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Bake from '~/assets/images/bake.png';
import Bike from '~/assets/images/bike.png';
import Checked from '~/assets/images/checked.png';
import Delivered from '~/assets/images/delivered.png';
import Paid from '~/assets/images/paid.png';
import { BaseButton } from '~/components/Button/Button';
import Loading from '~/components/Loading/Loading';
import BaseTable from '~/components/Table/Table';
import orderApi from '~/helpers/axios/orderApi';
import styles from './Order.module.scss';

const Orders = () => {
  const [data, setData] = useState({});
  const user = useSelector((state) => state.user.user);
  const params = useParams();
  const status = data.status;

  const navigate = useNavigate();

  useEffect(() => {
    const getItemById = async () => {
      try {
        if (!user) {
          const res = await orderApi.getNoUser(params.id);
          if (res.data) setData(res.data);
        } else {
          const res = await orderApi.get(params.id);
          if (res.data) setData(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getItemById();
  }, [params.id, user]);

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  const handleClick = () => {
    if (user) {
      navigate('/my-items');
    } else {
      navigate('/stranger-items');
    }
  };

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

  return (
    <Box className={styles.Container}>
      <Grid container className={styles.Wrapper} columnSpacing={{ lg: 6 }}>
        <Grid className={styles.Left} sm={12} lg={8}>
          <Box className={styles.ButtonWrapper}>
            <BaseButton startIcon={<ArrowBackOutlinedIcon />} primary onClick={handleClick}>
              Back to order list
            </BaseButton>
            <Typography variant="body1">
              *Warning: You should save the "Order Code" on the right side to check the order information.
            </Typography>
          </Box>
          {data?.products ? (
            <>
              <Grid container className={styles.DeliveryState}>
                <Grid className={statusClass(0)} sm={3} lg={3}>
                  <img src={Paid} alt="Paid" />
                  <Box component="span">Payment</Box>
                  <img className={styles.checkedIcon} src={Checked} alt="CheckedImg" />
                </Grid>
                <Grid className={statusClass(1)} sm={3} lg={3}>
                  <img src={Bake} alt="Bake" />
                  <Box component="span">Preparing</Box>
                  <img className={styles.checkedIcon} src={Checked} alt="CheckedImg" />
                </Grid>
                <Grid className={statusClass(2)} sm={3} lg={3}>
                  <img src={Bike} alt="Bike" />
                  <Box component="span">On the way</Box>
                  <img className={styles.checkedIcon} src={Checked} alt="CheckedImg" />
                </Grid>
                <Grid className={statusClass(3)} sm={3} lg={3}>
                  <img src={Delivered} alt="Delivered" />
                  <Box component="span">Delivered</Box>
                  <img className={styles.checkedIcon} src={Checked} alt="CheckedImg" />
                </Grid>
              </Grid>
              {data && <BaseTable columns={columns} dataSource={data} />}
            </>
          ) : (
            <Loading />
          )}
        </Grid>
        <Grid className={styles.Right} sm={12} lg={4}>
          <Box className={styles.TotalWrapper}>
            <Typography variant="h1">Order Information</Typography>
            <Box component="span">Order Code:</Box>
            <Typography variant="body1">{data._id}</Typography>
            <Box component="span">Customer:</Box>
            <Typography variant="body1">{data.customer}</Typography>
            <Box component="span">Address:</Box>
            <Typography variant="body1">{data.address}</Typography>
            <Box component="span">Total:</Box>
            <Typography variant="body1">${data.total}</Typography>
            <BaseButton disabled primary>
              PAID!
            </BaseButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Orders;
