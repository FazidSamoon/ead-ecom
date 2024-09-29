import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { X } from "react-bootstrap-icons";

import Button from "../../atoms/button/Button";
import OrderForms from "../OrderForms/OrderForms";
const OrderModalController = ({
  isOpen,
  modalContext,
  resourceData = {},
  onDelete,
  onCancel,
  setOpenModal,
  setModalContext,
}) => {
  const getTitle = () => {
    switch (modalContext) {
      case "ADD_NEW_ORDER":
        return "Add New Order";
      case "EDIT_ORDER":
        return "Edit Order";
      case "DELETE_ORDER":
        return "Are You Sure You Want to Delete Order?";
      case "VIEW_ORDER":
        return resourceData?.orderId ?? "";
      default:
        return "";
    }
  };
  return (
    <Modal
      show={isOpen}
      centered
      className=" p-3 border-0"
      style={{
        padding: 4,
      }}
    >
      <div className=" p-3">
        <ModalHeader>
          <div className=" d-flex justify-content-between align-content-center w-100">
            <span className=" h4">{getTitle()}</span>
            <div
              className="bg-secondary rounded-5"
              style={{
                height: 40,
                width: 40,
              }}
              onClick={() => {
                setOpenModal(false);
                setModalContext(null);
              }}
            >
              <X size={40} />
            </div>
          </div>
        </ModalHeader>
      </div>
      <ModalBody>
        {["ADD_NEW_ORDER", "EDIT_ORDER"].includes(modalContext) && (
          <OrderForms
            modalContext={modalContext}
            onCancel={onCancel}
            resourceData={resourceData}
          />
        )}

        {modalContext === "DELETE_ORDER" && (
          <div className="text-center">
            <span>Are you sure you want to delete this order?</span>
          </div>
        )}
      </ModalBody>

      {modalContext === "DELETE_ORDER" && (
        <ModalFooter>
          <Button buttonType="danger" onClick={onDelete} title="Delete" />
          <Button buttonType="secondary" onClick={onCancel} title="Cancel" />
        </ModalFooter>
      )}
    </Modal>
  );
};

OrderModalController.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  modalContext: PropTypes.oneOf([
    "ADD_NEW_PRODUCT",
    "EDIT_PRODUCT",
    "DELETE_RESOURCE",
    "VIEW_PRODUCT",
  ]).isRequired,
  resourceData: PropTypes.object,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  setModalContext: PropTypes.func.isRequired,
};
export default OrderModalController;
