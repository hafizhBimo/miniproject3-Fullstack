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
import Navbar from "./component/NavbarLogout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/Login";
import HomePage from "./pages/HomePage";
import ManageCategoryPage from "./pages/ManageCategoryPage";
import NavbarComponent from "./component/NavbarLogout";
import FooterComponent from "./component/FooterComponent";
import CreateProductListing from "./pages/Create Product Listing";
import ModifyProductListing from "./pages/Modify Product Listing";
import NavbarLogged from "./component/NavbarLogged";

const Layout = () => {
  return (
    <>
      <NavbarLogged />
      <Outlet />
      <FooterComponent />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/Register", element: <RegisterPage /> },
      {
        path: "/Login",
        element: <LoginPage />,
      },
      {
        path: "/ManageCategory",
        element: <ManageCategoryPage />,
      },
      {
        path: "/ModifyProductListing/:id",
        element: <ModifyProductListing />,
      },
      {
        path: "/CreateProductListing",
        element: <CreateProductListing />,
      },
    ],
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
