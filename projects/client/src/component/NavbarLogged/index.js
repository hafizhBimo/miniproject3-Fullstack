import NavbarLogin from "../NavbarLogin";
import NavbarLogout from "../NavbarLogout";


const NavbarLogged = () => {
  if (localStorage.getItem("token")) {
    return <NavbarLogin />;
  }
  return <NavbarLogout />;
};

export default NavbarLogged;
