import { Button, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();
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
        <Button onClick={() => navigate("/login")}>Login</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
