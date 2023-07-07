import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import CartItem from "../CartItem";

const CartList = ({ setCartData }) => {
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/cart").then((response) => {
      setCartList(response.data.data);
      setCartData(response.data.data.length);
    });
  }, []);
  return (
    <div>
      {cartList.map((data) => (
        <CartItem
          key={data.id}
          product_id={data.product_id}
          user_id={data.user_id}
          quantity={data.quantity}
        />
      ))}
    </div>
  );
};

export default CartList;
