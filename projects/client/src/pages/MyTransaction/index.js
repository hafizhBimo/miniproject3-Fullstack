import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
  HiShoppingCart
} from "react-icons/hi";

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
              <Sidebar.Item href="#" icon={HiInbox} label="3">
                <p>Transaction</p>
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiUser}>
                <p>Users</p>
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiShoppingBag}>
                <p>Products</p>
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiArrowSmRight}>
                <p>Sign In</p>
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiTable}>
                <p>Sign Up</p>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      <div></div>
    </div>
  );
};

export default MyTransaction;
