import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { X } from "react-bootstrap-icons";

import Button from "../../atoms/button/Button";
import ProductForms from "../addEditProductModal/ProductForms";

const ProductModalController = ({
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
      case "ADD_NEW_PRODUCT":
        return "Add New Product";
      case "EDIT_PRODUCT":
        return "Edit Product";
      case "DELETE_PRODUCT":
        return "Are You Sure You Want to Delete Product?";
      case "VIEW_PRODUCT":
        return resourceData?.productName ?? "";
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
        {["ADD_NEW_PRODUCT", "EDIT_PRODUCT"].includes(modalContext) && (
          <ProductForms
            modalContext={modalContext}
            onCancel={onCancel}
            resourceData={resourceData}
          />
        )}

        {modalContext === "DELETE_PRODUCT" && (
          <div className="text-center">
            <span>Are you sure you want to delete this product?</span>
          </div>
        )}
      </ModalBody>

      {modalContext === "DELETE_PRODUCT" && (
        <ModalFooter>
          <Button buttonType="danger" onClick={onDelete} title="Delete" />
          <Button buttonType="secondary" onClick={onCancel} title="Cancel" />
        </ModalFooter>
      )}
    </Modal>
  );
};

ProductModalController.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  modalContext: PropTypes.oneOf([
    "ADD_NEW_PRODUCT",
    "EDIT_PRODUCT",
    "DELETE_RESOURCE",
    "VIEW_PRODUCT"
  ]).isRequired,
  resourceData: PropTypes.object,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  setModalContext: PropTypes.func.isRequired,
};
export default ProductModalController;
