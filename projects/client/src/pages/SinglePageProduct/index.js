import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import rupiah from "../../utils/currency";
import "boxicons";
import { Alert } from "flowbite-react";

const SinglePageProduct = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [quantityData, setQuantityData] = useState(0);
  const [isDisabled, setDisabled] = useState(true);
  const [isSuccess, setSuccess] = useState("");

  if(quantityData < 0){
    setQuantityData(0);
  }

  function handleQuantityPlus(){
    setQuantityData(quantityData + 1)
  }

  function handleQuantityMinus(){
    setQuantityData(quantityData - 1)
  }

  useEffect(() => {
    if (quantityData <= 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [quantityData]);

  function CartButton({ disabled, onClick }) {
    if (disabled) {
      return <button
      disabled={disabled}
      className="flex text-white bg-gray-500 border-0 py-1 px-7  focus:outline-none rounded"
    >
      <box-icon name="cart-add"></box-icon>
    </button>;
    }
    return <button
    disabled={disabled}
    className="flex text-white bg-indigo-500 border-0 py-1 px-7  focus:outline-none hover:bg-indigo-600 rounded"
    onClick= {onClick}
    >
    <box-icon name="cart-add"></box-icon>
  </button>;
  }
  
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((response) => {
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
          setSuccess("item added to cart")
        });
    }
  };

  return (
    <div>
      {isSuccess? (<Alert
        color="success"
        onDismiss={()=>setSuccess("")}
      >
        <span>
          <p>
            <span className="font-medium">
              Item added to cart
            </span>
          </p>
        </span>
      </Alert>) : isSuccess
      }
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
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
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
                    <button onClick={handleQuantityMinus}>
                      <box-icon name="minus"></box-icon>
                    </button>
                    <div> {quantityData} </div>
                    <button onClick={handleQuantityPlus}>
                      <box-icon name="plus"></box-icon>
                    </button>
                    <CartButton
                    disabled = {isDisabled}
                    onClick = {() => handleClick(Product.id)}
                    />
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
