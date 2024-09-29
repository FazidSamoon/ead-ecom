import React, { useRef, useState } from "react";
import PopperComponent from "../../atoms/popper/Popper";
import Chip from "../../atoms/chip/Chip";
import PropTypes from "prop-types";

const CommonFIlter = ({
  filterSection = [
    {
      label: "Section 1",
      key: "section1",
      filters: [
        {
          label: "lable 1",
          value: "label1",
        },
        {
          label: "lable 1",
          value: "label1",
        },
        {
          label: "lable 1",
          value: "label1",
        },
      ],
    },
  ],
}) => {
  const [showPopper, setShowPopper] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const buttonRef = useRef(null);

  const handleSortOptionClick = (option) => {
    setSelectedOption(option);
    setShowPopper(false);
  };

  const setFilter = (filterSection, value) => {};
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
        Filters
      </div>

      {showPopper && (
        <PopperComponent
          referenceElement={buttonRef}
          position="bottom-end"
          popperContent={
            <div className="popover-body" style={{ padding: "10px" }}>
              {filterSection.map((option) => (
                <div key={option.key} className=" d-flex flex-column">
                  <div
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
                  <div className=" d-flex gap-1">
                    {option.filters.map((filter, index) => (
                      <Chip
                        label={filter.label}
                        color={"grey"}
                        key={index}
                        onClick={() => setFilter(option.key, filter.value)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          }
        />
      )}
    </div>
  );
};

CommonFIlter.propTypes = {
  filterSection: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      filters: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          key: PropTypes.string.isRequired,
        })
      ),
    })
  ),
};

export default CommonFIlter;
