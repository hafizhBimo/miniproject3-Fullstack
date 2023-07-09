import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Badge } from "flowbite-react";
import rupiah from "../../utils/currency";
import { Pagination as FBP } from "flowbite-react";
import { Link } from "react-router-dom";
import TopProduct from "../../component/TopProduct";
import { useSelector } from "react-redux";

const MyProduct = () => {
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
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          `http://localhost:8000/api/product/myProduct`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
      .get(
        `http://localhost:8000/api/product?page=${page}&order=${orderValue}&sort=${sortValue}`
      )
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

  // active deactive
  const handleToggleActive = async (productId) => {
    try {
      const updatedUserData = userData.map((Product) => {
        if (Product.id === productId) {
          return {
            ...Product,
            active: !Product.active, // Toggle the `active` property
          };
        }
        return Product;
      });
  
      setUserData(updatedUserData);
  
      // Make an API call to update the product's status
      await axios.put(
        `http://localhost:8000/api/product/${productId}`,
        { status: updatedUserData.find((Product) => Product.id === productId).active ? "active" : "deactive" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error toggling product active status:", error);
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
      <div className="grid grid-cols-3 gap-5 m-7">
        {userData.map((Product) => (
          <Card
            className=" w-100 my-15"
            key={Product.id}
            imgAlt="test"
            imgSrc={`http://localhost:8000${Product.imageUrl}`}
          >
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={Product.active}
                onChange={() => handleToggleActive(Product.id)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border-gray-600 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {Product.active ? "Active" : "Deactive"} toggle
              </span>
            </label>
            <div className="">
              <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
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

export default MyProduct;
