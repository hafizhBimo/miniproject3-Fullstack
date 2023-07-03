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
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/Login";
import HomePage from "./pages/HomePage";
import ManageCategoryPage from "./pages/ManageCategoryPage";

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
    children: [{ path: "/", element: <HomePage /> }],
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
    path: "/ManageCategory",
    element: <ManageCategoryPage />,
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
