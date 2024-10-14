import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Shop from "./Shop.jsx";
import ErrorPage from "./ErrorPage";
import Homepage from './Homepage.jsx'
import Product from "./Product.jsx";
import Checkout from "./Checkout.jsx";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      //errorElement: <ErrorPage />,
      children: [
        { path: "shop", element: <Shop /> },
        { path: "", element: <Homepage /> },
        { path: "product/:id", element: <Product /> },
        { path: "checkout", element: <Checkout /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;