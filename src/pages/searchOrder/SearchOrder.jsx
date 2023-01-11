import { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, InputAdornment, Paper, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';

import { ContainedTextField } from '~/components/TextField/TextField';
import { orderApi } from '~/libs/helpers/axios';
import styles from './SearchOrder.module.scss';
import { formatDate } from '~/libs/utils';

const SearchOrder = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [id, setId] = useState('');
  const getItemById = async () => {
    try {
      const res = await orderApi.getNoUser(id);
      if (res.data) setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const navigateToDetailItem = () => {
    navigate(`/orders/${id}`);
  };

  const columns = [
    {
      name: 'Order Code',
      align: 'left',
    },
    {
      name: 'Customer',
      align: 'center',
    },
    {
      name: 'Address',
      align: 'center',
    },
    {
      name: 'Method',
      align: 'center',
    },
    {
      name: 'Order time',
      align: 'center',
    },
    {
      name: 'Total',
      align: 'right',
    },
  ];

  const handleAlign = (array, index, align) => {
    if (index === 0) return 'left';
    if (index === array.length - 1) return 'right';
    return align;
  };

  return (
    <Box className={styles.Container}>
      <Box className={styles.ContentWrapper}>
        <ContainedTextField
          placeholder="637cb4xxxxxxxx"
          onChange={(e) => setId(e.target.value)}
          type="text"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlinedIcon onClick={getItemById} />
              </InputAdornment>
            ),
          }}
        />
        {Object.keys(data).length !== 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead classes={{ root: styles.TableHead }}>
                <TableRow>
                  {columns.map((column, index) => {
                    return (
                      <TableCell
                        classes={{ root: styles.TableCell }}
                        align={handleAlign(columns, index, column.align)}
                        key={index}
                      >
                        {column.name}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody classes={{ root: styles.TableBody }}>
                <TableRow
                  onClick={navigateToDetailItem}
                  classes={{ root: styles.TableRow }}
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                  }}
                >
                  <TableCell classes={{ root: styles.TableCell }} align="left">
                    {data._id}
                  </TableCell>
                  <TableCell classes={{ root: styles.TableCell }} align="center">
                    {data.customer}
                  </TableCell>
                  <TableCell classes={{ root: styles.TableCell }} align="center">
                    {data.address}
                  </TableCell>
                  <TableCell classes={{ root: styles.TableCell }} align="center">
                    {data.method === 0 ? 'Cash' : 'Visa'}
                  </TableCell>
                  <TableCell classes={{ root: styles.TableCell }} align="center">
                    {formatDate(data.createdAt)}
                  </TableCell>
                  <TableCell classes={{ root: styles.TableCell }} align="right">
                    ${data.total}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h4">*Enter your Order Code to track the order</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SearchOrder;
