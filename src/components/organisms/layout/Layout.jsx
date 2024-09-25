import { Outlet } from "react-router-dom";
import Sidenav from "../../molecules/sidenav/Sidenav";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  return (
    <div
      className=""
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {!location.pathname.includes("/auth") && <Sidenav />}
      <div
        className=" px-5 mt-5"
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
