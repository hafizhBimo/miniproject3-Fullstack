import "boxicons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const CheckoutModal = () => {
  const token = useSelector((state) => state.auth.token);
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
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
          console.log(response.data.data, "ini apa ya");
          navigate("/MyTransaction");
          setOpenModal(undefined);
          alert(response.data.data)
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
      <Button onClick={() => props.setOpenModal("form-elements")}>
        <box-icon name="cart-download"></box-icon> Checkout
      </Button>
      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
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
