import { useEffect, useState } from "react";
import Button from "../../atoms/button/Button";
import Icon from "../../atoms/icon/Icon";
import Chip from "../../atoms/chip/Chip";
import CommonTable from "../commonTable/CommonTable";
import PeopleSort from "../peopleFilters/PeopleSort";
import VendorModalController from "../vendorModalController/VendorModalController";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const VendorTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContext, setModalContext] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [tableRows, setTableRows] = useState([]);

  const headers = [
    { label: "VendorName", key: "name" },
    { label: "address", key: "address" },
    { label: "email", key: "email" },
    { label: "Average Rating", key: "averageRating" },
    // { label: "Total Rating", key: "totalRating" },
    { label: "Status", key: "status" },
    { label: "Actions", key: "actions" },
  ];

  // Fetch vendors
  const fetchVendors = async () => {
    const { data } = await axios.get(
      "https://ecommerceapp-final-notification-config-autumn-night-6820.fly.dev/api/User/all"
    );
    return data;
  };

  // Fetch average rating for a vendor
  const fetchAverageRating = async (vendorId) => {
    const response = await axios.get(
      `https://ecommerceapp-final-notification-config-autumn-night-6820.fly.dev/api/Rating/vendor/${vendorId}/average`
    );
    return response.data; // The float value (e.g., 3.4)
  };

  const { data: vendors, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchVendors,
  });

  const renderActionButtons = (row) => (
    <div className="d-flex gap-1">
      <Button
        title="Edit"
        className="btn btn-primary btn-sm me-2"
        onClick={(e) => handleActionClick(e, "edit", row)}
        buttonType="secondary"
        endIcon={<Icon iconName="Pencil" />}
      />
      <Button
        title="Deactivate"
        className="btn btn-danger btn-sm"
        onClick={(e) => handleActionClick(e, "delete", row)}
        buttonType="danger"
        endIcon={<Icon iconName="Archive" />}
      />
    </div>
  );

  const handleActionClick = (event, action, row) => {
    event.stopPropagation();
    if (action === "edit") {
      setModalContext("EDIT_VENDOR");
      setSelectedResource(row);
      setOpenModal(true);
    } else if (action === "delete") {
      setModalContext("DELETE_VENDOR");
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
      case "DEACTIVATED":
        color = "orange";
        break;
    }
    return <Chip label={status} color={color} />;
  };

  const handleRowClick = (row) => {
    console.log(row);
    alert(`Row clicked: ${row[0]}`);
  };

  useEffect(() => {
    if (vendors && !isLoading) {
      const fetchRatingsForVendors = async () => {
        const vendorData = await Promise.all(
          vendors
            ?.filter((user) => user.role == 1)
            ?.map(async (vendor) => {
              const averageRating = await fetchAverageRating(vendor.id);
              return {
                id: vendor?.id,
                name: vendor?.username,
                address: vendor?.address,
                email: vendor?.email,
                averageRating: averageRating.toFixed(1), // Displaying as 3.4, 4.5, etc.
                status: renderStatusChip(vendor.isActive ? "ACTIVE" : "DEACTIVATED"),
                actions: renderActionButtons(vendor),
              };
            })
        );
        setTableRows(vendorData);
      };
      fetchRatingsForVendors();
    }
  }, [isLoading, vendors]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="h5 mb-2">All Vendor Data</span>
        <Button
          title="Add New Vendor"
          onClick={() => {
            setModalContext("ADD_NEW_VENDOR");
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
      <VendorModalController
        isOpen={openModal}
        setModalContext={setModalContext}
        modalContext={modalContext}
        resourceData={selectedResource}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default VendorTable;
