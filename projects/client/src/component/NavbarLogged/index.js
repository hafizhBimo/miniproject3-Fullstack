import { useSelector } from "react-redux";
import NavbarLogin from "../NavbarLogin";
import NavbarLogout from "../NavbarLogout";


const NavbarLogged = () => {
  const token = useSelector(state => state.auth.token)
  if (token) {
    return <NavbarLogin />;
  }
  return <NavbarLogout />;
};

export default NavbarLogged;
