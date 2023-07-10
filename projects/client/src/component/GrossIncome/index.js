import React,{ useState } from "react";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Label, TextInput, Button, Modal } from "flowbite-react";
import rupiah from "../../utils/currency";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


const GrossIncome = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState(0);
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
  
  const handleSubmit = () => {
    const dataList = {
      startDate: startDate,
      endDate: endDate,
    };
    try {
      axios
        .post("http://localhost:8000/api/grossIncome", dataList, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
        });
    } catch (error) {
      return;
    }
  };

  return (
    <div>
      <Button onClick={handleToggleModal1}>
          choose start date
      </Button>
      {startDate.toDateString()}
      <Modal
        onClose={handleCloseModal1}
        popup
        show = {modalOpen1}
        size="md"
      >
        <Modal.Header />
          <Modal.Body>
            <Calendar onChange={onChange1} value={startDate} />
          </Modal.Body>
      </Modal>
          <Button onClick={handleToggleModal2}>
              choose end date
          </Button>
          {endDate.toDateString()}
      <Modal
          onClose={handleCloseModal2}
          popup
          show = {modalOpen2}
          size="md"
       >
        <Modal.Header />
            <Modal.Body>
            <Calendar onChange={onChange2} value={endDate} />
          </Modal.Body>
      </Modal>
      <Button onClick={() => handleSubmit()}>confirm</Button>
      <div className="container mx-auto px-20">
        <div className="flex flex-col w-full" style={{ cursor: "auto" }}>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
            <div
              className="metric-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full"
              style={{ cursor: "auto" }}
            >
              <a
                aria-label="Unsplash Downloads"
                target="_blank"
                rel="noopener noreferrer"
                href="https://stackdiary.com/"
              >
                <div
                  className="flex items-center text-gray-900 dark:text-gray-100"
                  style={{ cursor: "auto" }}
                >
                  Gross Income
                  <svg
                    className="h-4 w-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ cursor: "auto" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </a>
              <p
                className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white"
                style={{ cursor: "auto" }}
              >
                {data.data ? rupiah(data.data) : rupiah(0)}

              </p>
            </div>
            <div
              className="metric-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full"
              style={{ cursor: "auto" }}
            >
              <a
                aria-label="Unsplash Views"
                target="_blank"
                rel="noopener noreferrer"
                href="https://stackdiary.com/"
              >
                <div
                  className="flex items-center text-gray-900 dark:text-gray-100"
                  style={{ cursor: "auto" }}
                >
                  total Quantity
                  <svg
                    className="h-4 w-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </a>
              <p
                className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white"
                style={{ cursor: "auto" }}
              >
                {data.totalQuantity ? data.totalQuantity : 0} pcs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrossIncome;
