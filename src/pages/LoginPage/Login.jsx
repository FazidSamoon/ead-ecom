import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Form as BootstrapForm, Button, Row, Col } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigation = useNavigate();
  const loginUser = async (data) => {
    const response = await axios.post(
      "https://ecommerceapp2-young-silence-7292.fly.dev/api/User/login",
      data
    ); // Replace with your login endpoint
    return response.data;
  };
  const { mutate } = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log("Login successful", data);
      localStorage.setItem("user", data);
      navigation("/");
    },
    onError: (error) => {
      console.error("Login error", error);
    },
  });
  const handleLogin = (values) => {
    mutate(values);
  };
  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Row
        className="justify-content-md-center"
        style={{
          height: "100%",
          marginTop: 200,
        }}
      >
        <Col md={3}>
          <h3 className="mb-4 text-center">Login</h3>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
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
                  <BootstrapForm.Label>Password</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && errors.password}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.password}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
