import { Button, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import MugenShop2 from "../../asset/MugenShop2.png";

const NavbarLogout = () => {
  const navigate = useNavigate();
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
        <Button onClick={() => navigate("/login")}>Login</Button>
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

export default NavbarLogout;
