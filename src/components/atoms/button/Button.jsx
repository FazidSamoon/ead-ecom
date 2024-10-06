import PropTypes from "prop-types";
import { Button as BootstrapButton, Spinner } from "react-bootstrap"; // Import Bootstrap's Button component

const Button = ({
  title,
  endIcon,
  startIcon,
  onClick,
  buttonType = "primary",
  buttonStyles,
  type,
  isLoading
}) => {
  return (
    <BootstrapButton
      variant={buttonType}
      onClick={onClick}
      style={{ ...buttonStyles }}
      type={type}
      disabled={isLoading}
    >
      {startIcon && <span className="me-2">{startIcon}</span>} {title}
      {endIcon && <span className="ms-2">{endIcon}</span>}
      {isLoading && <Spinner animation="border" variant="primary" />}
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
  type: PropTypes.string,
};

export default Button;
