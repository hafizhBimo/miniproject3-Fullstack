import { Button, Dropdown, Navbar, Avatar } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setToken } from "../../features/authSlice";

const NavbarLogin = () => {
  const dispatch = useDispatch();
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img
          alt="Flowbite React Logo"
          className="mr-3 h-6 sm:h-9"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxdkHKLUaOFD-PuO8f9lOb-nRTaphpfXxQqyCaWPRsFN8HXZK7Ja0g6shAJkh6sYITTuM&usqp=CAU"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          eat-sleep-game-repeat
        </span>
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
          <Dropdown.Item>
            <Link to="/myStore">My Store</Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("token");
              dispatch(setToken(null))
              }}>
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
