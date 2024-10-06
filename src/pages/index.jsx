import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./HomePage/Home";
import Login from "./LoginPage/Login";
import Signup from "./SignupPage/Signup";
import Layout from "../components/organisms/layout/Layout";
import UserManagementHome from "./UserManagementViews/UserManagementHome/UserManagementHome";
import { useEffect } from "react";
import ProductHome from "./ProductHome/ProductHome";
import OrderHome from "./OrderHome/OrderHome";
import InventoryHome from "./InventoryHome/InventoryHome";
import VendorHome from "./VendorHome/VendorHome";
import UnAuthorized from "../components/organisms/unauthorized/UnAuthorized"

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("role") == "admin";
  const user = localStorage.getItem("user");

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
                element={
                  user && isAdmin ? <UserManagementHome /> : <UnAuthorized />
                }
              />
              <Route
                path="/products/"
                element={user ? <ProductHome /> : <UnAuthorized />}
              />
              <Route
                path="/orders/"
                element={user ? <OrderHome /> : <UnAuthorized />}
              />
              <Route
                path="/inventory/"
                element={user && isAdmin ? <InventoryHome /> : <UnAuthorized />}
              />
              <Route
                path="/vendor/"
                element={user && isAdmin ? <VendorHome /> : <UnAuthorized />}
              />
            </>
          ) : (
            <>
              <Route path="auth">
                <Route path="login"register element={<Login />} />,
                <Route path="signup" element={<Signup />} />
              </Route>
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
};

export default index;
