import "boxicons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const CheckoutModal = ({ showModal, onClose, setShowModal }) => {
  const token = useSelector((state) => state.auth.token);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    try {
      axios
        .post("http://localhost:8000/api/cart/checkout", address, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate("/MyTransaction");
          alert(response.data.message);
        });
    } catch (error) {
      return;
    }
  };

  const handleChange = (event) => {
    setAddress(event.target.value);
  };
  return (
    <>
      <Button onClick={() => setShowModal("form-elements")}>
        <box-icon name="cart-download"></box-icon> Checkout
      </Button>
      <Modal
        show={showModal === "form-elements"}
        size="md"
        popup
        onClose={() => onClose()}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              please input your delivery address
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="address" value="address" />
              </div>
              <TextInput
                id="address"
                placeholder="ex. Jl. cilandak KKO raya no.xx RTxx/RWxx, Pasar Minggu"
                type="text"
                onChange={handleChange}
                value={address}
              />
            </div>
          </div>
          <Button onClick={() => handleClick()}>confirm</Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CheckoutModal;