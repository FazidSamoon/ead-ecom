import PropTypes from "prop-types";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Col,
} from "react-bootstrap";
import InputField from "../../atoms/inputFIeld/InputField";
import Button from "../../atoms/button/Button";

import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import DropdownField from "../../atoms/dropDownField/DropdownField";
import { X } from "react-bootstrap-icons";

const genderOptions = [
  { key: "male", value: "Male" },
  { key: "female", value: "Female" },
  { key: "other", value: "Other" },
];

const roleOptions = [
  { key: "0", value: "Administrator" },
  { key: "1", value: "Vendor" },
  { key: "2", value: "Customer Service Representative" },
];

const resourceValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  address: Yup.string().required("Address is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  role: Yup.string().required("Role is required"),
});

const UserManagementModalController = ({
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
      case "ADD_NEW_RESOURCE":
        return "Add New Resource";
      case "EDIT_RESOURCE":
        return "Edit Resource";
      case "DELETE_RESOURCE":
        return "Are You Sure You Want to Delete Resource?";
      default:
        return "";
    }
  };

  const onSubmit = (values) => {
    alert(values.lastName);
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
        {(modalContext === "ADD_NEW_RESOURCE" ||
          modalContext === "EDIT_RESOURCE") && (
          <Formik
            initialValues={{
              firstName: resourceData?.firstName || "",
              lastName: resourceData?.lastName || "",
              address: resourceData?.address || "",
              phoneNumber: resourceData?.phoneNumber || "",
              gender: resourceData?.gender || "",
              role: resourceData?.role || "",
            }}
            validationSchema={resourceValidationSchema}
            onSubmit={(values) => onSubmit(values)}
            enableReinitialize={true}
            // onChange={() => setFormChanged(true)}
          >
            {({ handleSubmit, dirty }) => (
              <FormikForm onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <InputField
                      name="firstName"
                      label="First Name"
                      placeholder="Enter first name"
                    />
                  </Col>
                  <Col md={6}>
                    <InputField
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter last name"
                    />
                  </Col>
                </Row>
                <InputField
                  name="address"
                  label="Address"
                  placeholder="Enter address"
                />
                <InputField
                  name="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter phone number"
                />
                <Row>
                  <Col md={6}>
                    <DropdownField
                      name="gender"
                      label="Gender"
                      options={genderOptions}
                    />
                  </Col>
                  <Col md={6}>
                    <DropdownField
                      name="role"
                      label="Role"
                      options={roleOptions}
                    />
                  </Col>
                </Row>

                <ModalFooter>
                  <Button
                    type="submit"
                    buttonType="primary"
                    disabled={modalContext === "EDIT_RESOURCE" && !dirty}
                    title={
                      modalContext === "EDIT_RESOURCE"
                        ? "Save Changes"
                        : "Add Employee"
                    }
                  />
                  {modalContext === "EDIT_RESOURCE" && (
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

        {modalContext === "DELETE_RESOURCE" && (
          <div className="text-center">
            <span>Are you sure you want to delete this resource?</span>
          </div>
        )}
      </ModalBody>
      {modalContext === "DELETE_RESOURCE" && (
        <ModalFooter>
          <Button buttonType="danger" onClick={onDelete} title="Delete" />
          <Button buttonType="secondary" onClick={onCancel} title="Cancel" />
        </ModalFooter>
      )}
    </Modal>
  );
};

UserManagementModalController.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  modalContext: PropTypes.oneOf([
    "ADD_NEW_RESOURCE",
    "EDIT_RESOURCE",
    "DELETE_RESOURCE",
  ]).isRequired,
  resourceData: PropTypes.object,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  setModalContext: PropTypes.func.isRequired, 
};
export default UserManagementModalController;
