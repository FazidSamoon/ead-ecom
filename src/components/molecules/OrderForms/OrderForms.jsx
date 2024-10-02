import { Formik, Form as FormikForm } from "formik";
import PropTypes from "prop-types";
import { Col, ModalFooter, Row } from "react-bootstrap";
import * as Yup from "yup";
import InputField from "../../atoms/inputFIeld/InputField";
import DropdownField from "../../atoms/dropDownField/DropdownField";
import Button from "../../atoms/button/Button";
import SearchableDropdown from "../../atoms/searchableDropdown/SearchableDropdown";

const orderStatus = [
  { key: "PENDING", value: "Pending" },
  { key: "REJECTED", value: "Rejected" },
  { key: "DELIVERED", value: "Delivered" },
];

const productValidationSchema = Yup.object().shape({
  customerName: Yup.string().required("Customer Name is required"),
  quantity: Yup.number()
    .required("Quantity is required")
    .positive("Quantity must be positive"),
  category: Yup.string().required("Category is required"),
  vendor: Yup.string().required("Vendor is required"),
  status: Yup.string().required("Status is required"),
  remark: Yup.string(),
});

const options = [
  { key: 1, value: "Option 1" },
  { key: 2, value: "Option 2" },
  { key: 3, value: "Option 3" },
  // Add more options here
];

const OrderForms = ({ resourceData, modalContext, onCancel }) => {
  const onSubmit = (values) => {
    console.log("hey")
    console.log(values)
  };
  return (
    <Formik
      initialValues={{
        customerName: resourceData?.customerName || "",
        quantity: resourceData?.quantity || "",
        customerPhone: resourceData?.customerPhone || "",
        status: resourceData?.status || "",
        vendor: resourceData?.vendor || "",
        images: resourceData?.images || [],
        remark: resourceData?.remark || "",
        product: resourceData?.product || [],
      }}
    //   validationSchema={productValidationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ handleSubmit, values, setFieldValue }) => (
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
            <Col md={12}>
              <SearchableDropdown
                options={options}
                onChange={setFieldValue}
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
          {values.status === "Rejected" && modalContext === "EDIT_ORDER" && (
            <Row>
              <Col md={12}>
                <InputField
                  name="remark"
                  label="Remark"
                  placeholder="Enter Remark"
                />
              </Col>
            </Row>
          )}

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
