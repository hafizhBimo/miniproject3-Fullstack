import { Table, TextInput, Label, Button } from "flowbite-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import TransactionItem from "../TransactionItem";

const TransactionMenu = () => {
  const token = useSelector((state) => state.auth.token);
  const [transactionList, setTransactionList] = useState([]);
  const [input, setInput] = useState({
    startDate: "",
    endDate: "",
  });
  const handleChange = (event, type) => {
    const value = event.target.value;
    if (type == "startDate") {
      setInput({ ...input, startDate: value });
      console.log(event.target.value);
    } else {
      setInput({ ...input, endDate: value });
      console.log(event.target.value);
    }
  };
  const handleSubmit = (value) => {
    console.log(input, "ini input");
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
      <Label htmlFor="startDate1" value="Start Date" />
      <TextInput
        id="startDate1"
        placeholder="yyyy-mm-dd"
        type="text"
        value={input.startDate}
        onChange={(event) => handleChange(event, "startDate")}
      />
      <Label htmlFor="endDate1" value="End Date" />
      <TextInput
        id="endDate1"
        placeholder="yyyy-mm-dd"
        type="text"
        value={input.endDate}
        onChange={(event) => handleChange(event, "endDate")}
      />
      <Button onClick={() => handleSubmit(input)}>confirm</Button>
      <h1>Transaction List</h1>
      <TransactionItem transactionList={transactionList} />
    </div>
  );
};

export default TransactionMenu;
