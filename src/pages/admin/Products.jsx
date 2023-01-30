import EditIcon from "@mui/icons-material/Edit";
import {
  Chip,
  IconButton,
  ListItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BaseDataGrid from "~/components/BaseDataGrid/BaseDataGrid";
import { BaseButton } from "~/components/Button/Button";
import useFetch from "~/libs/hooks/useFetch";
import { formatDate } from "~/libs/utils";
import { CreateAndUpdate } from "./Action";
import Delete from "./Action/Delete";
import styles from "./Admin.module.scss";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const { data, reFetch } = useFetch("items");
  const navigate = useNavigate();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "img",
      headerName: "Product",
      sortable: false,
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <Stack
          className={styles.CellImage}
          sx={{ objectFit: "cover" }}
          component="img"
          src={params.value}
          alt="product"
        />
      ),
    },
    {
      field: "title",
      headerName: "Name",
      editable: true,
      minWidth: 180,
      flex: 1,
      renderCell: (params) => {
        <Tooltip title={params.value}>
          <Typography
            sx={{
              whiteSpace: " nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            fontSize="14px"
          >
            {params.value}
          </Typography>
        </Tooltip>;
      },
    },
    {
      field: "options",
      headerName: "Options",
      headerClassName: styles.Options,
      cellClassName: styles.Options,
      sortable: false,
      minWidth: 180,
      flex: 2,
      renderCell: (params) => (
        <Stack
          direction="row"
          className={styles.ListOfChips}
          component="ul"
          gap="10px"
        >
          {params.value?.map((option, index) => {
            return (
              <ListItem key={index}>
                <Chip label={option.title} />
              </ListItem>
            );
          })}
        </Stack>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Update At",
      headerAlign: "right",
      align: "right",
      minWidth: 180,
      flex: 1,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "right",
      align: "right",
      sortable: false,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      sortable: false,
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        if (params.row !== undefined) {
          const data = params.row.idItem;
          return (
            <Stack direction="row" alignItems="center">
              <IconButton onClick={() => handleClickOpen("edit", data)}>
                <EditIcon />
              </IconButton>
              <Delete id={data} name="products" callback={reFetch} />
            </Stack>
          );
        }
      },
    },
  ];

  const handleClickOpen = (params, id) => {
    params === "create" ? setId(null) : setId(id);
    setOpen(true);
  };

  const productList = data?.items?.map((item, index) => {
    return {
      id: ++index,
      idItem: item._id,
      img: item.img,
      title: item.title,
      options: item.typeOfOptions,
      updatedAt: item.updatedAt,
      price: `$${item.typeOfOptions[0].price} - ${
        item.typeOfOptions[item.typeOfOptions.length - 1].price
      }`,
    };
  });

  return (
    <Stack>
      <CreateAndUpdate
        open={open}
        setOpen={setOpen}
        callback={reFetch}
        id={id}
      />
      <Stack className={styles.Products}>
        <BaseButton
          primary
          size="large"
          className={styles.Btn}
          onClick={() => handleClickOpen("create")}
        >
          Add new Product
        </BaseButton>
        <BaseDataGrid
          className={styles.DataGrid}
          classes={{
            row: styles.DataGridRow,
            cell: styles.DataGridCell,
          }}
          data={data}
          columns={columns}
          rows={productList}
          rowPerPage={10}
          rowsPerPageOptions={[10, 25, 50]}
          onCellClick={(params, event) => {
            if (params.field === "action") event.stopPropagation();
          }}
          onRowClick={(params) => navigate(`/products/${params.row.idItem}`)}
        />
      </Stack>
    </Stack>
  );
};

export default Products;
