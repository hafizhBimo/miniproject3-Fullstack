import { useState, useEffect, Children } from "react";
import axios from "axios";
import AddCategoryButton from "../../component/AddCategoryButton";
import ModifyCategory from "../../component/ModifyCategory";
import "./style.css";

import withAuth from "../../component/withAuth";

const ManageCategoryPage = () => {
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/categories`).then((response) => {
      setCategoryData(response.data.list);
    });
  }, []);

  return (
    <div className="flex justify-center">
      <div
        className="flex flex-col items-center"
        style={{
          width: "100%",
          maxWidth: "600px",
          textAlign: "-webkit-center",
        }}
      >
        <div style={{ width: "100%" }}>
          <AddCategoryButton />
          <ModifyCategory categoryData={categoryData} />
        </div>
      </div>
    </div>
  );
};

export default withAuth(ManageCategoryPage);
