import axios from "axios";
import Button from "../../atoms/button/Button";
import Icon from "../../atoms/icon/Icon";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Chip from "../../atoms/chip/Chip";
import CommonTable from "../commonTable/CommonTable";
import CategoryModalController from "../categoryModalController/CategoryModalController";

const InventoryStats = () => {
  const [categoricalData, setCategoricalData] = useState([]);
  const [modalContext, setModalContext] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [tableRows, setTableRows] = useState([]);
  const categoricalProducts = async () => {
    const response = await axios.get(
      "https://ecommerceapp2-bold-dew-1540.fly.dev/api/ProductCategory/active-products"
    );

    return response.data;
  };

  const getAllCategories = async () => {
    const response = await axios.get(
      "https://ecommerceapp2-bold-dew-1540.fly.dev/api/ProductCategory"
    );
    return response.data;
  };

  const headers = [
    { label: "Category Id", key: "id" },
    { label: "Category Name", key: "name" },
    { label: "Product Count", key: "productCount" },
    { label: "Status", key: "isActive" },
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
      setModalContext("MANAGE_CATEGORIES");
      setSelectedResource(row);
      setOpenModal(true);
    } else if (action === "delete") {
      setModalContext("DELETE_CATEGORIES");
      setSelectedResource(row);
      setOpenModal(true);
    }
  };

  const renderStatusChip = (status) => {
    let color = "";

    switch (status) {
      case "ACTIVE":
        color = "green";
        break;
      case "INACTIVE":
        color = "orange";
        break;
      default:
        color = "gray";
        break;
    }

    return <Chip label={status} color={color} />;
  };

  const handleRowClick = (row) => {
    console.log(row)
    setModalContext("VIEW_CATEGORY");
    setSelectedResource(row);
    setOpenModal(true);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["activeProductsByCategories"],
    queryFn: categoricalProducts,
  });

  const { data: allCatrgories, isLoading: allCategoriesLoading } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  });

  useEffect(() => {
    if ((allCatrgories, !allCategoriesLoading)) {
      setTableRows(
        allCatrgories?.map((cat) => ({
          id: cat?.id,
          name: cat?.name,
          productCount: cat.products.length,
          products: cat?.products,
          isActive: renderStatusChip(cat?.isActive ? "ACTIVE" : "INACTIVE"),
          actions: renderActionButtons(cat),
        }))
      );
    }
  }, [allCatrgories, allCategoriesLoading]);

  useEffect(() => {
    if (data && !isLoading) {
      setCategoricalData(
        data.map((cat) => ({
          name: cat?.categoryName,
          count: cat?.products?.length,
        }))
      );
    }
  }, [data, isLoading]);

  return (
    <div>
      <div
        className=" d-flex"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span className="h5 fw-normal mb-2">Products by categories</span>
        <div className=" d-flex gap-1">
          {categoricalData?.length > 0 && (
            <Button
              title="Manage Categories"
              buttonType="link"
              onClick={() => {
                setModalContext("MANAGE_CATEGORIES");
                setOpenModal(true)
              }}
            />
          )}

          <Button
            title="Add New Categories"
            onClick={() => {
              setModalContext("ADD_CATEGORIES");
              setOpenModal(true)
            }}
          />
        </div>
      </div>

      <div className="d-flex flex-wrap gap-3 mt-5 mb-5">
        {categoricalData.map((category, index) => (
          <div
            key={index}
            className="shadow rounded-2 p-3 d-flex align-items-center justify-content-center"
            style={{ width: "250px" }}
          >
            <Icon iconName="Basket" color="tomato" size={70} className="me-2" />
            <div className="d-flex flex-column align-items-center">
              <span className="h5 fw-normal">{category.name}</span>
              <span className="h2 fw-bold">{category.count}</span>
            </div>
          </div>
        ))}
      </div>

      <CommonTable
        tableHeaders={headers}
        tableRows={tableRows}
        onRowClick={handleRowClick}
      />

      <CategoryModalController
        modalContext={modalContext}
        setModalContext={setModalContext}
        resourceData={selectedResource}
        setOpenModal={setOpenModal}
        isOpen={openModal}
      />
    </div>
  );
};

export default InventoryStats;
