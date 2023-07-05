import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [quantityData, setQuantityData] = useState(1)
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
    const token = localStorage.getItem("token")

    if(token === null){
        navigate("/login");
    }else{
      axios.post(
        `http://localhost:8000/api/product/${productId}`,
        {
          quantity: quantityData
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },

      ).then((response) => {
          setCartData(response);
        })
        // .catch((err) => {
        //   if (err.message === "Request failed with status code 401") {
        //     navigate("/login");
        //   }
        // });
    }

  }


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
                  <button onClick={() => handleClick(Product.id)} className=" bg-black py-4 px-8 text-white">
                    Add to cart
                  </button>
                  <div>
                    <button onClick={() => setQuantityData(quantityData - 1)} className=" bg-blue-500 py-2 px-4 text-white">
                      -
                    </button>
                    <div> {quantityData} </div>
                    <button onClick={() => setQuantityData(quantityData + 1)} className=" bg-blue-500 py-2 px-4 text-white">
                      +
                    </button>
                  </div>
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
