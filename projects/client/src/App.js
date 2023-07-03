import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/Login";
import CreateProductListing from "./pages/Create Product Listing";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/Register",
    element: <RegisterPage />,
  },
  {
    path: "/Login",
    element: <LoginPage />,
  },
  {
    path: "/CreateProductListing",
    element: <CreateProductListing />,
  },
  {
    path: "/ModifyProductListing",
    element: <ModifyProductListing />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
