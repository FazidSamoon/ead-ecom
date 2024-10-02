import Button from "../../atoms/button/Button";
import Icon from "../../atoms/icon/Icon";

const categories = [
  {
    name: "Furnitures",
    count: 100,
  },
  {
    name: "Office Items",
    count: 20,
  },
  {
    name: "Pantry Items",
    count: 10,
  },
];

const InventoryStats = () => {
  return (
    <div>
      <div
        className=" d-flex"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span className="h5 fw-normal mb-2">Products by categories</span>
        <div className=" d-flex gap-1">
          {categories?.length > 0 && (
            <Button title="Manage Categories" buttonType="link" />
          )}

          <Button title="Add New Categories" />
        </div>
      </div>

      <div className="d-flex flex-wrap gap-3 mt-5">
        {categories.map((category, index) => (
          <div
            key={index}
            className="shadow rounded-2 p-3 d-flex align-items-center justify-content-center"
            style={{ width: "250px" }}
          >
            <Icon iconName="Basket" color="tomato" size={70} className="me-2" />
            <div className="d-flex flex-column align-items-center">
              <span className="h5 fw-normal">{category.name}</span>
              <span className="h2 fw-bold">{category.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryStats;
