import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import {
  Label,
  TextInput,
  Textarea,
  FileInput,
  Button,
  Dropdown,
  Alert,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import withAuth from "../../component/withAuth";
import rupiah from "../../utils/currency";
import { HiInformationCircle } from "react-icons/hi";

const ModifyProductListing = () => {
  const getLastItem = (thePath) =>
    thePath.substring(thePath.lastIndexOf("/") + 1);

  const currurl = getLastItem(window.location.href);

  const [value, setValue] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("1");
  const [productData, setProductData] = useState({});

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios("http://localhost:8000/api/categories").then((response) => {
      setCategoryData(response.data.list);
    });
    axios(`http://localhost:8000/api/product/${currurl}`)
      .then((response2) => {
        setProductData(response2.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleSubmit = (values, action) => {
    const { file, name, description, price } = values;
    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("price", price);
    data.append("categoryId", selectedItem);
    data.append("file", file);

    axios
      .patch(`http://localhost:8000/api/product/${currurl}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        setValue(response.data);
        setAlertMessage(response.data.message);
        setTimeout(() => {
          navigate("/MyStore");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {alertMessage ? (
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
      ) : (
        alertMessage
      )}
      <Formik
        initialValues={{
          file: null,
          name: "",
          description: "",
          price: "",
          categoryId: "",
        }}
        // validationSchema={CreateSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form className="flex flex-col gap-4" onSubmit={props.handleSubmit}>
            <div className="flex flex-col justify-center items-center ">
              <div className="mb-2 block">
                <Label htmlFor="name" value="change name of product" />
                <TextInput
                  id="name"
                  type="text"
                  placeholder={productData.name}
                  name="name"
                  onChange={props.handleChange}
                  value={props.values.name}
                  required
                />
                <Label htmlFor="price" value="change price" />
                <TextInput
                  type="text"
                  placeholder={rupiah(productData.price)}
                  name="price"
                  onChange={props.handleChange}
                  value={props.values.price}
                  required
                />

                <div id="textarea">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="description"
                      value="change product description"
                    />
                    <Textarea
                      type="text"
                      placeholder={productData.description}
                      name="description"
                      onChange={(event) => {
                        props.setFieldValue("description", event.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="file"
                      value="Upload new picture of product"
                    />
                    <FileInput
                      type="file"
                      name="file"
                      id="file"
                      className="file"
                      htmlFor="file"
                      onChange={(e) => {
                        props.setFieldValue("file", e.currentTarget.files[0]);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <select value={selectedItem} onChange={handleSelectChange}>
                      {categoryData.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <div>
                      <Button size="lg" type="submit">
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* {JSON.stringify(props.values)} */}
          </form>
        )}
      </Formik>
    </>
  );
};

export default withAuth(ModifyProductListing);
