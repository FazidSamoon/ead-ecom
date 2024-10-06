import ProductManagementStats from "../../components/molecules/ProductManagementStats/ProductManagementStats";
import ProductManagementTable from "../../components/molecules/ProductManagementTable/ProductManagementTable";
import ProductAlerts from "../../components/molecules/productAlerts/ProductAlerts";

const ProductHome = () => {
  return (
    <div>
      <ProductManagementStats />
      {/* <ProductAlerts /> */}
      <ProductManagementTable />
    </div>
  );
};

export default ProductHome;
