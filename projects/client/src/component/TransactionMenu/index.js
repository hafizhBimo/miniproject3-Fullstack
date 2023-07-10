import { Table, TextInput, Label, Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import TransactionItem from "../TransactionItem";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const TransactionMenu = () => {
  const token = useSelector((state) => state.auth.token);
  const [transactionList, setTransactionList] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

  const handleToggleModal1 = () => {
    setModalOpen1(!modalOpen1);
  };

  const handleCloseModal1 = () => {
    setModalOpen1(false);
  };

  const handleToggleModal2 = () => {
    setModalOpen2(!modalOpen2);
  };

  const handleCloseModal2 = () => {
    setModalOpen2(false);
  };

  function onChange1(date) {
    setStartDate(date);
  }

  function onChange2(date) {
    setEndDate(date);
  }
  const handleSubmit = (value) => {
    try {
      axios
        .post(`http://localhost:8000/api/totalTransaction`, value, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setTransactionList(response.data.data.rows);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } catch (error) {
      return;
    }
  };
  return (
    <div className=" mr-8">
      <Button onClick={handleToggleModal1}>choose start date</Button>
      {startDate.toDateString()}
      <Modal onClose={handleCloseModal1} popup show={modalOpen1} size="md">
        <Modal.Header />
        <Modal.Body>
          <Calendar onChange={onChange1} value={startDate} />
        </Modal.Body>
      </Modal>
      <Button onClick={handleToggleModal2}>choose end date</Button>
      {endDate.toDateString()}
      <Modal onClose={handleCloseModal2} popup show={modalOpen2} size="md">
        <Modal.Header />
        <Modal.Body>
          <Calendar onChange={onChange2} value={endDate} />
        </Modal.Body>
      </Modal>
      <Button onClick={() => handleSubmit({ startDate, endDate })}>
        confirm
      </Button>
      <h1>Transaction List</h1>
      <TransactionItem transactionList={transactionList} />
    </div>
  );
};

export default TransactionMenu;
