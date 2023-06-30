"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const createSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 characters at minimum")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "password must match")
    .required("confirm password is required"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const handleSubmit = (value, action) => {
    try {
      axios.post(`http://localhost:8000/api/auth/register`, value);
    } catch (error) {
      return;
    }
    navigate("/Login");
  };
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        storeName: "",
        password: "",
        confirmPassword: "",
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
              <Label htmlFor="username" value="Your username" />
            </div>
            <TextInput
              className="input-wrapper"
              id="username"
              name="username"
              required
              type="text"
              onChange={props.handleChange}
              value={props.values.username}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              className="input-wrapper"
              id="email"
              name="email"
              placeholder="name@flowbite.com"
              required
              type="email"
              onChange={props.handleChange}
              value={props.values.email}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="phoneNumber" value="Your phone number" />
            </div>
            <TextInput
              className="input-wrapper"
              id="phoneNumber"
              name="phoneNumber"
              required
              type="text"
              onChange={props.handleChange}
              value={props.values.phoneNumber}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="storeName" value="your store name" />
            </div>
            <TextInput
              className="input-wrapper"
              id="storeName"
              name="storeName"
              required
              type="text"
              onChange={props.handleChange}
              value={props.values.storeName}
            />
            <ErrorMessage name="storeName" component="div" />
          </div>
          <div>
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
            <ErrorMessage name="confirmPassword" component="div" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirmPassword" value="confirm password" />
            </div>
            <TextInput
              className="input-wrapper"
              id="confirmPassword"
              name="confirmPassword"
              required
              type="password"
              onChange={props.handleChange}
              value={props.values.confirmPassword}
            />
            <ErrorMessage name="confirmPassword" component="div" />
          </div>

          <Button type="submit">
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default RegisterPage;
