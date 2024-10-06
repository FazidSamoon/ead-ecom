import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { X } from "react-bootstrap-icons";

import Button from "../../atoms/button/Button";
import VendorForm from "../vendorForms/VendorForm";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const VendorModalController = ({
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
      case "ADD_NEW_VENDOR":
        return "Add New Vendor";
      case "EDIT_VENDOR":
        return "Edit Vendor";
      case "DELETE_VENDOR":
        return "Are You Sure You Want to Delete Vendor?";
      case "VIEW_VENDOR":
        return resourceData?.name ?? "";
      default:
        return "";
    }
  };

  const deleteVendor = async (vendorId) => {
    const response = await axios.post(
      `https://ecommerceapp2-bold-dew-1540.fly.dev/api/User/${vendorId}/deactivate`
    );
    return response.data;
  }

  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteVendor,
    onSuccess: async () => {
      toast.success("Product successfully deleted");
      await queryClient.invalidateQueries(["users"]);
      setOpenModal(false);
      setModalContext(null);
    },
    onError: (error) => {
      toast.error(`Failed to delete product: ${error.message}`);
    },
  });

  const handleVendorDelete = () => {
    if (resourceData?.id) {
      deleteMutate(resourceData?.id);
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
        {["ADD_NEW_VENDOR", "EDIT_VENDOR"].includes(modalContext) && (
          <VendorForm
            modalContext={modalContext}
            onCancel={onCancel}
            setModalContext={setModalContext}
            setOpenModal={setOpenModal}
            resourceData={resourceData}
          />
        )}

        {modalContext === "DELETE_VENDOR" && (
          <div className="text-center">
            <span>Are you sure you want to delete this vendor?</span>
          </div>
        )}
      </ModalBody>

      {modalContext === "DELETE_VENDOR" && (
        <ModalFooter>
          <Button buttonType="danger" onClick={handleVendorDelete} title="Delete" />
          <Button buttonType="secondary" onClick={onCancel} title="Cancel" />
        </ModalFooter>
      )}
    </Modal>
  );
};

VendorModalController.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  modalContext: PropTypes.oneOf([
    "ADD_NEW_VENDOR",
    "EDIT_VENDOR",
    "DELETE_VENDOR",
    "VIEW_VENDOR",
  ]).isRequired,
  resourceData: PropTypes.object,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  setModalContext: PropTypes.func.isRequired,
};
export default VendorModalController;
