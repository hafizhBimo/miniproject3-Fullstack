import {
  Button,
  Label,
  TextInput,
  form,
  Alert,
  Dropdown,
} from "flowbite-react";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModifyCategory = ({ categoryData }) => {
  return (
    <Formik initialValues={{ oldCategory: "", newCategory: "" }}>
      {(props) => (
        <Dropdown label="categories">
          {categoryData.map((data) => {
            return <Dropdown.Item key={data.id}>{data.name}</Dropdown.Item>;
          })}
        </Dropdown>
      )}
    </Formik>
  );
};

export default ModifyCategory;
