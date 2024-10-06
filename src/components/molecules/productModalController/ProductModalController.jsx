import PropTypes from "prop-types";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { X } from "react-bootstrap-icons";

import Button from "../../atoms/button/Button";
import ProductForms from "../addEditProductModal/ProductForms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import ProductDetails from "../productDetails/ProductDetails";

const ProductModalController = ({
  isOpen,
  modalContext,
  resourceData = {},
  onDelete,
  onCancel,
  setOpenModal,
  setModalContext,
}) => {
  console.log(modalContext)
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

  const queryClient = useQueryClient();

  const deleteProduct = async (productId) => {
    const response = await axios.delete(
      `https://ecommerceapp2-patient-thunder-9872.fly.dev/api/Product/${productId}`
    );
    return response.data;
  };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      toast.success("Product successfully deleted");
      await queryClient.invalidateQueries(["products"]);
      setOpenModal(false);
      setModalContext(null);
    },
    onError: (error) => {
      toast.error(`Failed to delete product: ${error.message}`);
    },
  });

  const handleProductDelete = () => {
    if (resourceData?.productId) {
      deleteMutate(resourceData.productId);
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

      {modalContext === "VIEW_PRODUCT" && (
          <ProductDetails product={resourceData} />
        )}
        {["ADD_NEW_PRODUCT", "EDIT_PRODUCT"].includes(modalContext) && (
          <ProductForms
            modalContext={modalContext}
            onCancel={onCancel}
            resourceData={resourceData}
            setOpenModal={setOpenModal}
            setModalContext={setModalContext}
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
          <Button buttonType="danger" onClick={handleProductDelete} title="Delete" />
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
