import { useState } from "react";
import Button from "../../atoms/button/Button";
import Icon from "../../atoms/icon/Icon";
import CommonTable from "../commonTable/CommonTable";
import PeopleSort from "../peopleFilters/PeopleSort";
import UserManagementModalController from "../userManagementModalController/UserManagementModalController";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UserManagementTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContext, setModalContext] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);

  const fetchUsers = async () => {
    const { data } = await axios.get(
      "https://ecommerceapp2-young-silence-7292.fly.dev/api/User/all"
    );
    return data;
  };

  // const {
  //   data: users,
  //   isLoading,
  //   error,
  // } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
  const headers = [
    { label: "Username", key: "username" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
    { label: "Created At", key: "createdAt" },
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
          endIcon={<Icon iconName="Trash" />}
        />
      </div>
    );
  };

  const handleActionClick = (event, action, row) => {
    event.stopPropagation();
    if (action === "edit") {
      setModalContext("EDIT_RESOURCE");
      setSelectedResource(row); // Set the selected resource for editing
      setOpenModal(true);
    } else if (action === "delete") {
      setModalContext("DELETE_RESOURCE");
      setSelectedResource(row); // Set the selected resource for deletion
      setOpenModal(true);
    }
  };

  const tableRows = []
    // users?.map((user) => ({
    //   username: user?.username,
    //   email: user?.email,
    //   role: user?.role === 0 ? "User" : "Admin",
    //   createdAt: new Date(user.createdAt)?.toLocaleDateString(),
    //   actions: renderActionButtons(user),
    // })) || [];

  const handleRowClick = (row) => {
    console.log(row);
    alert(`Row clicked: ${row[0]}`);
  };

  return (
    <div className=" mt-5">
      <div className=" d-flex justify-content-between align-items-center mb-2">
        <span className=" h5 mb-2">All Employee Data</span>
        <Button
          title="Add New Resource"
          onClick={() => {
            setModalContext("ADD_NEW_RESOURCE");
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

      <UserManagementModalController
        isOpen={openModal}
        modalContext={modalContext}
        setModalContext={setModalContext}
        setOpenModal={setOpenModal}
        resourceData={selectedResource}
      />
    </div>
  );
};

export default UserManagementTable;
