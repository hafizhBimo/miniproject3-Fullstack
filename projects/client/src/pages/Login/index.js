"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
// import "./style.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/authSlice";
import "boxicons";

const createSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 characters at minimum")
    .required("Password is required"),
});
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (value, action) => {
    console.log("tes");
    try {
      axios
        .post(`http://localhost:8000/api/auth/login`, value)
        .then((response) => {
          localStorage.setItem("token", response.data.accessToken);
          dispatch(setToken(response.data.accessToken));
        });
    } catch (error) {
      return;
    }
    navigate("/");
  };

  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="items-center justify-center  my-32 border flex">
        <div style={{paddingBottom: "350px", paddingRight: "10px"}}>

        <button className="  hover:scale-150 hover:rounded-md hover:bg-red-500">
          <box-icon name="x" onClick={navigateToHome}></box-icon>
        </button>
        </div>
        <Formik
          initialValues={{
            user_identification: "",
            password: "",
          }}
          validationSchema={createSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <form
              className="flex  max-w-2xl flex-col gap-8 leading-10 "
              style={{ width: "350px" }}
              onSubmit={props.handleSubmit}
            >
              <div>
                <div className=" block ">
                  <Label
                    style={{ fontSize: "18px" }}
                    htmlFor="user_identification"
                    value="username/email/phoneNumber"
                  />
                </div>
                <TextInput
                  className="input-wrapper"
                  style={{ lineHeight: "40px" }}
                  id="user_identification"
                  name="user_identification"
                  required
                  type="text"
                  onChange={props.handleChange}
                  value={props.values.user_identification}
                />

                <div className="block">
                  <Label
                    style={{ fontSize: "18px" }}
                    htmlFor="password"
                    value="Your password"
                  />
                </div>
                <TextInput
                  className="input-wrapper"
                  style={{ lineHeight: "40px" }}
                  id="password"
                  name="password"
                  required
                  type="password"
                  onChange={props.handleChange}
                  value={props.values.password}
                />
              </div>
              <Button type="submit">Submit</Button>
              <span>
                Do you have an account?{" "}
                <Link
                  className="underline underline-offset-1 transform hover:scale-110 text-blue-500 hover:text-purple-500"
                  to="/register"
                >
                  Register
                </Link>
              </span>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LoginPage;
