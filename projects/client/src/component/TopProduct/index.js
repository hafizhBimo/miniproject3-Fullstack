import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import { Card, Badge } from "flowbite-react";
import rupiah from "../../utils/currency";
import { Link } from "react-router-dom";

const TopProduct = () => {
  const [userData, setUserData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          `http://localhost:8000/api/product/topSelling?search&order&categoryId=&sort&page`
        );

        setUserData(response1.data.data);

        const response2 = await axios.get(
          "http://localhost:8000/api/categories"
        );

        setCategories(response2.data.list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterClick = (id) => {
    axios
      .get(`http://localhost:8000/api/product/topSelling?categoryId=${id}`)
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="border-b-8 flex flex-col space-x-24 m-10 border-solid border-2 border-sky-500 rounded-xl">
        <div className="carousel p-4 ustify-start overflow-x-auto scroll-smooth scrollbar-hide">
          <div className=" font-mono text-center py-4 text-4xl font-extrabold">
            Top Product!
          </div>
          <Button.Group outline="true">
            {categories.map((category) => (
              <div key={category.id}>
                <div>
                  <Button
                    className=" rounded-none my-1 ml-6"
                    value={category.id}
                    onClick={() => handleFilterClick(category.id)}
                    gradientMonochrome="info"
                  >
                    {category.name}
                  </Button>
                </div>
              </div>
            ))}
          </Button.Group>
        </div>
        <div>
          <div className="flex flex-row overflow-x-scroll scroll-smooth scrollbar-hide ">
            {userData.map((Product) => (
              <div key={Product.id}>
                <Link to={`/Product/${Product.id}`}>
                  <Card
                    style={{ width: "250px", height:"100%", maxHeight:"520px" }}
                    key={Product.id}
                    imgAlt="test"
                    className=""
                    imgSrc={`http://localhost:8000${Product.imageUrl}`}
                  >
                    <div className="">
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                        {Product.category}
                      </span>
                    </div>

                    <h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                      <p>{Product.name}</p>
                    </h5>

                    <h6>{Product.storeName}</h6>
                    <h6>{Product.quantity} sold!</h6>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {rupiah(Product.price)}
                      </span>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopProduct;
