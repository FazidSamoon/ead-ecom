import PropTypes from "prop-types";
import * as icons from "react-bootstrap-icons";

const Icon = ({ iconName, ...props }) => {
  const BootstrapIcon = icons[iconName];
  return <BootstrapIcon {...props} />;
};

Icon.propTypes = {
  iconName: PropTypes.oneOf(Object.keys(icons)).isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default Icon;
