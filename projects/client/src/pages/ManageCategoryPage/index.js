import { useState, useEffect, Children } from "react";
import axios from "axios";
import AddCategoryButton from "../../component/AddCategoryButton";
import ModifyCategory from "../../component/ModifyCategory";
import "./style.css";

const ManageCategoryPage = () => {
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/categories`).then((response) => {
      setCategoryData(response.data.list);
    });
  }, []);
  

  return (
    <div className="manage-category-wrapper">
      <AddCategoryButton />
      <ModifyCategory categoryData={categoryData} />
    </div>
  );
};

export default ManageCategoryPage;
