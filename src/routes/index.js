import { Box, Grid } from "@mui/material";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Footer from "~/components/Footer/Footer";
import Header from "~/components/Header/Header";
import Notification from "~/components/Notification/Notification";
import ScrollToTop from "~/components/scroll/Scroll";
import ActiveAccount from "~/pages/activeAccount/ActiveAccount";
import Admin from "~/pages/admin/Admin";
import Cart from "~/pages/cart/Cart";
import Detail from "~/pages/detail/Detail";
import Error from "~/pages/error/Error";
import Home from "~/pages/home/Home";
import Login from "~/pages/login/Login";
import Order from "~/pages/order/Order";
import Orders from "~/pages/orders/Orders";
import Products from "~/pages/products/Products";
import Register from "~/pages/register/Register";
import Search from "~/pages/search/Search";

const Layout = () => {
  return (
    <Box>
      <Header />
      <Grid>
        <Outlet />
      </Grid>
      <Notification />
      <Footer />
      <ScrollToTop />
    </Box>
  );
};

const NotLayout = () => {
  return (
    <Box>
      <Grid>
        <Outlet />
      </Grid>
      <Notification />
      <ScrollToTop />
    </Box>
  );
};

export const routes = createBrowserRouter([
  {
    path: "/*",
    element: <Error />,
    errorElement: <Error />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
        errorElement: <Error />,
      },
      {
        path: "/products/:id",
        element: <Detail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: `/orders/:id`,
        element: <Order />,
      },
      {
        path: "/orders/search",
        element: <Search />,
      },
    ],
  },
  {
    path: "/",
    element: <NotLayout />,
    children: [
      {
        // path: '/test',
        // element: <Test />,
      },
      {
        path: "/signin",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/active-account",
        element: <ActiveAccount />,
      },
      {
        path: "/admin/*",
        element: (
          <>
            <Admin />
            <ScrollToTop />
          </>
        ),
        errorElement: <Error />,
      },
    ],
  },
]);
