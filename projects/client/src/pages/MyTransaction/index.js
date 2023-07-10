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
import TransactionMenu from "../../component/TransactionMenu";
import withAuth from "../../component/withAuth";

const MyTransaction = () => {
  const [cartData, setCartData] = useState(0);
  const [menu, setMenu] = useState(<CartList setCartData={setCartData} />);

  return (
    <div className="grid grid-cols-3">
      <div className="cols-span-1">
        <Sidebar aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="#"
                icon={HiShoppingCart}
                label={cartData}
                labelColor="dark"
                onClick={() => setMenu(<CartList setCartData={setCartData} />)}
              >
                <p>cart</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiCurrencyDollar}
                
                onClick={() => setMenu(<TransactionMenu />)}
              >
                <p>Transaction</p>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      <div className="col-start-2 col-end-4">{menu}</div>
    </div>
  );
};

export default withAuth(MyTransaction);
