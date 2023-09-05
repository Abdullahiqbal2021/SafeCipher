import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Encrypt from "./pages/Encrypt";
import Decrypt from "./pages/Decrypt";
import NotFound from "./pages/NotFound";
import ViewData from "./pages/ViewData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Encrypt />,
      },
      {
        path: "/decrypt",
        element: <Decrypt />,
      },
      {
        path: "/viewData",
        element: <ViewData />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
