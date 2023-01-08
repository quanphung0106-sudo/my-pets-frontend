import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './Table.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteItem } from '~/redux/cartSlice';

export default function BaseTable(props) {
  const { columns, dataSource, edit } = props;
  const [newFunc, setNewFunc] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const newArray = dataSource.products.map((data, _index) => ({
      ...data,
      renderImage: function () {
        return columns[0].render({ img: data.img });
      },
      renderTitle: function () {
        return columns[1].render({ title: data.title });
      },
      renderType: function () {
        return columns[2].render({ type: data.check.title });
      },
      renderPrice: function () {
        return columns[3].render({ price: data.price || data.check.price });
      },
      renderQuantity: function () {
        return columns[4].render({ quantity: data.quantity });
      },
      renderTotal: function () {
        return columns[5].render({ total: data.quantity * data.price || data.total });
      },
    }));
    setNewFunc(newArray);
  }, [columns, dataSource.products]);

  const handleAlign = (array, index, align) => {
    if (index === 0) return 'left';
    if (index === array.length - 1) return 'right';
    return align;
  };

  const handleDeleteItem = (index, data) => {
    const newArr = dataSource.products.filter((_item, indexItem) => indexItem !== index);
    dispatch(
      deleteItem({
        ...dataSource,
        quantity: newArr.length,
        products: newArr,
        total: dataSource.total - data.price * data.quantity,
      }),
    );
  };

  return (
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
            {edit && (
              <TableCell classes={{ root: styles.TableCell }} align="center">
                Action
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody classes={{ root: styles.TableBody }}>
          {newFunc?.map((data, index) => (
            <TableRow
              classes={{ root: styles.TableRow }}
              sx={{
                '&:last-child td, &:last-child th': {
                  border: 0,
                },
              }}
              key={index}
            >
              <TableCell classes={{ root: styles.TableCell }} align="left">
                {data.renderImage()}
              </TableCell>
              <TableCell classes={{ root: styles.TableCell }} align="center">
                {data.renderTitle()}
              </TableCell>
              <TableCell classes={{ root: styles.TableCell }} align="center">
                {data.renderType()}
              </TableCell>
              <TableCell classes={{ root: styles.TableCell }} align="right">
                {data.renderPrice()}
              </TableCell>
              <TableCell classes={{ root: styles.TableCell }} align="right">
                {data.renderQuantity()}
              </TableCell>
              <TableCell classes={{ root: styles.TableCell }} align="right">
                {data.renderTotal()}
              </TableCell>
              {edit && (
                <TableCell classes={{ root: styles.TableCell }} align="center">
                  <IconButton onClick={() => handleDeleteItem(index, data)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
