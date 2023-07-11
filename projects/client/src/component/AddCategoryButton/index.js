import {
  Button,
  Checkbox,
  Label,
  TextInput,
  form,
  Alert,
} from "flowbite-react";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { HiInformationCircle } from "react-icons/hi";
import { useState } from "react";

const AddCategoryButton = () => {
  const token = localStorage.getItem("token");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = (value, action) => {
    try {
      axios
        .post(`http://localhost:8000/api/new-category`, value, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setAlertMessage(response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          setAlertMessage(error.response.data.message);
        });
    } catch (error) {
      return;
    }
  };
  return (
    <>
      {alertMessage ? (
        alertMessage == "category already exist" ? (
          <Alert
            color="failure"
            icon={HiInformationCircle}
            onDismiss={() => setAlertMessage("")}
          >
            <span>
              <p>
                <span className="font-medium">{alertMessage}</span>
              </p>
            </span>
          </Alert>
        ) : (
          <Alert
            color="success"
            icon={HiInformationCircle}
            onDismiss={() => setAlertMessage("")}
          >
            <span>
              <p>
                <span className="font-medium">{alertMessage}</span>
              </p>
            </span>
          </Alert>
        )
      ) : (
        alertMessage
      )}
      <Formik
        initialValues={{
          newCategory: "",
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={props.handleSubmit}
          >
            <div>
              <div className="mb-2 block text-left">
                <Label htmlFor="category1" value="new category name" />
              </div>
              <TextInput
                id="newCategory1"
                placeholder="ex. Arcade, Shooter, Card, etc."
                type="text"
                name="newCategory"
                onChange={props.handleChange}
                value={props.values.newCategory}
              />
            </div>
            <Button type="submit">add Category</Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddCategoryButton;
