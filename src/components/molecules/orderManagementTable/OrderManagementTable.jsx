import { useState } from "react";
import Button from "../../atoms/button/Button";
import Icon from "../../atoms/icon/Icon";
import Chip from "../../atoms/chip/Chip";
import CommonTable from "../commonTable/CommonTable";
import PeopleSort from "../peopleFilters/PeopleSort";
import OrderModalController from "../orderModalController/OrderModalController";
import CommonFIlter from "../commonFIlter/CommonFIlter";

const OrderManagementTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContext, setModalContext] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);

  const headers = [
    { label: "Order Id", key: "orderId" },
    { label: "Customer name", key: "customerName" },
    { label: "Customer Phone", key: "customerPhone" },
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

  const rows = [
    {
      orderId: 1,
      customerName: "Customer A",
      customerPhone: "884473822",
      address: "SL CMB",
      productName: "Product A",
      quantity: 10,
      status: "DELIVERED",
      productRemain: 100,
    },
    {
      orderId: 1,
      customerName: "Customer A",
      customerPhone: "884473822",
      address: "SL CMB",
      productName: "Product A",
      quantity: 10,
      status: "PENDING",
      productRemain: 100,
    },
    {
      orderId: 1,
      customerName: "Customer A",
      customerPhone: "884473822",
      address: "SL CMB",
      productName: "Product A",
      quantity: 10,
      status: "REJECTED",
      productRemain: 100,
    },
  ];

  const tableRows = rows.map((row) => ({
    ...row,
    status: renderStatusChip(row.status),
    actions: renderActionButtons(row),
  }));

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
