import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/organisms/layout/Layout";
import { useEffect } from "react";
import Home from "./pages/HomePage/Home";
import UserManagementHome from "./pages/UserManagementViews/UserManagementHome/UserManagementHome";
import ProductHome from "./pages/ProductHome/ProductHome";
import UnAuthorized from "./components/organisms/unauthorized/UnAuthorized";
import OrderHome from "./pages/OrderHome/OrderHome";
import InventoryHome from "./pages/InventoryHome/InventoryHome";
import VendorHome from "./pages/VendorHome/VendorHome";
import Login from "./pages/LoginPage/Login";
import Signup from "./pages/SignupPage/Signup";

function App() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("role") == "admin";
  const user = localStorage.getItem("user");

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
                <Route path="login" register element={<Login />} />,
                <Route path="signup" element={<Signup />} />
              </Route>
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
