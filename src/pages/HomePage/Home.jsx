import { useState } from "react";
import Button from "../../components/atoms/button/Button";
import CommonModal from "../../components/molecules/commonModal/CommonModal";
import CommonTable from "../../components/molecules/commonTable/CommonTable";
import ItemIndividualStatCard from "../../components/molecules/individualStatCard/ItemIndividualStatCard";
import CustomPagination from "../../components/atoms/pagination/Pagination";

const Home = () => {
  const headers = ["Name", "Age", "Location", "Occupation", "Action"];

  const rows = [
    [
      "John Doe",
      30,
      "New York",
      "Software Engineer",
      <div>
        <button
          className="btn btn-primary btn-sm me-2"
          onClick={(e) => handleActionClick(e, "view", "John Doe")}
        >
          View
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={(e) => handleActionClick(e, "remove", "John Doe")}
        >
          Remove
        </button>
      </div>,
    ],
    [
      "Jane Smith",
      28,
      "London",
      "Designer",
      <div>
        <button
          className="btn btn-primary btn-sm me-2"
          onClick={(e) => handleActionClick(e, "view", "Jane Smith")}
        >
          View
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={(e) => handleActionClick(e, "remove", "Jane Smith")}
        >
          Remove
        </button>
      </div>,
    ],
    [
      "Sam Johnson",
      35,
      "San Francisco",
      "Product Manager",
      <div>
        <button
          className="btn btn-primary btn-sm me-2"
          onClick={(e) => handleActionClick(e, "view", "Sam Johnson")}
        >
          View
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={(e) => handleActionClick(e, "remove", "Sam Johnson")}
        >
          Remove
        </button>
      </div>,
    ],
  ];

  const handleRowClick = (row) => {
    alert(`Row clicked: ${row[0]}`);
  };

  const handleActionClick = (event, action, name) => {
    event.stopPropagation(); // Prevent row click from triggering
    if (action === "view") {
      alert(`View clicked for ${name}`);
    } else if (action === "remove") {
      alert(`Remove clicked for ${name}`);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const actionButtons = [
    {
      label: "Confirm",
      variant: "primary",
      onClick: () => {
        alert("Confirmed!");
        handleCloseModal();
      },
    },
    {
      label: "Cancel",
      variant: "danger",
      onClick: () => {
        alert("Canceled!");
        handleCloseModal();
      },
    },
  ];

  const onPageChange = (page) => setCurrentPage(page);
  return (
    <div style={{}}>
      <ItemIndividualStatCard />
      <Button
        buttonType={"primary"}
        title={"button"}
        endIcon={<i className="bi bi-person-raised-hand" />}
        startIcon={<i className="bi bi-person-raised-hand" />}
        buttonStyles={{
          width: "200px",
        }}
      />
      <CommonTable
        tableHeaders={headers}
        tableRows={rows}
        onRowClick={handleRowClick}
      />
      {/* <CommonModal
        show={modalVisible}
        onClose={handleCloseModal}
        header="Modal Header"
        description="This is the modal description."
        buttons={actionButtons}
        showButtons={true}
        showCloseButton={true}
      /> */}
      <CustomPagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Home;
