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

const AddCategoryButton = () => {
  const navigate = useNavigate();
  const handleSubmit = (value, action) => {
    try {
      axios
        .post(`http://localhost:8000/api/new-category`, value)
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } catch (error) {
      return;
    }
  };
  return (
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
            <div className="mb-2 block">
              <Label htmlFor="category1" value="input your new category" />
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
  );
};

export default AddCategoryButton;
