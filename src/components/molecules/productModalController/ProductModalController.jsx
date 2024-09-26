import PropTypes from "prop-types";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import * as Yup from "yup";
import { Formik, Form as FormikForm } from "formik";
import InputField from "../../atoms/inputFIeld/InputField";
import DropdownField from "../../atoms/dropDownField/DropdownField";
import ImageDropzone from "../imageDropzone/ImageDropzone";
import Button from "../../atoms/button/Button";
import { useState } from "react";

const inStockOptions = [
  { key: true, value: "True" },
  { key: false, value: "False" },
];

const categoryOptions = [
  { key: "electronics", value: "Electronics" },
  { key: "furniture", value: "Furniture" },
];

const vendorOptions = [
  { key: "vendor1", value: "Vendor 1" },
  { key: "vendor2", value: "Vendor 2" },
];

const productStatus = [
  { key: "inStock", value: "In Stock" },
  { key: "outOfStock", value: "Out of Stock" },
  { key: "reStock", value: "Restock" },
];

const productValidationSchema = Yup.object().shape({
  productName: Yup.string().required("Product Name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  inStock: Yup.boolean().required("Stock status is required"),
  category: Yup.string().required("Category is required"),
  vendor: Yup.string().required("Vendor is required"),
  status: Yup.string().required("Status is required"),
});

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
        return "Add New PRODUCT";
      case "EDIT_PRODUCT":
        return "Edit PRODUCT";
      case "DELETE_PRODUCT":
        return "Are You Sure You Want to Delete Resource?";
      default:
        return "";
    }
  };

  const [images, setImages] = useState([]);
  const onSubmit = () => {};

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
          <Formik
            initialValues={{
              productName: resourceData?.productName || "",
              price: resourceData?.price || "",
              inStock: resourceData?.inStock || true,
              category: resourceData?.category || "",
              vendor: resourceData?.vendor || "",
              images: resourceData?.images || [],
            }}
            validationSchema={productValidationSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {({ handleSubmit }) => (
              <FormikForm onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <InputField
                      name="productName"
                      label="Product Name"
                      placeholder="Enter product name"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <InputField
                      name="price"
                      label="Price"
                      type="number"
                      placeholder="Enter price"
                    />
                  </Col>
                  <Col md={4}>
                    <DropdownField
                      name="inStock"
                      label="In Stock"
                      options={inStockOptions}
                    />
                  </Col>

                  <Col md={4}>
                    <DropdownField
                      name="status"
                      label="Status"
                      options={productStatus}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <DropdownField
                      name="category"
                      label="Category"
                      options={categoryOptions}
                    />
                  </Col>
                  <Col md={6}>
                    <DropdownField
                      name="vendor"
                      label="Vendor"
                      options={vendorOptions}
                    />
                  </Col>
                </Row>
                <ImageDropzone
                  name="images"
                  label="Product Images"
                  images={images}
                  setImages={setImages}
                />
                <ModalFooter>
                  <Button
                    type="submit"
                    buttonType="primary"
                    title={
                      modalContext === "EDIT_PRODUCT"
                        ? "Save Changes"
                        : "Add Product"
                    }
                  />
                  {modalContext === "EDIT_PRODUCT" && (
                    <Button
                      buttonType="secondary"
                      onClick={onCancel}
                      title="Cancel"
                    />
                  )}
                </ModalFooter>
              </FormikForm>
            )}
          </Formik>
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
  ]).isRequired,
  resourceData: PropTypes.object,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  setModalContext: PropTypes.func.isRequired,
};
export default ProductModalController;
