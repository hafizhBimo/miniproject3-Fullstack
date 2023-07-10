import "boxicons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const FormCheckout = ({ onSubmit }) => {
  const [address, setAddress] = useState("");

  return (
    <>
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          please input your delivery address
        </h3>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="address" value="address" />
          </div>
          <input
            key="textinput1"
            id="address"
            placeholder="ex. Jl. cilandak KKO raya no.xx RTxx/RWxx, Pasar Minggu"
            type="text"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            value={address}
          />
        </div>
      </div>
      <Button
        onClick={() => {
          onSubmit({ address });
        }}
      >
        confirm
      </Button>
    </>
  );
};

const CheckoutModal = ({ showModal, onClose, setShowModal }) => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const handleClick = (values) => {
    try {
      axios
        .post("http://localhost:8000/api/cart/checkout", values, {
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
          <FormCheckout onSubmit={handleClick} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CheckoutModal;
