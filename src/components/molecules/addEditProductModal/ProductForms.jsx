import { useState } from "react";
import Button from "../../atoms/button/Button";
import { Col, ModalFooter, Row } from "react-bootstrap";
import ImageDropzone from "../imageDropzone/ImageDropzone";
import DropdownField from "../../atoms/dropDownField/DropdownField";
import InputField from "../../atoms/inputFIeld/InputField";
import { Formik, Form as FormikForm } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";

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

const ProductForms = ({ resourceData, modalContext, onCancel }) => {
  const [images, setImages] = useState([]);
  const onSubmit = () => {};
  return (
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
                modalContext === "EDIT_PRODUCT" ? "Save Changes" : "Add Product"
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
  );
};

ProductForms.propTypes = {
  resourceData: PropTypes.object,
  modalContext: PropTypes.oneOf([
    "ADD_NEW_PRODUCT",
    "EDIT_PRODUCT",
    "DELETE_RESOURCE",
  ]).isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default ProductForms;
