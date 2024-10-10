import { useState } from "react";
import Button from "../../atoms/button/Button";
import Icon from "../../atoms/icon/Icon";
import CommonTable from "../commonTable/CommonTable";
import PeopleSort from "../peopleFilters/PeopleSort";
import UserManagementModalController from "../userManagementModalController/UserManagementModalController";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const UserManagementTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContext, setModalContext] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const queryClient = useQueryClient();

  // Fetch users data
  const fetchUsers = async () => {
    const { data } = await axios.get(
      "https://ecommerceapp-final-notification-config-autumn-night-6820.fly.dev/api/User/all"
    );
    return data;
  };

  // React query to fetch users
  const { data: users, isLoading, error } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });

  // Activate/Deactivate user mutation
  const activateDeactivateUser = async ({ userId, isActive }) => {
    const action = isActive ? "deactivate" : "activate";
    await axios.post(
      `https://ecommerceapp-final-notification-config-autumn-night-6820.fly.dev/api/User/${userId}/${action}`
    );
    queryClient.invalidateQueries("users"); // Refresh users data after action
  };

  const mutation = useMutation({
    mutationFn: async ({ userId, isActive }) => {
      return activateDeactivateUser({ userId, isActive });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries("users"); // Refresh users data after action
    },
  });

  // Table headers including Active status
  const headers = [
    { label: "Username", key: "username" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
    { label: "Active Status", key: "isActive" }, // New column for active status
    { label: "Created At", key: "createdAt" },
    { label: "Actions", key: "actions" },
  ];

  // Render Action buttons for each row
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
          title={row.isActive ? "Deactivate" : "Activate"} // Toggle based on active status
          className={row.isActive ? "btn btn-danger btn-sm" : "btn btn-success btn-sm"}
          onClick={() => mutation.mutate({ userId: row.id, isActive: row.isActive })}
          buttonType={row.isActive ? "danger" : "success"}
          endIcon={<Icon iconName={row.isActive ? "Trash" : "Check"} />}
        />
      </div>
    );
  };

  // Handle action click (for Edit and Delete modals)
  const handleActionClick = (event, action, row) => {
    event.stopPropagation();
    if (action === "edit") {
      setModalContext("EDIT_RESOURCE");
      setSelectedResource(row); // Set the selected resource for editing
      setOpenModal(true);
    }
    else if (action === "delete") {
      // setModalContext("DELETE_RESOURCE");
      // setSelectedResource(row); // Set the selected resource for deletion
      // setOpenModal(true);
    }


  };

  // Prepare table rows with active status
  const tableRows =
    users?.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role === 0 ? "User" : "Admin",
      isActive: user.isActive ? "Active" : "Inactive", // Display active status
      createdAt: new Date(user.createdAt)?.toLocaleDateString(),
      actions: renderActionButtons(user),
    })) || [];

  const handleRowClick = (row) => {
    // console.log(row);
    // alert(`Row clicked: ${row[0]}`);
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
