import { useNavigate } from "react-router-dom";
import "./sidenav.scss";
import { useState } from "react";

const sideNavData = [
  {
    id: "1",
    title: "Overview",
    icon: <i className="bi bi-house-door" />,
    url: "/",
  },
  {
    id: "2",
    title: "User Management",
    icon: <i className="bi bi-people-fill" />,
    url: "/users",
    rolesAllowed: ["admin"],
  },
  {
    id: "1",
    title: "Product Management",
    icon: <i className="bi bi-cart-dash-fill" />,
    url: "/products",
  },
  {
    id: "1",
    title: "Order Management",
    icon: <i className="bi bi-credit-card-2-back-fill" />,
    url: "/orders",
  },
  {
    id: "1",
    title: "Inventory Management",
    icon: <i className="bi bi-shop" />,
    url: "/inventory",
    rolesAllowed: ["admin"],
  },
  {
    id: "1",
    title: "Vender Management",
    icon: <i className="bi bi-person-raised-hand" />,
    url: "/vendor",
  },
];

const Sidenav = () => {
  const navigate = useNavigate();

  const userRole = localStorage.getItem("role");
  const [selectedPath, setSelectedPath] = useState("Overview");
  return (
    <div id="viewport">
      <div id="sidebar">
        <header>
          <a href="#">My App</a>
        </header>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            paddingBottom: 60,
          }}
        >
          <ul className="nav">
            {sideNavData
              .filter(
                (sidenav) =>
                  !sidenav.rolesAllowed ||
                  sidenav.rolesAllowed.includes(userRole)
              )
              .map((sidenav, index) => (
                <li
                  key={index}
                  style={{
                    backgroundColor:
                      selectedPath === sidenav.title ? "#50585c" : "",
                  }}
                >
                  <div
                    onClick={() => {
                      setSelectedPath(sidenav.title);
                      navigate(`${sidenav.url}`);
                    }}
                  >
                    {sidenav.icon} {sidenav.title}
                  </div>
                </li>
              ))}
          </ul>

          <ul className="nav">
            <li
              style={{
                backgroundColor: "#50585c",
              }}
            >
              <div
                onClick={() => {
                  localStorage.clear();
                  navigate("/auth/login");
                }}
              >
                SignOut
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
