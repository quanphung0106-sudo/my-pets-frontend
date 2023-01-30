import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack } from "@mui/material";
import BaseDataGrid from "~/components/BaseDataGrid/BaseDataGrid";

import { BaseButton } from "~/components/Button/Button";
import useFetch from "~/libs/hooks/useFetch";
import { formatDate } from "~/libs/utils";
import Delete from "./Action/Delete";
import styles from "./Admin.module.scss";

const Users = () => {
  const { data, reFetch } = useFetch("users");
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "username",
      headerName: "Username",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
      sortable: false,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      sortable: false,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      headerAlign: "right",
      align: "right",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      headerClassName: styles.Action,
      cellClassName: styles.Action,
      sortable: false,
      minWidth: 80,
      flex: 1,
      renderCell: (params) => {
        if (params.row !== undefined) {
          const idUser = params.row.idUser;
          return (
            <Stack direction="row" alignItems="center">
              <IconButton disabled>
                <EditIcon />
              </IconButton>
              <Delete id={idUser} name="users" callback={reFetch} />
            </Stack>
          );
        }
      },
    },
  ];

  const userList = data.users?.map((user, index) => {
    return {
      id: ++index,
      idUser: user._id,
      username: user.username,
      email: user.email,
      role: user.isAdmin === true ? "Admin" : "User",
      createdAt: user.createdAt,
    };
  });

  return (
    <Stack className={styles.Users}>
      <BaseButton primary size="large" className={styles.Btn} disabled>
        Add new User
      </BaseButton>
      <BaseDataGrid
        data={data}
        columns={columns}
        rows={userList}
        rowPerPage={10}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Stack>
  );
};

export default Users;
