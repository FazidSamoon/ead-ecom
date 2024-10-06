import Button from "../../atoms/button/Button";
import { Col, ModalFooter, Row } from "react-bootstrap";

import DropdownField from "../../atoms/dropDownField/DropdownField";
import { Formik, Form as FormikForm } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import InputField from "../../atoms/inputFIeld/InputField";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { generateRandomPassword } from "../../../utils/Common";

const statusOptions = [
  { key: "ACTIVE", value: "Active" },
  { key: "DEACTIVATED", value: "Deactivated" },
];

// Validation schema using Yup
const vendorValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("Vendor first name is required"),
  lastName: Yup.string().required("Vendor last name is required"),
  address: Yup.string().required("Address is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  status: Yup.string().required("Status is required"),
});

const VendorForm = ({
  resourceData,
  modalContext,
  onCancel,
  setModalContext,
  setOpenModal,
}) => {
  const createVendor = async (payload) => {
    const response = await axios.post(
      "https://ecommerceapp2-patient-thunder-9872.fly.dev/api/User/register",
      payload
    );
    return response.data;
  };

  const editVendor = async (payload) => {
    const response = await axios.post(
      "https://ecommerceapp2-still-field-5715.fly.dev/api/Vendor/" +
        resourceData.id,
      payload
    );
    return response.data;
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (vendorData) => {
      return createVendor({
        ...vendorData,
        role: 2,
      });
    },
    onSuccess: async () => {
      toast.success("Vendor successfully added");
      await queryClient.invalidateQueries(["vendors"]);
      setModalContext(null);
      setOpenModal(false);
    },
  });

  const { mutate: editVendorMutate } = useMutation({
    mutationFn: async (vendorData) => {
      return editVendor({
        ...vendorData,
        role: 2,
      });
    },
    onSuccess: async () => {
      toast.success("Vendor successfully edited");
      await queryClient.invalidateQueries(["vendors"]);
      setModalContext(null);
      setOpenModal(false);
    },
  });
  const onSubmit = (payload) => {
    if (modalContext === "ADD_NEW_VENDOR") {
      console.log("payload ", payload);
      mutate({
        ...payload,
        username: payload.firstName + " " + payload.lastName,
        password: generateRandomPassword(6),
      });
    } else {
      console.log("payload ", {
        ...payload,
        username: payload.firstName + " " + payload.lastName,
        password: generateRandomPassword(6),
      });
      editVendorMutate({
        ...payload,
        username: payload.firstName + " " + payload.lastName,
        password: generateRandomPassword(6),
      });
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: resourceData?.lastName || "",
        lastName: resourceData?.firstName || "",
        address: resourceData?.address || "",
        email: resourceData?.email || "",
        phoneNumber: resourceData?.phone || "",
        status: resourceData?.status || "ACTIVE",
      }}
      validationSchema={vendorValidationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ handleSubmit }) => (
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
              <InputField
                name="phoneNumber"
                label="Phone number"
                placeholder="Enter phone number"
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
