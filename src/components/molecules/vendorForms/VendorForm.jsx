import Button from "../../atoms/button/Button";
import { Col, ModalFooter, Row } from "react-bootstrap";

import DropdownField from "../../atoms/dropDownField/DropdownField";
import { Formik, Form as FormikForm } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import InputField from "../../atoms/inputFIeld/InputField";

// Options for the status dropdown
const statusOptions = [
  { key: "ACTIVE", value: "Active" },
  { key: "DEACTIVATED", value: "Deactivated" },
];

// Validation schema using Yup
const vendorValidationSchema = Yup.object().shape({
  vendorName: Yup.string().required("Vendor Name is required"),
  address: Yup.string().required("Address is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  status: Yup.string().required("Status is required"),
});

const VendorForm = ({ resourceData, modalContext, onCancel }) => {
  const onSubmit = () => {};

  return (
    <Formik
      initialValues={{
        vendorName: resourceData?.vendorName || "",
        address: resourceData?.address || "",
        email: resourceData?.email || "",
        status: resourceData?.status || "ACTIVE",
      }}
      validationSchema={vendorValidationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ handleSubmit }) => (
        <FormikForm onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <InputField
                name="vendorName"
                label="Vendor Name"
                placeholder="Enter vendor name"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <InputField
                name="address"
                label="Address"
                placeholder="Enter address"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <InputField
                name="email"
                label="Email"
                type="email"
                placeholder="Enter email address"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <DropdownField
                name="status"
                label="Status"
                options={statusOptions}
              />
            </Col>
          </Row>
          <ModalFooter>
            <Button
              type="submit"
              buttonType="primary"
              title={
                modalContext === "EDIT_VENDOR" ? "Save Changes" : "Add Vendor"
              }
            />
            {modalContext === "EDIT_VENDOR" && (
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

VendorForm.propTypes = {
  resourceData: PropTypes.object,
  modalContext: PropTypes.oneOf([
    "ADD_NEW_VENDOR",
    "EDIT_VENDOR",
    "DELETE_VENDOR",
  ]).isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default VendorForm;
