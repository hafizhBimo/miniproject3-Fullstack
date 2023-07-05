import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Badge } from "flowbite-react";
import rupiah from "../../utils/currency";
import { Pagination as FBP } from "flowbite-react";

const Product = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Search
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState("");

  // Sort
  const [sortValue, setSortValue] = useState("DESC");

  // categories
  const [categories, setCategories] = useState([]);

  //   useEffect(() => {

  //     axios
  //       .get(
  //         "http://localhost:8000/api/product?search=&order=DESC&categoryId=&page=1"
  //       )
  //       .then((response) => {
  //         setUserData(response.data.data);
  //         setTotalPages(Math.ceil(response.data.pagination.totalData / 9));
  //         console.log(response, "ini userdata");
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:8000/api/categories")
  //       .then((response) => {
  //         setCategories(response.data.list);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          "http://localhost:8000/api/product?search=&order=DESC&categoryId=&page=1"
        );

        setUserData(response1.data.data);
        setTotalPages(Math.ceil(response1.data.pagination.totalData / 9));
        const response2 = await axios.get(
          "http://localhost:8000/api/categories"
        );

        setCategories(response2.data.list);
        console.log(response2.data.list, "babi");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleSortChange = (event) => {
    const newSortValue = event.target.value;
    setSortValue(newSortValue);
    search(term, category, newSortValue);
  };

  const handlePage = (page) => {
    setCurrentPage(page);
    axios
      .get(`http://localhost:8000/api/product?page=${page}`)
      .then((response) => {
        setUserData(response.data.data);
        setTotalPages(Math.ceil(response.data.pagination.totalData / 9));
      })
      .catch((err) => console.log(err));
  };

  const handleSearchChange = (event) => {
    setTerm(event.target.value);
    search(event.target.value, category, sortValue);
  };

  const handleCategoryChange = (event) => {
    // console.log(event.target.value);
    setCategory(event.target.value);
    search(term, event.target.value, sortValue);
  };

  const search = (term, category, sortValue) => {
    console.log("Term: " + term);

    axios
      .get(
        `http://localhost:8000/api/product?search=${term}&order=${sortValue}&categoryId=${category}`
      )
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <form>
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
          ></input>
        <select value={category} onChange={handleCategoryChange}>
          <option value={""}>All</option>
          {/* {console.log(categories.list)}
          {console.log("typeof: " + typeof categories.list)} */}
          {/* {Array(categories.list).map((category) =>
            <option value={category.ijd}>{category.name}</option>
          )} */}
          {/* {JSON.stringify(categories).map((category) => {
            <option value={category.id}>{category.name}</option>;
          })} */}
          {categories.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>
        <select value={sortValue} onChange={handleSortChange}>
            <option value={"ASC"}>ASC</option>
            <option value={"DESC"}>DESC</option>
          </select>
        </form>
      </div>
      <div className="grid grid-cols-4 gap-4 m-6">
        {userData.map((Product) => (
          <Card
            key={Product.id}
            imgAlt="test"
            imgSrc={`http://localhost:8000${Product.imageUrl}`}
          >
            <div className="">
              <span class="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                {Product.Category.name}
              </span>
            </div>
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                <p>{Product.name}</p>
              </h5>
            </a>
            <h6>{Product.User.username}</h6>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {rupiah(Product.price)}
              </span>
              <a
                className="rounded-lg bg-cyan-700 px-1 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                href="#"
              >
                <p>Add to cart</p>
              </a>
            </div>
          </Card>
        ))}
        </div>
        <div className="flex items-center justify-center text-center">
          <FBP
            currentPage={currentPage}
            layout="pagination"
            onPageChange={handlePage}
            showIcons={true}
            totalPages={totalPages}
            previousLabel="Go back"
            nextLabel="Go forward"
          />
      </div>
    </>
  );
};

export default Product;
