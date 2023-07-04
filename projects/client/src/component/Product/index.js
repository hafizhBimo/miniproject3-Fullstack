import React, { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const [userData, setUserData]=useState([])
  const [totalPage, setTotalPages]=useState([])
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product")
      .then((response) => {
        console.log(response,"ini siapa");
        setUserData(response.data.data);
        setTotalPages(Math.ceil(response.data.rows / 9));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {userData.map((Product) => (
        <div key={Product.id}>
          <div className="w-full relative group">
            <div className="max-w-80 max-h-80 relative overflow-y-hidden"></div>
            <img
              src={`http://localhost:8000${Product.imageUrl}`}
              alt=""
            />
          </div>
          <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
            <div className="flex items-center justify-between font-titleFont">
              <h2 className="text-lg text-primeColor font-bold">
                {Product.name}
              </h2>
              <p className="text-[#767676] text-[14px]">${Product.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
