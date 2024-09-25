import Button from "../../atoms/button/Button";
import Icon from "../../atoms/icon/Icon";
import CommonTable from "../commonTable/CommonTable";
import PeopleFilter from "../peopleFilters/PeopleFilter";
import PeopleSort from "../peopleFilters/PeopleSort";

const UserManagementTable = () => {
  const headers = [
    { label: "Name", key: "name" },
    { label: "Age", key: "age" },
    { label: "City", key: "city" },
    { label: "Occupation", key: "occupation" },
    { label: "Actions", key: "actions" },
  ];

  const renderActionButtons = () => {
    return (
      <div className=" d-flex gap-1">
        <Button
          title="Edit"
          className="btn btn-primary btn-sm me-2"
          onClick={(e) => handleActionClick(e, "view", "John Doe")}
          buttonType={"secondary"}
          endIcon={<Icon iconName={"Pencil"} />}
        />
        <Button
          title="Delete"
          className="btn btn-danger btn-sm"
          onClick={(e) => handleActionClick(e, "remove", "John Doe")}
          buttonType={"danger"}
          endIcon={<Icon iconName={"Pencil"} />}
        />
      </div>
    );
  };

  const handleActionClick = (event, action, name) => {
    event.stopPropagation();
    if (action === "view") {
      alert(`View clicked for ${name}`);
    } else if (action === "remove") {
      alert(`Remove clicked for ${name}`);
    }
  };
  const rows = [
    {
      id: 1,
      name: "John Doe",
      age: 30,
      city: "New York",
      occupation: "Software Engineer",
      actions: renderActionButtons(),
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      city: "London",
      occupation: "Designer",
      actions: renderActionButtons(),
    },
    {
      id: 3,
      name: "Sam Johnson",
      age: 35,
      city: "San Francisco",
      occupation: "Product Manager",
      actions: renderActionButtons(),
    },
  ];

  const handleRowClick = (row) => {
    console.log(row);
    alert(`Row clicked: ${row[0]}`);
  };

  return (
    <div className=" mt-5">
      <span className=" h5 mb-2">All Employee Data</span>
      <CommonTable
        tableHeaders={headers}
        tableRows={rows}
        onRowClick={handleRowClick}
        sort={<PeopleSort />}
        filter={<PeopleFilter />}
      />
    </div>
  );
};

export default UserManagementTable;
