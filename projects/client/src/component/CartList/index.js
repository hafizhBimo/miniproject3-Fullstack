import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import CartItem from "../CartItem";
import CheckoutModal from "../CheckoutModal";
const CartList = ({ setCartData }) => {
  const [cartList, setCartList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/cart").then((response) => {
      setCartList(response.data.data);
      setCartData(response.data.data.length);
    });
  }, []);
  return (
    <div>
      <h1>Cart</h1>
      {cartList.map((data) => (
        <CartItem
          key={data.id}
          product_id={data.product_id}
          user_id={data.user_id}
          quantity={data.quantity}
        />
      ))}
      <CheckoutModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default CartList;
