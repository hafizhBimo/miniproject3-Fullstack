import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import rupiah from "../../utils/currency";
import "boxicons";

const SinglePageProduct = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [quantityData, setQuantityData] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((response) => {
        console.log("WING", response);
        setUserData([response.data.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (productId) => {
    const token = localStorage.getItem("token");

    if (token === null) {
      navigate("/login");
    } else {
      axios
        .post(
          `http://localhost:8000/api/product/${productId}`,
          {
            quantity: quantityData,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setCartData(response);
        });
    }
  };

  return (
    <div>
      {userData.map((Product) => (
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
          <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
          <div
            className="container px-5 py-24 mx-auto"
            style={{ cursor: "auto" }}
          >
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={`http://localhost:8000${Product.imageUrl}`}
                style={{ cursor: "auto" }}
              />
              <div
                className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"
                style={{ cursor: "auto" }}
              >
                <h2
                  className="text-sm title-font text-gray-500 tracking-widest"
                  style={{ cursor: "auto" }}
                >
                  <span class="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                    {Product.Category.name}
                  </span>
                </h2>
                <h1
                  className="text-gray-900 text-3xl title-font font-medium mb-1"
                  style={{ cursor: "auto" }}
                >
                  {Product.name}
                </h1>

                <p className="leading-relaxed">{Product.description}</p>

                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    {rupiah(Product.price)}
                  </span>
                </div>
                <div>
                  <div className="flex flex-auto gap-3">
                    <button onClick={() => setQuantityData(quantityData - 1)}>
                      <box-icon name="minus"></box-icon>
                    </button>
                    <div> {quantityData} </div>
                    <button onClick={() => setQuantityData(quantityData + 1)}>
                      <box-icon name="plus"></box-icon>
                    </button>
                    <button className="flex text-white bg-indigo-500 border-0 py-1 px-7  focus:outline-none hover:bg-indigo-600 rounded">
                      <box-icon name="cart-add"></box-icon>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SinglePageProduct;
