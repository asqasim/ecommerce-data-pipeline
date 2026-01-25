import { createBrowserRouter } from "react-router-dom";
// Pages ==>
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import NotFound from "../pages/NotFound";

import RootLayout from "../components/layout/RootLaytout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: "/", element: <Home /> },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
]);

export default router;
