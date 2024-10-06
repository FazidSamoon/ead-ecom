import { useQuery } from "@tanstack/react-query";

const ProductAlerts = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["lowStockProducts"],
    queryFn: async () => {
      const response = await fetch(
        "https://ecommerceapp2-patient-thunder-9872.fly.dev/api/Inventory/lowstock/details"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching low stock details: {error.message}</div>;
  }

  const getAlertStatus = (availableStock) => {
    if (availableStock === 0) {
      return { message: "is out of stock", color: "red" };
    } else if (availableStock > 0 && availableStock < 15) {
      return { message: "reached restock level", color: "orange" };
    }
    return { message: "is sufficiently stocked", color: "green" };
  };

  return (
    <div className="mt-5 pb-3">
      <span className="h4">Alerts</span>

      <div
        className="shadow p-4 mt-2 flex-column w-50"
        style={{
          maxHeight: 200,
          overflow: "auto",
        }}
      >
        {data?.map((product) => {
          const { message, color } = getAlertStatus(product.availableStock);

          return (
            <div
              className="d-flex align-items-center gap-2 mb-3"
              key={product.productId}
            >
              <div
                style={{
                  height: 10,
                  width: 10,
                  backgroundColor: color,
                  borderRadius: 50,
                }}
              ></div>
              <span>
                {product.name} {message}.
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductAlerts;
