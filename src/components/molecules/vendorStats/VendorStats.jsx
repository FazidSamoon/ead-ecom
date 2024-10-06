import Icon from "../../atoms/icon/Icon";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const VendorStats = () => {

  const fetchVendors = async () => {
    const { data } = await axios.get(
      "https://ecommerceapp2-patient-thunder-9872.fly.dev/api/Vendor"
    );
    return data;
  };

  const { data: vendors, isLoading } = useQuery({
    queryKey: ["vendors"],
    queryFn: fetchVendors,
  });
  return (
    <div className="d-flex flex-wrap gap-3">
      <div
        className="shadow rounded-2 p-3 d-flex align-items-center justify-content-center"
        style={{ width: "250px" }}
      >
        <Icon iconName="Basket" color="tomato" size={70} className="me-2" />
        <div className="d-flex flex-column align-items-center">
          <span className="h5 fw-normal">Total Vendors</span>
          <span className="h2 fw-bold">
          {!isLoading && vendors?.length > 0 ? vendors?.length : 0}{" "}
          </span>
        </div>
      </div>

      <div
        className="shadow rounded-2 p-3 d-flex align-items-center justify-content-center"
        style={{ width: "300px" }}
      >
        <Icon iconName="PersonPlusFill" color="tomato" size={70} className="me-2" />
        <div className="d-flex flex-column align-items-center">
          <span className="h5 fw-normal">New Incomings This Week</span>
          <span className="h2 fw-bold">90</span>
        </div>
      </div>
    </div>
  );
};

export default VendorStats;
