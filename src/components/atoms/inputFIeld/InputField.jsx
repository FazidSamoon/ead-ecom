import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";

const InputField = ({ name, label, type = "text", placeholder }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Field
        name={name}
        type={type}
        className="form-control"
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component="div" className="text-danger" />
    </Form.Group>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};
export default InputField;
