import { Outlet } from "react-router-dom";
import Nav from "./components/nav-component";
import FooterComponent from "./components/footer-component";
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
