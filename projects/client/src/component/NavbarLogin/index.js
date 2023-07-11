import { Button, Dropdown, Navbar, Avatar } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setToken } from "../../features/authSlice";
import { HiCurrencyDollar, HiLogout, HiHome } from "react-icons/hi";
import MugenShop2 from "../../asset/MugenShop2.png";

const NavbarLogin = () => {
  const dispatch = useDispatch();
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img
          alt="Flowbite React Logo"
          style={{width:"200px"}}
          src={MugenShop2}
        />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="User settings"
              img="/Avatar-PNG-Photos.png"
              rounded={true}
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">neytiri</span>
          </Dropdown.Header>
          <Dropdown.Item icon={HiCurrencyDollar}>
            <Link to="/MyTransaction">My Transaction</Link>
          </Dropdown.Item>
          <Dropdown.Item icon={HiHome}>
            <Link to="/MyStore">My Store</Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item icon={HiLogout}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                localStorage.removeItem("token");
                dispatch(setToken(null));
              }}
            >
              Sign Out
            </a>
          </Dropdown.Item>
        </Dropdown>

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href="/CreateProductListing">Create Product</Navbar.Link>
        <Navbar.Link href="/ManageCategory">Manage Category</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarLogin;
