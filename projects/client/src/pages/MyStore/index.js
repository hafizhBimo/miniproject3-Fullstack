import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiShoppingCart,
  HiCurrencyDollar,
  HiShoppingBag,
} from "react-icons/hi";
import CartList from "../../component/CartList";
import TransactionMenu from "../../component/TransactionMenu";
import { useState } from "react";
import MyProduct from "../../component/MyProduct";
import GrossIncome from "../../component/GrossIncome";

const MyStore = () => {
  const [menu, setMenu] = useState(<MyProduct />);
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
                icon={HiShoppingBag}
                labelColor="dark"
                onClick={() => setMenu(<MyProduct />)}
              >
                <p>My Product</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiCurrencyDollar}
                label="3"
                onClick={() => setMenu(<GrossIncome />)}
              >
                <p>Gross Income</p>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      <div className="col-start-2 col-end-4">{menu}</div>
    </div>
  );
};

export default MyStore;
