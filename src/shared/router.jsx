import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./layout/UserLayout";
import Test from "@/features/test/Index";
import AdminLayout from "./layout/AdminLayout";
import AdminDashBoard from "@/features/admin-dashboard/Index";
import AdminProductList from "@/features/admin-product-list/Index";
import AdminProductNew from "@/features/admin-product-new/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "test",
        element: <Test />,
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
    ],
  },
]);

export default router;
