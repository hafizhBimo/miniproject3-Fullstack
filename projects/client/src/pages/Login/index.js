"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
// import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

const createSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 characters at minimum")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "password must match")
    .required("confirm password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const handleSubmit = (value, action) => {
    try {
      axios.post(`http://localhost:8000/api/auth/register`, value);
    } catch (error) {
      return;
    }
    navigate("/");
  };
  return (
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
          className="flex max-w-md flex-col gap-4"
          onSubmit={props.handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="user_identification"
                value="username/email/phoneNumber"
              />
            </div>
            <TextInput
              className="input-wrapper"
              id="user_identification"
              name="user_identification"
              required
              type="text"
              onChange={props.handleChange}
              value={props.values.user_identification}
            />

            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              className="input-wrapper"
              id="password"
              name="password"
              required
              type="password"
              onChange={props.handleChange}
              value={props.values.password}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      )}
    </Formik>
  );
};

export default LoginPage;
