import { useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiShoppingCart,
  HiCurrencyDollar,
} from "react-icons/hi";
import CartList from "../../component/CartList";

const MyTransaction = () => {
  const [cartData, setCartData] = useState(0);
  return (
    <div className="grid grid-cols-3">
      <div className="cols-span-1">
        <Sidebar aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiChartPie}>
                <p>Dashboard</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiShoppingCart}
                label={cartData}
                labelColor="dark"
              >
                <p>cart</p>
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiCurrencyDollar} label="3">
                <p>Transaction</p>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      <div className="col-start-2 col-end-4">
        <h1>Cart</h1>
        <CartList setCartData={setCartData} />
      </div>
    </div>
  );
};

export default MyTransaction;
