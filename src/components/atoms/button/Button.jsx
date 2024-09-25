import PropTypes from "prop-types";
import { Button as BootstrapButton } from "react-bootstrap"; // Import Bootstrap's Button component

const Button = ({
  title,
  endIcon,
  startIcon,
  onClick,
  buttonType = "primary",
  buttonStyles,
}) => {
  return (
    <BootstrapButton
      variant={buttonType}
      onClick={onClick}
      style={{ ...buttonStyles }}
    >
      {startIcon && <span className="me-2">{startIcon}</span>} {title}
      {endIcon && <span className="ms-2">{endIcon}</span>}
    </BootstrapButton>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  endIcon: PropTypes.node,
  startIcon: PropTypes.node,
  onClick: PropTypes.func,
  buttonType: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
    "link",
  ]),
  buttonStyles: PropTypes.object,
};

export default Button;
