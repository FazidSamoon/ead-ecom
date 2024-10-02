import { useState } from "react";
import { Dropdown, FormControl, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const SearchableDropdown = ({ options, onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const filteredOptions = options?.filter(
    (option) =>
      option.value.toLowerCase().includes(searchTerm?.toLowerCase()) &&
      !selectedItems.includes(option)
  );

  const handleSelect = (option) => {
    setSelectedItems((prevItems) => [...prevItems, option]);
    onChange("product", selectedItems.map((item) => item.key));
    setSearchTerm("");
  };

  const handleRemoveChip = (option) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.key !== option.key)
    );
  };

  return (
    <div>
      <Dropdown className="mb-3" >
        <Dropdown.Header>Select Products</Dropdown.Header>
        <Dropdown.Toggle as={Button} variant="outline-secondary" style={{ width: "100%" }}>
          Select
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ width: "100%" }}>
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {filteredOptions?.length > 0 ? (
            filteredOptions.map((option) => (
              <Dropdown.Item
                key={option.key}
                onClick={() => handleSelect(option)}
              >
                {option.value}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>No matches found</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

      <div className="d-flex flex-wrap">
        {selectedItems?.map((item) => (
          <div
            key={item.key}
            className="badge bg-primary m-1"
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            {item?.value}
            <button
              type="button"
              className="btn-close ms-2"
              aria-label="Remove"
              onClick={() => handleRemoveChip(item)}
              style={{ fontSize: "0.7rem" }}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
};

SearchableDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SearchableDropdown;
