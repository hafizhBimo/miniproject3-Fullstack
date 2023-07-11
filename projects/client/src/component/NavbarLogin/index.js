import { Button, Dropdown, Navbar, Avatar } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setToken } from "../../features/authSlice";
import { HiCurrencyDollar, HiLogout, HiHome } from "react-icons/hi";
import MugenShop2 from "../../asset/MugenShop2.png";
import axios from "axios";
import { useState } from "react";

const NavbarLogin = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  try {
    axios("http://localhost:8000/api/auth/keepLogin", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      console.log(response, "ini login");
      setUsername(response.data.data.username);
    });
  } catch (error) {
    return console.log(error);
  }
  return (
    <Navbar
      fluid
      rounded
      className="border rounded border-sky-500 bg-[#73beb0]"
    >
      <Navbar.Brand href="/">
        <img
          alt="Flowbite React Logo"
          style={{ width: "200px" }}
          src={MugenShop2}
        />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={<Avatar rounded></Avatar>}
        >
          <Dropdown.Header>
            <span className="block text-sm">{username}</span>
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
        <Navbar.Link className="text-green-950 font-bold" href="/">
          Home
        </Navbar.Link>
        <Navbar.Link
          className="text-green-950 font-bold"
          href="/CreateProductListing"
        >
          Create Product
        </Navbar.Link>
        <Navbar.Link
          className="text-green-950 font-bold"
          href="/ManageCategory"
        >
          Manage Category
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarLogin;
