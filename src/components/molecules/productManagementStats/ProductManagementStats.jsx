import { useQuery } from "@tanstack/react-query";
import Icon from "../../atoms/icon/Icon";
import axios from "axios";

const ProductManagementStats = () => {
  const fetchProducts = async () => {
    const { data } = await axios.get(
      "https://ecommerceapp2-patient-thunder-9872.fly.dev/api/Product/all"
    );
    return data;
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  return (
    <div className="d-flex flex-wrap gap-3">
      <div
        className="shadow rounded-2 p-3 d-flex align-items-center justify-content-center"
        style={{ width: "250px" }}
      >
        <Icon iconName="Basket" color="tomato" size={70} className="me-2" />
        <div className="d-flex flex-column align-items-center">
          <span className="h5 fw-normal">Total Products</span>
          <span className="h2 fw-bold">
            {!isLoading && products?.length > 0 ? products?.length : 0}{" "}
          </span>
        </div>
      </div>

      <div
        className="shadow rounded-2 p-3 d-flex align-items-center justify-content-center"
        style={{ width: "270px" }}
      >
        <Icon iconName="Check2All" color="tomato" size={70} className="me-2" />
        <div className="d-flex flex-column align-items-center">
          <span className="h5 fw-normal">Product Releases</span>
          <span className="h2 fw-bold">90</span>
        </div>
      </div>
    </div>
  );
};

export default ProductManagementStats;
