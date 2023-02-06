import { Outlet } from "react-router-dom";
import Nav from "./nav-component";
import FooterComponent from "./footer-component";
const Layout = ({ currentUser, setCurrentUser }) => {
  return (
    <div>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
      <FooterComponent />
    </div>
  );
};

export default Layout;
