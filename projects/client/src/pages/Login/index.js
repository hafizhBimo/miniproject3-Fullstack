"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
// import "./style.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/authSlice";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';
import "boxicons";

const createSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 characters at minimum")
    .required("Password is required"),
});
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isError, setError] = useState("");

  const handleSubmit = (value, action) => {

      axios
        .post(`http://localhost:8000/api/auth/login`, value)
        .then((response) => {
          localStorage.setItem("token", response.data.accessToken);
          dispatch(setToken(response.data.accessToken));
          navigate("/");
        })
        .catch (e =>{
          console.log(e);
          setError(e.response.data.message)   
        });
    
  };

  const navigateToHome = () => {
    navigate("/");
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
      <div className="flex items-center justify-center  my-32 ml-96 mr-96 border rounded border-sky-500  pt-16 pb-16" >
        <div style={{paddingBottom: "350px", paddingRight: "30px"}}>

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
                Don't have an account yet?{" "}
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
