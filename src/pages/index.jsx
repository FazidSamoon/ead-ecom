import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./HomePage/Home";
import Login from "./LoginPage/Login";
import Signup from "./SignupPage/Signup";
import Layout from "../components/organisms/layout/Layout";
import UnAuthorized from "../components/organisms/unauthorized/unAuthorized";
import UserManagementHome from "./UserManagementViews/UserManagementHome/UserManagementHome";
import { useEffect } from "react";
import ProductHome from "./ProductHome/ProductHome";
import OrderHome from "./OrderHome/OrderHome";
import InventoryHome from "./InventoryHome/InventoryHome";
import VendorHome from "./VendorHome/VendorHome";

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("role") == "admin";
  const user = localStorage.getItem("user");

  console.log(isAdmin)

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
                element={user && isAdmin ? <ProductHome /> : <UnAuthorized />}
              />
              <Route
                path="/orders/"
                element={user && isAdmin ? <OrderHome /> : <UnAuthorized />}
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
                <Route path="" element={<Signup />} />
              </Route>
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
};

export default index;
