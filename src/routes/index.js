import { Children } from "react";
import LayoutUser from "../layout/LayoutUser";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Payment from "../pages/Payment";
import CategoryDetails from "../pages/CategoryDetails";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import LayoutAdmin from "../layout/LayoutAdmin";
import MangerCategory from "../pages/Admin/ManagerCategory";
import ManagerUser from "../pages/Admin/ManagerUser";
import ManagerProduct from "../pages/Admin/ManagerProduct";
import HomeAdmin from "../pages/Admin/HomeAdmin";
export const routes = [
  {
    path: "/",
    element: <LayoutUser />,
    children: [
      {
        index:true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "productDetails/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "category-details/:id",
        element: <CategoryDetails />,
      },
    ],
  },
  {
    path: "admin",
    element: <LayoutAdmin />,
    children: [
      {
        path: "managerCategory",
        element: <MangerCategory />,
      },
      {
        path: "managerUser",
        element: <ManagerUser />,
      },
      {
        path: "managerProduct",
        element: <ManagerProduct />,
      },
      {
        index:true,
        element: <HomeAdmin />,
      },
    ],
  },
];
