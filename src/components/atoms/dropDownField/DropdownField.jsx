import { Form } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";

const DropdownField = ({ name, label, options }) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Field as="select" name={name} className="form-control">
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option.key} value={option.value}>
          {option.key}
        </option>
      ))}
    </Field>
    <ErrorMessage name={name} component="div" className="text-danger" />
  </Form.Group>
);

DropdownField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DropdownField;
