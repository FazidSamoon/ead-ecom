import { useState } from "react";
import { Dropdown, FormControl, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const SearchableDropdown = ({ options, onChange, setValues }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const filteredOptions = options?.filter(
    (option) =>
      option.key.toLowerCase().includes(searchTerm?.toLowerCase()) &&
      !selectedItems.includes(option)
  );

  const handleSelect = (option) => {
    setSelectedItems((prevItems) => [...prevItems, option]);
    setValues((prevItems) => [...prevItems, {
      ...option,
      productId: option.value,
      isDelivered: false,
      quantity: 0
    }])
    onChange("product", selectedItems.map((item) => item.key));
    setSearchTerm("");
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
                key={option.value}
                onClick={() => handleSelect(option)}
              >
                {option.key}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>No matches found</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
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
