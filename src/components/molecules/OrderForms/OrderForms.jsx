import { Formik, Form as FormikForm } from "formik";
import PropTypes from "prop-types";
import { Col, ModalFooter, Row } from "react-bootstrap";
import * as Yup from "yup";
import InputField from "../../atoms/inputFIeld/InputField";
import DropdownField from "../../atoms/dropDownField/DropdownField";
import Button from "../../atoms/button/Button";

const orderStatus = [
  { key: "PENDING", value: "Pending" },
  { key: "REJECTED", value: "Rejected" },
  { key: "DELIVERED", value: "Delivered" },
];

const productValidationSchema = Yup.object().shape({
  customerName: Yup.string().required("Customer Name is required"),
  quantity: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  customerPhone: Yup.boolean().required("Stock status is required"),
  category: Yup.string().required("Category is required"),
  vendor: Yup.string().required("Vendor is required"),
  status: Yup.string().required("Status is required"),
});

const OrderForms = ({ resourceData, modalContext, onCancel }) => {
  const onSubmit = () => {};
  return (
    <Formik
      initialValues={{
        customerName: resourceData?.customerName || "",
        quantity: resourceData?.quantity || "",
        customerPhone: resourceData?.customerPhone || "",
        status: resourceData?.status || "",
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
                name="customerName"
                label="Customer Name"
                placeholder="Enter Customer name"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <InputField
                name="customerPhone"
                label="Phone Number"
                type="tel"
                placeholder="Enter phone number"
              />
            </Col>
            <Col md={6}>
              <InputField
                name="address"
                label="Address"
                placeholder="Enter Address"
              />
            </Col>

            {/* <Col md={4}>
              <DropdownField
                name="status"
                label="Status"
                options={productStatus}
              />
            </Col> */}
          </Row>
          <Row>
            <Col md={6}>
              <InputField
                name="quantity"
                label="Quantity"
                placeholder="Enter Quantity"
              />
            </Col>
            <Col md={6}>
              <DropdownField
                name="status"
                label="Order Status"
                options={orderStatus}
              />
            </Col>
          </Row>
          {/* <ImageDropzone
            name="images"
            label="Product Images"
            images={images}
            setImages={setImages}
          /> */}
          <ModalFooter>
            <Button
              type="submit"
              buttonType="primary"
              title={
                modalContext === "EDIT_ORDER" ? "Save Changes" : "Add Order"
              }
            />
            {modalContext === "EDIT_Order" && (
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

OrderForms.propTypes = {
  resourceData: PropTypes.object,
  modalContext: PropTypes.oneOf([
    "ADD_NEW_ORDER",
    "EDIT_ORDER",
    "DELETE_RESOURCE",
  ]).isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default OrderForms;
