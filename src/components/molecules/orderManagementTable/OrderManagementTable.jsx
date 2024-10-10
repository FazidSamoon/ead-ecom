import { useEffect, useState } from "react";
import Button from "../../atoms/button/Button";
import Icon from "../../atoms/icon/Icon";
import Chip from "../../atoms/chip/Chip";
import CommonTable from "../commonTable/CommonTable";
import PeopleSort from "../peopleFilters/PeopleSort";
import OrderModalController from "../orderModalController/OrderModalController";
import CommonFIlter from "../commonFIlter/CommonFIlter";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const OrderManagementTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContext, setModalContext] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [tableRows, setTableRows] = useState([]);
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  // Fetch orders
  const fetchOrders = async () => {
    const { data } = await axios.get(
      "https://ecommerceapp-final-notification-config-autumn-night-6820.fly.dev/api/Order/GetAll-detailed"
    );
    return data;
  };

  // Fetch customers
  const fetchCustomers = async () => {
    const { data } = await axios.get(
      "https://ecommerceapp-final-notification-config-autumn-night-6820.fly.dev/api/User/all"
    );
    return data;
  };

  const {
    data: orders,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useQuery({ queryKey: ["orders"], queryFn: fetchOrders });

  const {
    data: customers,
    isLoading: customersLoading,
    isError: customersError,
  } = useQuery({ queryKey: ["customers"], queryFn: fetchCustomers });

  useEffect(() => {
    if (orders && customers && !ordersLoading && !customersLoading) {
      let filteredOrders = orders;

      // Filter orders for vendors if applicable
      if (role === "vendor") {
        filteredOrders = orders.filter((order) =>
          order.items.some((item) => item.vendor.vendorId === userId)
        );
      }

      // Map customer info to orders
      const updatedTableRows = filteredOrders.map((order) => {
        const customer = customers.find((c) => c.id === order.customerId);

        return {
          orderId: order.id,
          name: customer ? `${customer.firstName} ${customer.lastName}` : "N/A",
          phone: customer ? customer.phoneNumber : "N/A",
          address: customer ? customer.address : "N/A",
          productName: order?.items.map((item) => item.product.name).join(", "),
          quantity: order.items.reduce((acc, item) => acc + item.quantity, 0),
          status:
            order.status === 0
              ? "PROCESSING"
              : order.status === 1
              ? "READY FOR DELIVERY"
              : order.status === 2
              ? "PARTIALLY DELIVERED"
              : order.status === 3
              ? "DELIVERED"
              : order.status === 4
              ? "CANCELLED"
              : "REQUESTED TO CANCEL",
          productRemain: order.items[0]?.product.stock,
          items: order?.items,
          actions: renderActionButtons(order),
        };
      });

      setTableRows(updatedTableRows);
    }
  }, [orders, customers, ordersLoading, customersLoading, role, userId]);

  const headers = [
    { label: "Order Id", key: "orderId" },
    { label: "Customer name", key: "name" },
    { label: "Customer Phone", key: "phone" },
    { label: "Address", key: "address" },
    { label: "Product Name", key: "productName" },
    { label: "Quantity", key: "quantity" },
    { label: "Remaining Products", key: "productRemain" },
    { label: "Status", key: "status" },
    { label: "Actions", key: "actions" },
  ];

  const renderActionButtons = (row) => {
    return (
      <div className="d-flex gap-1">
        <Button
          title="Edit"
          className="btn btn-primary btn-sm me-2"
          onClick={(e) => handleActionClick(e, "edit", row)}
          buttonType="secondary"
          endIcon={<Icon iconName="Pencil" />}
        />
        <Button
          title="Delete"
          className="btn btn-danger btn-sm"
          onClick={(e) => handleActionClick(e, "delete", row)}
          buttonType="danger"
          endIcon={<Icon iconName="Archive" />}
        />
      </div>
    );
  };

  const handleActionClick = (event, action, row) => {
    event.stopPropagation();
    if (action === "edit") {
      setModalContext("EDIT_ORDER");
      setSelectedResource(row);
      setOpenModal(true);
    } else if (action === "delete") {
      setModalContext("DELETE_ORDER");
      setSelectedResource(row);
      setOpenModal(true);
    }
  };

  const renderStatusChip = (status) => {
    let color = "";

    switch (status) {
      case "DELIVERED":
        color = "green";
        break;
      case "PENDING":
        color = "orange";
        break;
      case "REJECTED":
        color = "red";
        break;
      case "RETURNED":
        color = "gray";
        break;
      default:
        color = "gray";
        break;
    }

    return <Chip label={status} color={color} />;
  };

  const handleRowClick = (row) => {
    console.log(row);
    alert(`Row clicked: ${row[0]}`);
  };

  return (
    <div className=" mt-5">
      <div className=" d-flex justify-content-between align-items-center mb-2">
        <span className=" h5 mb-2">All Order Data</span>
        <Button
          title="Add New Order"
          onClick={() => {
            setModalContext("ADD_NEW_ORDER");
            setSelectedResource(null);
            setOpenModal(true);
          }}
        />
      </div>

      <CommonTable
        tableHeaders={headers}
        tableRows={tableRows}
        onRowClick={handleRowClick}
        sort={<PeopleSort />}
        filter={<CommonFIlter />}
      />
      <OrderModalController
        isOpen={openModal}
        setModalContext={setModalContext}
        modalContext={modalContext}
        resourceData={selectedResource}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default OrderManagementTable;
