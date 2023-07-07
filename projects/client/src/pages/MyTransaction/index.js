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
  return (
    <div className="grid grid-cols-2">
      <div>
        <Sidebar aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiChartPie}>
                <p>Dashboard</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiShoppingCart}
                label="Pro"
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
      <div>
        <CartList />
      </div>
    </div>
  );
};

export default MyTransaction;
