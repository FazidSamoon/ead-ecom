import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Form as BootstrapForm,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const signupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const signupUser = async (data) => {
    const response = await axios.post("https://ecommerceapp2-bold-dew-1540.fly.dev/api/User/register", data); // Replace with your signup API endpoint
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success("Signup successful");
      navigate("/");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Signup failed. Please try again."
      );
    },
  });
  const handleSignup = (values) => {
    const payload = {
      username: values.username,
      email: values.email,
      password: values.password,
      role: 0,
    };
    mutation.mutate(payload);
  };

  return (
    <Container className="mt-5">
      <Row
        className="justify-content-md-center"
        style={{
          marginTop: 100,
        }}
      >
        <Col md={4}>
          <h3 className="mb-4 text-center">Signup</h3>
          <Formik
            initialValues={{
              email: "",
              username: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signupValidationSchema}
            onSubmit={handleSignup}
          >
            {({ values, handleChange, handleBlur, touched, errors }) => (
              <Form>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Email address</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && errors.email}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.email}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Username</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.username && errors.username}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.username}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Password</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && errors.password}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.password}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Confirm Password</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      touched.confirmPassword && errors.confirmPassword
                    }
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Signup
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
