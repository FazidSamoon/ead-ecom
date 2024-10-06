import { useEffect, useState } from "react";
import Button from "../../atoms/button/Button";
import Icon from "../../atoms/icon/Icon";
import CommonTable from "../commonTable/CommonTable";
import PeopleSort from "../peopleFilters/PeopleSort";
import Chip from "../../atoms/chip/Chip";
import ProductModalController from "../productModalController/ProductModalController";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ProductManagementTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContext, setModalContext] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);

  const [tableRows, setTableRows] = useState([]);

  const fetchProducts = async () => {
    const { data } = await axios.get(
      "https://ecommerceapp2-patient-thunder-9872.fly.dev/api/Product/all"
    );
    return data;
  };

  const {
    data: products,
    isLoading,
  } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

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
      setSelectedResource(row);
      setOpenModal(true);
    } else if (action === "delete") {
      setModalContext("DELETE_PRODUCT");
      setSelectedResource(row);
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

  const handleRowClick = (row) => {
    setModalContext("VIEW_PRODUCT")
    setSelectedResource(row);
    setOpenModal(true);
  };

  useEffect(() => {
    if (products && !isLoading) {
      setTableRows(
        products?.map((product) => ({
          productName: product?.name,
          price: product?.price,
          instock: product.stock,
          vendor: product?.vendorId,
          category: product?.category,
          imageUrls: product?.imageUrls,
          status: renderStatusChip(
            product?.stock > 20
              ? "IN STOCK"
              : product?.stock > 0 && product?.stock <= 20
              ? "RESTOCK STATE"
              : "OUT OF STOCK"
          ),
          actions: renderActionButtons(product),
        }))
      );
    }
  }, [products, isLoading]);
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
