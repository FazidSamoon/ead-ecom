import { useNavigate } from "react-router-dom";

// Mocking the user role for this example
const userRole = "admin";

const views = [
  {
    id: "2",
    title: "User Management",
    icon: <i className="bi bi-people-fill" />,
    url: "/users",
    rolesAllowed: ["admin"], // Only admins can see this
  },
  {
    id: "3",
    title: "Product Management",
    icon: <i className="bi bi-cart-dash-fill" />,
    url: "/products",
  },
  {
    id: "4",
    title: "Order Management",
    icon: <i className="bi bi-credit-card-2-back-fill" />,
    url: "/orders",
  },
  {
    id: "5",
    title: "Inventory Management",
    icon: <i className="bi bi-shop" />,
    url: "/inventory",
    rolesAllowed: ["admin"], // Only admins can see this
  },
  {
    id: "6",
    title: "Vendor Management",
    icon: <i className="bi bi-person-raised-hand" />,
    url: "/vendor",
  },
];

const Home = () => {
  const navigate = useNavigate();

  // Filter views based on user roles (if rolesAllowed is specified)
  const filteredViews = views.filter(
    (view) => !view.rolesAllowed || view.rolesAllowed.includes(userRole)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Manage all of your business processes in ease
      </h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {filteredViews.map((view) => (
          <div
            key={view.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
              cursor: "pointer",
              width: "200px",
              textAlign: "center",
              backgroundColor: "#f9f9f9",
            }}
            onClick={() => navigate(view.url)}
          >
            <div style={{ fontSize: "30px", marginBottom: "10px" }}>
              {view.icon}
            </div>
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              {view.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
