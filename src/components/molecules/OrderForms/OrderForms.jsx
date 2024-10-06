import { Formik, Form as FormikForm } from "formik";
import PropTypes from "prop-types";
import { Col, ModalFooter, Row } from "react-bootstrap";
import * as Yup from "yup";
import InputField from "../../atoms/inputFIeld/InputField";
import DropdownField from "../../atoms/dropDownField/DropdownField";
import Button from "../../atoms/button/Button";
import SearchableDropdown from "../../atoms/searchableDropdown/SearchableDropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const orderStatus = [
  { key: "PENDING", value: 0 },
  { key: "READY FOR DELIVERY", value: 1 },
  { key: "PARTIALLY DELIVERED", value: 2 },
  { key: "DELIVERED", value: 3 },
  { key: "CANCELLED", value: 4 },
];

const productValidationSchema = Yup.object().shape({
  customerName: Yup.string().required("Customer Name is required"),
  note: Yup.string().required("Quantity is required"),
  category: Yup.string().required("Category is required"),
  vendor: Yup.string().required("Vendor is required"),
  status: Yup.string().required("Status is required"),
  remark: Yup.string(),
});

const OrderForms = ({
  resourceData,
  modalContext,
  onCancel,
  setModalContext,
  setOpenModal,
}) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://ecommerceapp2-patient-thunder-9872.fly.dev/api/Product/all"
        );
        const data = await response.json();

        console.log("data ", data)
        const transformedProducts = data.map((product) => ({
          key: product.name,
          value: product.productId,
          vendorId: product.vendorId,
          unitPrice: product.price
        }));
        setOptions(transformedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const [products, setProducts] = useState([]);

  const createOrder = async (payload) => {
    const response = await axios.post(
      "https://ecommerceapp2-still-field-5715.fly.dev/api/Order/create-with-email",
      payload
    );
    return response.data;
  };

  const editOrder = async (payload) => {
    const response = await axios.put(
      "https://ecommerceapp2-still-field-5715.fly.dev/api/Order/" +
        resourceData.id,
      payload
    );
    return response.data;
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (orderData) => {
      return createOrder(orderData);
    },
    onSuccess: async () => {
      toast.success("Order successfully added");
      await queryClient.invalidateQueries(["orders"]);
      setModalContext(null);
      setOpenModal(false);
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: async (orderData) => {
      return editOrder(orderData);
    },
    onSuccess: async () => {
      toast.success("Order successfully edited");
      await queryClient.invalidateQueries(["orders"]);
      setModalContext(null);
      setOpenModal(false);
    },
  });

  const onSubmit = (values) => {
    if (modalContext === "ADD_NEW_ORDER") {
      mutate({
        ...values,
        items: products,
      });
    } else {
      const status =
        products.filter((product) => product.isDelivered).length === 0
          ? 0
          : products.filter((product) => product.isDelivered).length <
            products.length
          ? 2
          : 3;
      editMutate({
        ...values,
        status: values.status === 0 ? Number(status) : Number(values.status),
        items: products,
        customerId: values.customerEmail,
        id: resourceData.id,
        cancellationReason: values?.remark
      });
    }
  };

  const handleProductDeliveryChange = (index, isChecked) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, isDelivered: isChecked } : product
    );
    setProducts(updatedProducts);
  };

  const handleQuantityChange = (index, value) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, quantity: value } : product
    );
    setProducts(updatedProducts);
  };

  useEffect(() => {
    if (
      modalContext === "EDIT_ORDER" &&
      resourceData?.items &&
      resourceData?.items?.length > 0
    ) {
      setProducts(
        resourceData?.items.map((item) => ({
          key: item?.product?.name,
          value: item?.product?.productId,
          vendorId: item?.vendor?.vendorId,
          productId: item?.product?.productId,
          unitPrice: item?.product?.price,
          isDelivered: item?.isDelivered,
          quantity: item?.quantity,
        }))
      );
    }
  }, [resourceData?.items, modalContext]);

  return (
    <Formik
      initialValues={{
        customerEmail: resourceData?.customerEmail
          ? resourceData?.customerEmail
          : resourceData?.id,
        note: resourceData?.note || "",
        customerPhone: resourceData?.customerPhone || "",
        status: resourceData?.status || "",
        vendor: resourceData?.vendor || "",
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
                name="customerEmail"
                label="Customer Email"
                placeholder="Enter Customer email"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <SearchableDropdown
                options={options}
                onChange={setFieldValue}
                setValues={setProducts}
              />

              <div
                className="d-flex flex-wrap"
                style={{
                  justifyContent: "space-between",
                }}
              >
                {products?.map((item, index) => (
                  <div
                    key={item.key}
                    className=" m-1"
                    style={{ display: "flex", flexDirection: "row", gap: 2 }}
                  >
                    {item.key}

                    <div
                      className=""
                      style={{
                        marginLeft: 20,
                      }}
                    >
                      <span>Delivered: </span>
                      <input
                        type="checkbox"
                        checked={item.isDelivered}
                        onChange={(e) =>
                          handleProductDeliveryChange(index, e.target.checked)
                        }
                      />
                      <input
                        type="number"
                        placeholder="Enter Quntity"
                        onChange={(e) => {
                          handleQuantityChange(index, e.target.value);
                        }}
                        style={{
                          marginLeft: 40,
                          borderColor: "#dee2e6",
                          outline: "none",
                          borderWidth: 1,
                          borderRadius: 5,
                        }}
                        value={item?.quantity}
                      />
                    </div>
                  </div>
                ))}
              </div>
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
            <Col md={12}>
              <InputField name="note" label="Note" placeholder="Enter Note" />
            </Col>
            <Col md={6}>
              <DropdownField
                name="status"
                label="Order Status"
                options={orderStatus}
              />
            </Col>
          </Row>
          {values.status === "4" && modalContext === "EDIT_ORDER" && (
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
