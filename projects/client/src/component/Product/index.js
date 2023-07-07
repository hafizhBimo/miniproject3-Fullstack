import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Badge } from "flowbite-react";
import rupiah from "../../utils/currency";
import { Pagination as FBP } from "flowbite-react";
import { Link } from "react-router-dom";
import TopProduct from "../../component/TopProduct";

const Product = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Search
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState("");

  // Sort
  const [sortValue, setSortValue] = useState("");
  const [orderValue, setOrderValue] = useState("");

  // categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          `http://localhost:8000/api/product?search=&order=&categoryId=&sort=&page=`
        );

        setUserData(response1.data.data);
        setTotalPages(Math.ceil(response1.data.pagination.totalData / 9));
        const response2 = await axios.get(
          "http://localhost:8000/api/categories"
        );

        setCategories(response2.data.list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOrderChange = (event) => {
    const neworderValue = event.target.value;
    setOrderValue(neworderValue);
    search(term, category, neworderValue, sortValue);
  };

  const handleSortChange = (event) => {
    const newSortValue = event.target.value;
    setSortValue(newSortValue);
    search(term, category, orderValue, newSortValue);
  };

  const handlePage = (page) => {
    axios
      .get(`http://localhost:8000/api/product?page=${page}`)
      .then((response) => {
        setCurrentPage(page);
        setUserData(response.data.data);
        console.log(response.data.data);
        setTotalPages(Math.ceil(response.data.pagination.totalData / 9));
      })
      .catch((err) => console.log(err));
  };

  const handleSearchChange = (event) => {
    setTerm(event.target.value);
    search(event.target.value, category, orderValue, sortValue);
  };

  const handleCategoryChange = (event) => {
    // console.log(event.target.value);
    setCategory(event.target.value);
    search(term, event.target.value, orderValue, sortValue);
  };

  const search = (term, category, orderValue, sortValue) => {
    console.log("Term: " + term);

    axios
      .get(
        `http://localhost:8000/api/product?search=${term}&order=${orderValue}&categoryId=${category}&sort=${sortValue}`
      )
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  const onPageChange = (page) => {
    if (page != currentPage) {
      handlePage(page);
    }
  };

  return (
    <>
      <div>
        {/* <TopProduct /> */}
        <form>
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
          ></input>
          <select value={category} onChange={handleCategoryChange}>
            <option value={""}>All</option>
            {categories.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
          <select value={orderValue} onChange={handleOrderChange}>
            <option value={""}>--orderBy--</option>
            <option value={"ASC"}>ASC</option>
            <option value={"DESC"}>DESC</option>
          </select>
          <select value={sortValue} onChange={handleSortChange}>
            <option value={""}>--sortBy--</option>
            <option value={"price"}>price</option>
            <option value={"name"}>name</option>
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
            <Link to={`/Product/${Product.id}`}>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                <p>{Product.name}</p>
              </h5>
            </Link>
            <h6>{Product.User.username}</h6>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {rupiah(Product.price)}
              </span>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-center text-center">
        <FBP
          currentPage={currentPage}
          layout="pagination"
          onPageChange={onPageChange}
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
