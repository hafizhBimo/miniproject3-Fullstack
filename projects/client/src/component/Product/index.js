import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Badge } from "flowbite-react";
import rupiah from "../../utils/currency";

const Product = () => {
  const [userData, setUserData] = useState([]);
  const [totalPage, setTotalPages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product")
      .then((response) => {
        setUserData(response.data.data);
        setTotalPages(Math.ceil(response.data.rows / 9));
        console.log(response, "ini userdata");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3">
      {userData.map((Product) => (
        <Card
          key={Product.id}
          imgAlt="test"
          imgSrc={`http://localhost:8000${Product.imageUrl}`}
        >
          <div className="">
            <span class="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
              {Product.Category.name}
            </span>
          </div>
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              <p>{Product.name}</p>
            </h5>
          </a>
          <h6>{Product.User.username}</h6>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {rupiah(Product.price)}
            </span>
            <a
              className="rounded-lg bg-cyan-700 px-1 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              href="#"
            >
              <p>Add to cart</p>
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Product;
