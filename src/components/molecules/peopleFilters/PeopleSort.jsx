import { useRef, useState } from "react";
import PopperComponent from "../../atoms/popper/Popper";
import Icon from "../../atoms/icon/Icon";

const PeopleSort = () => {
  const sortOptions = [
    { label: "A-Z", key: "aToZ" },
    { label: "Z-A", key: "zToA" },
    { label: "Ascending by Date", key: "ascendingDate" },
    { label: "Descending by Date", key: "descendingDate" },
  ];

  const [showPopper, setShowPopper] = useState(false);
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);
  const buttonRef = useRef(null);

  const handleSortOptionClick = (option) => {
    setSelectedOption(option);
    setShowPopper(false);
  };

  const renderIcon = (iconName) => <Icon iconName={iconName} />;
  return (
    <div style={{ padding: "20px" }}>
      <div
        ref={buttonRef}
        className="d-flex align-items-center gap-2 cursor-pointer border-0 rounded-4"
        onClick={() => setShowPopper((prev) => !prev)}
        style={{
          border: "1px solid #007bff",
          borderRadius: "5px",
          padding: "8px 12px",
          backgroundColor: "#f8f9fa",
        }}
      >
        {selectedOption.key === "aToZ" && renderIcon("SortAlphaDown")}
        {selectedOption.key === "zToA" && renderIcon("SortAlphaUp")}
        {selectedOption.key === "ascendingDate" && renderIcon("SortNumericUp")}
        {selectedOption.key === "descendingDate" &&
          renderIcon("SortNumericDown")}
        <span>{selectedOption.label}</span>
      </div>
      {showPopper && (
        <PopperComponent
          referenceElement={buttonRef}
          position="bottom-start"
          popperContent={
            <div className="popover-body" style={{ padding: "10px" }}>
              {sortOptions.map((option) => (
                <div
                  key={option.key}
                  onClick={() => handleSortOptionClick(option)}
                  style={{
                    cursor: "pointer",
                    padding: "5px",
                    borderRadius: "4px",
                  }}
                  className="hover:bg-light"
                >
                  {option.label}
                </div>
              ))}
            </div>
          }
        />
      )}
    </div>
  );
};

export default PeopleSort;
