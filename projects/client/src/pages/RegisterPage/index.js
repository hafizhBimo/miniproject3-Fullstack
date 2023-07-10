"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';
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

  const [isError, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (value, action) => {

      axios.post(`http://localhost:8000/api/auth/register`, value)
      .then((response) => {
      navigate("/Login");
      })
      .catch (e =>{
        console.log(e);
        setError(e.response.data.message)   
      });
    
  };
  const navigateToLogin = () => {
    navigate("/Login");
  };
  return (
    <>
    {isError? (<Alert
        color="failure"
        icon={HiInformationCircle}
        onDismiss={()=>setError("")}
      >
        <span>
          <p>
            <span className="font-medium">
              {isError}
            </span>
          </p>
        </span>
      </Alert>) : isError
      }
      <div className="items-center justify-center  flex">
        <div style={{ paddingBottom: "700px", paddingRight: "20px" }}>
          <button className="  hover:scale-150 hover:rounded hover:bg-sky-400  my-4">
            <box-icon name="arrow-back" onClick={navigateToLogin}></box-icon>
          </button>
        </div>
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
              className="flex  max-w-2xl flex-col gap-3 leading-10 "
              style={{ width: "350px" }}
              onSubmit={props.handleSubmit}
            >
              <div>
                <div className="mb-2 block">
                  <Label
                    style={{ fontSize: "18px" }}
                    htmlFor="username"
                    value="Your username"
                  />
                </div>
                <TextInput
                  style={{ lineHeight: "40px" }}
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
                  <Label
                    style={{ fontSize: "18px" }}
                    htmlFor="email"
                    value="Your email"
                  />
                </div>
                <TextInput
                  style={{ lineHeight: "40px" }}
                  className="input-wrapper"
                  id="email"
                  name="email"
                  placeholder="email@provider.com"
                  required
                  type="email"
                  onChange={props.handleChange}
                  value={props.values.email}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    style={{ fontSize: "18px" }}
                    htmlFor="phoneNumber"
                    value="Your phone number"
                  />
                </div>
                <TextInput
                  style={{ lineHeight: "40px" }}
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
                  <Label
                    style={{ fontSize: "18px" }}
                    htmlFor="storeName"
                    value="your store name"
                  />
                </div>
                <TextInput
                  style={{ lineHeight: "40px" }}
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
                  <Label
                    style={{ fontSize: "18px" }}
                    htmlFor="password"
                    value="Your password"
                  />
                </div>
                <TextInput
                  style={{ lineHeight: "40px" }}
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
                  <Label
                    style={{ fontSize: "18px" }}
                    htmlFor="confirmPassword"
                    value="confirm password"
                  />
                </div>
                <TextInput
                  style={{ lineHeight: "40px" }}
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

              <Button type="submit">Submit</Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default RegisterPage;
