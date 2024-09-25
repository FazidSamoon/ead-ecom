import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./HomePage/Home";
import Login from "./LoginPage/Login";
import Signup from "./SignupPage/Signup";
import Layout from "../components/organisms/layout/Layout";
import UnAuthorized from "../components/organisms/unauthorized/unAuthorized";
import UserManagementHome from "./UserManagementViews/UserManagementHome/UserManagementHome";
import { useEffect } from "react";

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const isAdmin = true;
  const user = true;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [navigate, user]);
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          {user ? (
            <>
              <Route path="/" element={<Home />} />

              <Route
                path="/users/"
                element={user && isAdmin ? <UserManagementHome /> : <UnAuthorized />}
              />
            </>
          ) : (
            <>
              <Route path="auth">
                <Route path="login" element={<Login />} />,
                <Route path="register" element={<Signup />} />
              </Route>
            </>
          )}

          {/* <Route
            path="/inventory/*"
            element={
              user?.otherDetails.staff.position === "INVENTORY MANAGER" ? (
                <InventoryRoutes />
              ) : (
                <UnAuthorized />
              )
            }
          /> */}
          {/* <Route path="/customer/*" element={<CustomerRoutes />} />
          <Route path="/menu/*" element={<MenuRoutes />} />
          <Route path="/*" element={<FileNotFound />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default index;
