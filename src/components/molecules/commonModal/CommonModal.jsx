import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const CommonModal = ({
  show,
  onClose,
  header,
  description,
  buttons = [],
  showButtons = true,
  showCloseButton = true,
}) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton={showCloseButton}>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{description}</p>
      </Modal.Body>
      <Modal.Footer>
        {showButtons &&
          buttons.map((btn, index) => (
            <Button key={index} variant={btn.variant} onClick={btn.onClick}>
              {btn.label}
            </Button>
          ))}
        {showCloseButton && (
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

CommonModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      variant: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ),
  showButtons: PropTypes.bool,
  showCloseButton: PropTypes.bool,
};

CommonModal.defaultProps = {
  showButtons: true,
  showCloseButton: true,
};

export default CommonModal;
