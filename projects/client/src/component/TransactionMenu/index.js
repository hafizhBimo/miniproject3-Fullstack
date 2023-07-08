import { Table, TextInput, Label, Button } from "flowbite-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const TransactionMenu = () => {
  const token = useSelector((state) => state.auth.token);
  const [transactionList, setTransactionList] = useState([]);
  const [input, setInput] = useState("");
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = (value, action) => {
    try {
      axios
        .post(`http://localhost:8000/api/totalTransaction`, value, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setTransactionList(response.data.data);
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
        value={input}
        onChange={handleChange}
      />
      <Label htmlFor="endtDate1" value="End Date" />
      <TextInput id="endtDate1" placeholder="yyyy-mm-dd" type="text" />
      <Button onClick={()=>handleSubmit()}>confirm</Button>
      <Table>
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Color</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Apple MacBook Pro 17"
            </Table.Cell>
            <Table.Cell>Sliver</Table.Cell>
            <Table.Cell>Laptop</Table.Cell>
            <Table.Cell>$2999</Table.Cell>
            <Table.Cell>
              <a
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>Edit</p>
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <p>Microsoft Surface Pro</p>
            </Table.Cell>
            <Table.Cell>White</Table.Cell>
            <Table.Cell>Laptop PC</Table.Cell>
            <Table.Cell>$1999</Table.Cell>
            <Table.Cell>
              <a
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>Edit</p>
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Magic Mouse 2
            </Table.Cell>
            <Table.Cell>Black</Table.Cell>
            <Table.Cell>Accessories</Table.Cell>
            <Table.Cell>$99</Table.Cell>
            <Table.Cell>
              <a
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>Edit</p>
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default TransactionMenu;
