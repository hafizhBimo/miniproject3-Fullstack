import { useState } from "react";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Label, TextInput, Button } from "flowbite-react";
import rupiah from "../../utils/currency";

const GrossIncome = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState(0);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const handleChange1 = (event) => {
    setInput1(event.target.value);
  };
  const handleChange2 = (event) => {
    setInput2(event.target.value);
  };
  const handleSubmit = () => {
    const dataList = {
      startDate: input1,
      endDate: input2,
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
          console.log(response.data);
        });
    } catch (error) {
      return;
    }
  };

  return (
    <div>
      <Label htmlFor="startDate1" value="Start Date" />
      <TextInput
        id="startDate1"
        placeholder="yyyy-mm-dd"
        type="text"
        value={input1}
        onChange={(event) => handleChange1(event)}
      />
      <Label htmlFor="endtDate1" value="End Date" />
      <TextInput
        id="endtDate1"
        placeholder="yyyy-mm-dd"
        type="text"
        value={input2}
        onChange={(event) => handleChange2(event)}
      />
      <Button onClick={() => handleSubmit()}>confirm</Button>
      <div className="container mx-auto px-20">
        <div className="flex flex-col w-full" style={{ cursor: "auto" }}>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
            <div
              className="metric-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full"
              style={{ cursor: "auto" }}
            >
              <div
                className="flex items-center text-gray-900 dark:text-gray-100"
                style={{ cursor: "auto" }}
              >
                Gross Income
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </div>
              <p
                className="mt-2 text-2xl font-bold spacing-sm text-black dark:text-white"
                style={{ cursor: "auto" }}
              >
                {rupiah(data.data)}
              </p>
            </div>
            <div
              className="metric-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full"
              style={{ cursor: "auto" }}
            >
              <div
                className="flex items-center text-gray-900 dark:text-gray-100"
                style={{ cursor: "auto" }}
              >
                total Quantity
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </div>
              <p
                className="mt-2 text-2xl font-bold spacing-sm text-black dark:text-white"
                style={{ cursor: "auto" }}
              >
                {data.totalQuantity} each
              </p>
            </div>
            <div
              className="metric-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full"
              style={{ cursor: "auto" }}
            >
              <div
                className="flex items-center text-gray-900 dark:text-gray-100"
                style={{ cursor: "auto" }}
              >
                items sold
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </div>
              <p
                className="mt-2 text-2xl font-bold spacing-sm text-black dark:text-white"
                style={{ cursor: "auto" }}
              >
                {data.uniqueItemsSold} item
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrossIncome;
