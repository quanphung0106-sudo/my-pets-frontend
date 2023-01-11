import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Error from "../error/Error";

import Footer from "~/components/Footer/Footer";
import Header from "~/components/Header/Header";
import styles from "./Admin.module.scss";
import Orders from "./Orders";
import Products from "./Products";
import Users from "./Users";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [value, setValue] = useState(0);
  const user = useSelector((state) => state.user.user);
  const isAdmin = user !== null && user.isAdmin;
  const navigate = useNavigate();

  const handleAlign = (index, align) => {
    if (index === 0) return "left";
    return align;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!isAdmin) return <Error />;
  return (
    <>
      <Header />
      <Box className={styles.Container}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          className={styles.BottomNavigation}
        >
          <BottomNavigationAction
            label="Products"
            onClick={() => navigate("/admin/products")}
            classes={{ selected: styles.Selected }}
          />
          <BottomNavigationAction
            label="Orders"
            onClick={() => navigate("/admin/orders")}
            classes={{ selected: styles.Selected }}
          />
          <BottomNavigationAction
            label="Users"
            onClick={() => navigate("/admin/users")}
            classes={{ selected: styles.Selected }}
          />
        </BottomNavigation>
        {value === 0 && <Products handleAlign={handleAlign} />}
        {value === 1 && <Orders handleAlign={handleAlign} />}
        {value === 2 && <Users handleAlign={handleAlign} />}
      </Box>
      <Footer />
    </>
  );
};

export default Admin;
