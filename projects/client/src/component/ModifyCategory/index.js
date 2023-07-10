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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ModifyCategory = ({ categoryData }) => {
  const token = localStorage.getItem("token");
  const [categoryName, setCategoryName] = useState({
    old: "categories",
    new: "",
  });
  const handleEdit = () => {
    try {
      axios.patch(
        "http://localhost:8000/api/modify-category",
        {
          oldCategory: categoryName.old,
          newCategory: categoryName.new,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      return;
    }
  };
  return (
    <div className="flex max-w-md flex-col gap-4 my-4">
      <Dropdown label={categoryName.old}>
        {categoryData.map((data) => {
          return (
            <Dropdown.Item
              onClick={() =>
                setCategoryName({ ...categoryName, old: data.name })
              }
              key={data.id}
            >
              {data.name}
            </Dropdown.Item>
          );
        })}
      </Dropdown>
      <div className="mb-2 block text-left">
        <Label htmlFor="editCategory1" value="new category name" />
      </div>
      <TextInput
        id="editCategory1"
        name="editCategory1"
        type="text"
        placeholder="ex. Arcade, Shooter, Card, etc."
        value={categoryName.new}
        onChange={(e) =>
          setCategoryName({ ...categoryName, new: e.target.value })
        }
      />
      <Button onClick={() => handleEdit()}>edit</Button>
    </div>
  );
};

export default ModifyCategory;
