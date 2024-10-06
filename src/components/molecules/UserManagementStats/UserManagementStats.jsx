import { useQuery } from "@tanstack/react-query";
import Icon from "../../atoms/icon/Icon";
import axios from "axios";
import { useEffect, useState } from "react";

const UserManagementStats = () => {

  const [pendingUsers, setPendingUsers] = useState(0)

  const fetchUsers = async () => {
    const { data } = await axios.get(
      "https://ecommerceapp2-patient-thunder-9872.fly.dev/api/User/all"
    );
    return data;
  };

  const {
    data: users,
    isLoading,
  } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });


  useEffect(() => {
    if (users && !isLoading) {
      const inactiveUsers = users?.filter((user) => !user?.isActive)

      setPendingUsers(inactiveUsers.length)
    }
  }, [users, isLoading])
  return (
    <div className="d-flex flex-wrap gap-3">
      <div
        className="shadow rounded-2 p-3 d-flex align-items-center justify-content-center"
        style={{ width: "250px" }}
      >
        <Icon iconName="PeopleFill" color="tomato" size={70} className="me-2" />
        <div className="d-flex flex-column align-items-center">
          <span className="h5 fw-normal">Total Users</span>
          <span className="h2 fw-bold">{users?.length}</span>
        </div>
      </div>

      <div
        className="shadow rounded-2 p-3 d-flex align-items-center justify-content-center"
        style={{ width: "250px" }}
      >
        <Icon iconName="HourglassSplit" color="tomato" size={70} className="me-2" />
        <div className="d-flex flex-column align-items-center">
          <span className="h5 fw-normal">Pending Invites</span>
          <span className="h2 fw-bold">{pendingUsers}</span>
        </div>
      </div>

      <div
        className="shadow rounded-2 p-3 d-flex align-items-center justify-content-center"
        style={{ width: "250px" }}
      >
        <Icon iconName="PeopleFill" color="tomato" size={70} className="me-2" />
        <div className="d-flex flex-column align-items-center">
          <span className="h5 fw-normal">Total Users</span>
          <span className="h2 fw-bold">90</span>
        </div>
      </div>
    </div>
  );
};

export default UserManagementStats;
