import { Formik, Form as FormikForm } from "formik";

import Button from "../../atoms/button/Button";
import { Col, ModalFooter, Row } from "react-bootstrap";
import InputField from "../../atoms/inputFIeld/InputField";
import DropdownField from "../../atoms/dropDownField/DropdownField";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const inStockOptions = [
  { key: "True", value: true },
  { key: "False", value: false },
];

const CategoryForms = ({
  resourceData,
  modalContext,
  onCancel,
  setModalContext,
  setOpenModal,
}) => {
  console.log(resourceData);
  const addCategory = async (payload) => {
    const response = await axios.post(
      "https://ecommerceapp2-bold-dew-1540.fly.dev/api/ProductCategory",
      payload
    );
    return response.data;
  };

  const editCategory = async (payload) => {
    const response = await axios.put(
      "https://ecommerceapp2-bold-dew-1540.fly.dev/api/ProductCategory/" +
        resourceData.id,
      payload
    );
    return response.data;
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addCategory,
    onSuccess: async () => {
      toast.success("Category successfully added");
      await queryClient.invalidateQueries(["allCategories"]);
      await queryClient.invalidateQueries(["activeProductsByCategories"]);
      setModalContext(null);
      setOpenModal(false);
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: editCategory,
    onSuccess: async () => {
      toast.success("Category successfully edited");
      await queryClient.invalidateQueries(["allCategories"]);
      await queryClient.invalidateQueries(["activeProductsByCategories"]);
      setModalContext(null);
      setOpenModal(false);
    },
  });

  const onSubmit = (values) => {
    if (modalContext === "ADD_CATEGORIES") {
      mutate({
        ...values,
        products: [],
      });
    } else {
      editMutate({
        ...values,
        id: resourceData.id,
        products: resourceData?.products,
        isActive: values.isActive === "true" ? true : false,
      });
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          name: resourceData?.name ?? "",
          isActive: resourceData?.isActive ?? "",
        }}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ handleSubmit }) => (
          <FormikForm onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
                <InputField
                  name="name"
                  label="Category Name"
                  placeholder="Enter category name"
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <DropdownField
                  name="isActive"
                  label="Category Activity"
                  options={inStockOptions}
                />
              </Col>
            </Row>

            {modalContext === "MANAGE_CATEGORIES" && (
              <Row>
                <span>Availble Products</span>
                {resourceData?.products?.map((product, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: 20,
                    }}
                  >
                    <span>
                      <span
                        style={{
                          fontWeight: "600",
                        }}
                      >
                        Product name
                      </span>
                      : {product.name}
                    </span>

                    <span>
                      <span
                        style={{
                          fontWeight: "600",
                        }}
                      >
                        Available quntity
                      </span>
                      : {product.stock}
                    </span>
                  </div>
                ))}
              </Row>
            )}

            <ModalFooter>
              <Button
                type="submit"
                buttonType="primary"
                title={
                  modalContext === "MANAGE_CATEGORIES"
                    ? "Save Changes"
                    : "Add Category"
                }
              />
              {modalContext === "MANAGE_CATEGORIES" && (
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
    </>
  );
};

export default CategoryForms;
