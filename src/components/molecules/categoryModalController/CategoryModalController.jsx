import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import Button from "../../atoms/button/Button";
import CategoryForms from "../categoryForms/CategoryForms";
import CategoryDetails from "../categoryDetails/CategoryDetails";

const CategoryModalController = ({
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
      case "ADD_CATEGORIES":
        return "Add New Category";
      case "MANAGE_CATEGORIES":
        return "Edit Category";
      case "DELETE_CATEGORIES":
        return "Are You Sure You Want to Delete Category?";
      case "VIEW_CATEGORY":
        return resourceData?.name ?? "";
      default:
        return "";
    }
  };

  const handleCategoryDelete = () => {};
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
        {modalContext === "VIEW_CATEGORY" && (
          <CategoryDetails category={resourceData} />
        )}
        {["ADD_CATEGORIES", "MANAGE_CATEGORIES"].includes(modalContext) && (
          <CategoryForms
            resourceData={resourceData}
            modalContext={modalContext}
            setModalContext={setModalContext}
            setOpenModal={setOpenModal}
          />
          //   <ProductForms
          //     modalContext={modalContext}
          //     onCancel={onCancel}
          //     resourceData={resourceData}
          //     setOpenModal={setOpenModal}
          //     setModalContext={setModalContext}
          //   />
        )}

        {modalContext === "DELETE_CATEGORIES" && (
          <div className="text-center">
            <span>Are you sure you want to delete this product?</span>
          </div>
        )}
      </ModalBody>

      {modalContext === "DELETE_CATEGORIEST" && (
        <ModalFooter>
          <Button
            buttonType="danger"
            onClick={handleCategoryDelete}
            title="Delete"
          />
          <Button buttonType="secondary" onClick={onCancel} title="Cancel" />
        </ModalFooter>
      )}
    </Modal>
  );
};

export default CategoryModalController;
