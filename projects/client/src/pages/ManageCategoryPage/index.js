import { useState, useEffect, Children } from "react";
import axios from "axios";
import AddCategoryButton from "../../component/AddCategoryButton";
import ModifyCategory from "../../component/ModifyCategory";
import "./style.css";
import { Alert } from "flowbite-react";

import { HiInformationCircle } from "react-icons/hi";

import withAuth from "../../component/withAuth";

const ManageCategoryPage = () => {
  const [alertMessage, setAlertMessage] = useState("");
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
          <AddCategoryButton />
          <ModifyCategory
            categoryData={categoryData}
            setAlertMessage={setAlertMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default withAuth(ManageCategoryPage);
