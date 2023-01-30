import { useState } from "react";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Tippy from "@tippyjs/react/headless";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import PetsIcon from "@mui/icons-material/Pets";
import EventIcon from "@mui/icons-material/Event";
import FeedIcon from "@mui/icons-material/Feed";
import PhoneIcon from "@mui/icons-material/Phone";
import Close from "@mui/icons-material/Close";
import { logout } from "~/redux/userSlice";
import { BaseButton } from "../Button/Button";
import { userApi } from "~/libs/helpers/axios";
import LogoMobile from "~/assets/images/logoMobile.png";
import styles from "./Header.module.scss";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.user);
  const isAdmin = user !== null && user.isAdmin;
  const theme = useTheme();
  const upLg = useMediaQuery(theme.breakpoints.up("lg"));
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));

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
    await userApi().logout();
    dispatch(logout());
    navigate("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <Stack direction="row" className={styles.Container}>
      <Stack direction="row" gap="15px" flex="1" className={styles.Item}>
        <Stack>
          <PhoneEnabledIcon />
        </Stack>
        <Stack className={styles.Texts}>
          <Stack className={styles.Text}>BUY NOW!</Stack>
          <Stack className={styles.Text}>0935 123 456</Stack>
        </Stack>
      </Stack>
      {downSm && (
        <IconButton size="large" onClick={() => setMobileOpen(true)}>
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        classes={{ root: styles.DrawerRoot, paper: styles.DrawerPaper }}
      >
        <Stack padding="15px">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              component="img"
              width="120px"
              src={LogoMobile}
              alt="logoMobile"
            />
            <IconButton onClick={handleDrawerClose}>
              <Close />
            </IconButton>
          </Stack>
          <List
            className={styles.List}
            component="nav"
            onClick={handleDrawerClose}
          >
            <Link to="/">
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </Link>
            <Link to="/products">
              <ListItemButton>
                <ListItemIcon>
                  <PetsIcon />
                </ListItemIcon>
                <ListItemText primary="Product" />
              </ListItemButton>
            </Link>
            <Link to="/orders/search">
              <ListItemButton>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Item" />
              </ListItemButton>
            </Link>
            <Link to="/">
              <ListItemButton>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary="Event" />
              </ListItemButton>
            </Link>
            <Link to="/">
              <ListItemButton>
                <ListItemIcon>
                  <FeedIcon />
                </ListItemIcon>
                <ListItemText primary="Blog" />
              </ListItemButton>
            </Link>
            <Link to="/">
              <ListItemButton>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </Link>
          </List>
        </Stack>
      </Drawer>
      <Stack className={`${styles.Item} ${styles.Nav}`} flex="2">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/products">
            <li>Pet</li>
          </Link>
          <Link to="/orders/search">
            <li>Item</li>
          </Link>
          {upLg && (
            <Link to="/">
              <Stack component="img" src="/img/logo.png" alt="logo" />
            </Link>
          )}
          <li>Events</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </Stack>
      <Stack direction="row" gap="15px" flex="1" className={styles.Item}>
        <Link to="/cart">
          <Stack className={styles.Cart}>
            <ShoppingCartIcon className={styles.CartIcon} />
            {quantity === 0 ? (
              ""
            ) : (
              <Stack className={styles.Counter}>
                {quantity >= 10 ? "9+" : quantity}
              </Stack>
            )}
          </Stack>
        </Link>
        {user ? (
          <Tippy
            render={(attrs) => (
              <div {...attrs}>
                <ul className={styles.ListItem}>
                  <Link className={styles.Link} to="/orders">
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
      </Stack>
    </Stack>
  );
};

export default Header;
