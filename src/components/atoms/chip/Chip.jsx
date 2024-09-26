const Chip = ({ label, color }) => {
  return (
    <span
      style={{
        backgroundColor: color,
        color: "white",
        padding: "0.2em 0.5em",
        borderRadius: "12px",
        fontSize: "0.9em",
      }}
    >
      {label}
    </span>
  );
};

export default Chip;
