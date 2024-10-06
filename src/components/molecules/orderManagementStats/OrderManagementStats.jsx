import axios from "axios";
import Icon from "../../atoms/icon/Icon";
import { useQuery } from "@tanstack/react-query";

const OrderManagementStats = () => {
  const fetchOrders = async () => {
    const { data } = await axios.get(
      "https://ecommerceapp2-still-field-5715.fly.dev/api/Order/GetAll-detailed"
    );
    return data;
  };

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["orders"], queryFn: fetchOrders });

  console.log(orders);
  return (
    <div className="d-flex flex-wrap gap-3">
      <div
        className="shadow rounded-2 p-3 d-flex align-items-center justify-content-center"
        style={{ width: "250px" }}
      >
        <Icon iconName="Basket" color="tomato" size={70} className="me-2" />
        <div className="d-flex flex-column align-items-center">
          <span className="h5 fw-normal">New Orders</span>
          <span className="h2 fw-bold">{orders?.length ?? 0}</span>
        </div>
      </div>

      <div
        className="shadow rounded-2 p-3 d-flex align-items-center justify-content-center"
        style={{ width: "270px" }}
      >
        <Icon iconName="Clock" color="tomato" size={70} className="me-2" />
        <div className="d-flex flex-column align-items-center">
          <span className="h5 fw-normal">Pending Today</span>
          <span className="h2 fw-bold">
            {orders?.filter((order) => order?.status === 0).length}
          </span>
        </div>
      </div>

      <div
        className="shadow rounded-2 p-3 d-flex align-items-center justify-content-center"
        style={{ width: "250px" }}
      >
        <Icon iconName="PeopleFill" color="tomato" size={70} className="me-2" />
        <div className="d-flex flex-column align-items-center">
          <span className="h5 fw-normal">Cancelled</span>
          <span className="h2 fw-bold">{orders?.filter((order) => order?.status === 4)?.length}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderManagementStats;
