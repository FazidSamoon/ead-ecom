import UserManagementStats from "../../../components/molecules/UserManagementStats/UserManagementStats";
import UserManagementTable from "../../../components/molecules/userManagementTables/UserManagementTable";

const UserManagementHome = () => {
  return (
    <div>
      <UserManagementStats />
      <UserManagementTable />
    </div>
  );
};

export default UserManagementHome;
