import InventoryStats from "../../components/molecules/inventoryStats/InventoryStats";
import ProductAlerts from "../../components/molecules/productAlerts/ProductAlerts";

const InventoryHome = () => {
  return (
    <div>
      <InventoryStats />
      <ProductAlerts />
    </div>
  );
};

export default InventoryHome;
