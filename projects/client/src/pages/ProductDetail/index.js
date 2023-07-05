import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const [userData, setUserData] = useState([]);
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

  return (
    <div>
      {userData.map((Product) => (
        <div key={Product.id}>
          <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                  <img
                    className="max-w-[200px] lg:max-w-sm"
                    src={`http://localhost:8000${Product.imageUrl}`}
                    alt=""
                  />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                    {Product.name}
                  </h1>
                  <div className="text-xl text-red-500 font-medium mb-6">
                    {Product.price}
                  </div>
                  {/* disini tambahin fungsi onclick */}
                  <button className=" bg-black py-4 px-8 text-white">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;