import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddCategoryButton from "../../component/AddCategoryButton";

const ManageCategoryPage = () => {
  return (
    <div>
      <AddCategoryButton />
    </div>
  );
};

export default ManageCategoryPage;
