import axios from "axios";
import { useState, useEffect } from "react";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import CartItem from "../CartItem";
import CheckoutModal from "../CheckoutModal";
const CartList = ({ setCartData }) => {
  const [cartList, setCartList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const [alertMessage, setAlertMessage] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCartList(response.data.data);
        setCartData(response.data.data.length);
        console.log(response.data.data, "ini data");
      });
  }, []);
  return (
    <div>
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
      <div className=" flex place-content-center font-mono font-extrabold">
        Cart List
      </div>
      {cartList.map((data) => (
        <CartItem
          setAlertMessage={setAlertMessage}
          key={data.id}
          product_id={data.product_id}
          user_id={data.user_id}
          quantity={data.quantity}
          productName={data.Product.name}
          productImg={data.Product.imageUrl}
          productStore={data.User.storeName}
          cartId={data.id}
        />
      ))}
      <div className=" flex place-content-center">
        <CheckoutModal
          key={"checkoutmodal1"}
          showModal={showModal}
          onClose={() => setShowModal(false)}
          setShowModal={setShowModal}
        />
      </div>
    </div>
  );
};

export default CartList;
