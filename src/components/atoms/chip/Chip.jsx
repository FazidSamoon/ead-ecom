import PropTypes from "prop-types";

const Chip = ({ label, color, onClick }) => {
  return (
    <span
      style={{
        backgroundColor: color,
        color: "white",
        padding: "0.2em 0.5em",
        borderRadius: "12px",
        fontSize: "0.9em",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {label}
    </span>
  );
};

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Chip;
