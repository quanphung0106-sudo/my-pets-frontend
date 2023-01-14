import { useState } from "react";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Tippy from "@tippyjs/react/headless";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import styles from "./Header.module.scss";
import { logout } from "~/redux/userSlice";
import { BaseButton } from "../Button/Button";
import { userApi } from "~/libs/helpers/axios";

const Header = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.user);
  const isAdmin = user !== null && user.isAdmin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const navigateToAdminPage = () => {
    if (isAdmin === true) {
      navigate("/admin/products");
    }
  };

  const handleLogout = async () => {
    await userApi.logout();
    dispatch(logout());
    navigate("/");
  };

  return (
    <Grid container className={styles.Container}>
      <Grid container className={styles.Item} sm={6} lg={3}>
        <Grid>
          <PhoneEnabledIcon />
        </Grid>
        <Grid className={styles.Texts}>
          <Grid className={styles.Text}>BUY NOW!</Grid>
          <Grid className={styles.Text}>0935 123 456</Grid>
        </Grid>
      </Grid>
      <Grid
        className={styles.Item}
        sx={{
          display: { xs: "none", sm: "none", lg: "flex" },
        }}
        lg={6}
      >
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/products">
            <li>Pet</li>
          </Link>
          <Link to="/stranger-items">
            <li>Item</li>
          </Link>
          <Link to="/">
            <Box component="img" src="/img/logo.png" alt="logo" />
          </Link>
          <li>Events</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </Grid>
      <Grid container className={styles.Item} sm={6} lg={3}>
        <Link to="/cart">
          <Grid className={styles.Cart}>
            <ShoppingCartIcon className={styles.CartIcon} />
            {quantity === 0 ? (
              ""
            ) : (
              <Box className={styles.Counter}>
                {quantity >= 10 ? "9+" : quantity}
              </Box>
            )}
          </Grid>
        </Link>
        {user ? (
          <Tippy
            render={(attrs) => (
              <div {...attrs}>
                <ul className={styles.ListItem}>
                  <Link className={styles.Link} to="/my-items">
                    <li className={styles.AccountItem}>My Order</li>
                  </Link>
                  {isAdmin && (
                    <li
                      onClick={navigateToAdminPage}
                      className={styles.AccountItem}
                    >
                      Manage
                    </li>
                  )}
                  <li onClick={handleLogout} className={styles.AccountItem}>
                    Log out
                  </li>
                </ul>
              </div>
            )}
            interactive={true}
            visible={visible}
            onClickOutside={hide}
            placement="bottom-start"
          >
            <div className={styles.AvatarContainer}>
              <img
                onClick={visible ? hide : show}
                className={styles.Avatar}
                src="/img/my-avatar.jpg"
                alt="avatar"
              />
            </div>
          </Tippy>
        ) : (
          <BaseButton to="/signin" primary>
            Login
          </BaseButton>
        )}
      </Grid>
    </Grid>
  );
};

export default Header;
