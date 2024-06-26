import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./layout/UserLayout";
import Test from "@/features/test/Index";
import AdminLayout from "./layout/AdminLayout";
import AdminDashBoard from "@/features/admin-dashboard/Index";
import AdminProductList from "@/features/admin-product-list/Index";
import AdminProductNew from "@/features/admin-product-new/Index";
import AdminLogin from "@/features/admin-login/Index";
import Employee from "@/features/employee/Index";
import ListingPage from "@/features/listing-page/ListingPage";
import AdminProductDetail from "@/features/admin-product-detail/Index";
import Cart from "@/features/customer-cart/Index";

import ProductDetail from "@/features/ProductDetail/Index";
import Account from "@/features/account/Index";
import AccountInformation from "@/features/account-information/Index";
import AccountAddress from "@/features/account-address/AccountAddress";
import CustomerPayment from "@/features/customer-payment/Index";
import AdminOrder from "@/features/admin-order/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "productdetail",
        element: <ProductDetail />,
      },
      {
        path: "account",
        element: <Account />,
        children: [
          {
            path: "account-information",
            element: <AccountInformation />,
          },
          {
            path: "address",
            element: <AccountAddress />,
          },
        ],
      },
      {
        path: "listing-page",
        element: <ListingPage />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "payment",
        element: <CustomerPayment />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashBoard />,
      },
      {
        path: "product-list",
        element: <AdminProductList />,
      },
      {
        path: "product-new",
        element: <AdminProductNew />,
      },
      {
        path: "employee",
        element: <Employee />,
      },
      {
        path: "product",
        element: <AdminProductDetail />,
      },
      {
        path: "order",
        element: <AdminOrder />,
      },
    ],
  },
  {
    path: "admin-login",
    element: <AdminLogin />,
  },
]);

export default router;
