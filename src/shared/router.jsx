import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./layout/UserLayout";
import Test from "@/features/test/Index";
import AdminLayout from "./layout/AdminLayout";

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
  },
]);

export default router;
