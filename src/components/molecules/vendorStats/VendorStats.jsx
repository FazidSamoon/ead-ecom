import Icon from "../../atoms/icon/Icon";

const VendorStats = () => {
  return (
    <div className="d-flex flex-wrap gap-3">
      <div
        className="shadow rounded-2 p-3 d-flex align-items-center justify-content-center"
        style={{ width: "250px" }}
      >
        <Icon iconName="Basket" color="tomato" size={70} className="me-2" />
        <div className="d-flex flex-column align-items-center">
          <span className="h5 fw-normal">Total Vendors</span>
          <span className="h2 fw-bold">90</span>
        </div>
      </div>

      <div
        className="shadow rounded-2 p-3 d-flex align-items-center justify-content-center"
        style={{ width: "300px" }}
      >
        <Icon iconName="PersonPlusFill" color="tomato" size={70} className="me-2" />
        <div className="d-flex flex-column align-items-center">
          <span className="h5 fw-normal">New Incomings This Week</span>
          <span className="h2 fw-bold">90</span>
        </div>
      </div>
    </div>
  );
};

export default VendorStats;
