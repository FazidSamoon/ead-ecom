import { useState } from "react";
import Button from "../../atoms/button/Button";
import Icon from "../../atoms/icon/Icon";
import CommonTable from "../commonTable/CommonTable";
import PeopleSort from "../peopleFilters/PeopleSort";
import Chip from "../../atoms/chip/Chip";
import ProductModalController from "../productModalController/ProductModalController";

const ProductManagementTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContext, setModalContext] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);

  const headers = [
    { label: "Product Name", key: "productName" },
    { label: "Price", key: "price" },
    { label: "Instock", key: "instock" },
    { label: "Vendor", key: "vendor" },
    { label: "Category", key: "category" },
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
      setModalContext("EDIT_PRODUCT");
      setSelectedResource(row); // Set the selected resource for editing
      setOpenModal(true);
    } else if (action === "delete") {
      setModalContext("DELETE_RESOURCE");
      setSelectedResource(row); // Set the selected resource for deletion
      setOpenModal(true);
    }
  };

  const renderStatusChip = (status) => {
    let color = "";

    switch (status) {
      case "IN STOCK":
        color = "green";
        break;
      case "RESTOCK STATE":
        color = "orange";
        break;
      case "OUT OF STOCK":
        color = "red";
        break;
      default:
        color = "gray";
        break;
    }

    return <Chip label={status} color={color} />;
  };

  const rows = [
    {
      id: 1,
      productName: "Product A",
      price: 30,
      instock: "New York",
      vendor: "Vendor A",
      category: "Kitchen",
      status: "IN STOCK",
    },
    {
      id: 2,
      productName: "Product B",
      price: 45,
      instock: "London",
      vendor: "Vendor B",
      category: "Living Room",
      status: "OUT OF STOCK",
    },
    {
      id: 3,
      productName: "Product C",
      price: 60,
      instock: "San Francisco",
      vendor: "Vendor C",
      category: "Office",
      status: "RESTOCK STATE",
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
        <span className=" h5 mb-2">All Product Data</span>
        <Button
          title="Add New Product"
          onClick={() => {
            setModalContext("ADD_NEW_PRODUCT");
            setOpenModal(true);
          }}
        />
      </div>

      <CommonTable
        tableHeaders={headers}
        tableRows={tableRows}
        onRowClick={handleRowClick}
        sort={<PeopleSort />}
      />
      <ProductModalController
        isOpen={openModal}
        setModalContext={setModalContext}
        modalContext={modalContext}
        resourceData={selectedResource}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default ProductManagementTable;
