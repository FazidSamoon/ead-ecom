import { Route, Routes } from "react-router-dom";
import Home from "./HomePage/Home";
import Login from "./LoginPage/Login";
import Signup from "./SignupPage/Signup";

const index = () => {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="auth">
            <Route path="login" element={<Login />} />,
            <Route path="register" element={<Signup />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default index;
