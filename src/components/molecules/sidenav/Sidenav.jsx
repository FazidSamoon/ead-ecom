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
    url: "/stats",
  },
  {
    id: "1",
    title: "Inventory Management",
    icon: <i className="bi bi-shop" />,
    url: "/stats",
  },
  {
    id: "1",
    title: "Vender Management",
    icon: <i className="bi bi-person-raised-hand" />,
    url: "/stats",
  },
];

const Sidenav = () => {
  const navigate = useNavigate();

  const [selectedPath, setSelectedPath] = useState("Overview");
  return (
    <div id="viewport">
      <div id="sidebar">
        <header>
          <a href="#">My App</a>
        </header>
        <ul className="nav">
          {sideNavData.map((sidenav, index) => (
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
      </div>
    </div>
  );
};

export default Sidenav;
