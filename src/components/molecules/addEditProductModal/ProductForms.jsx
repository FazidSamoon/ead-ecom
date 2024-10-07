import { useEffect, useState } from "react";
import Button from "../../atoms/button/Button";
import { Col, ModalFooter, Row } from "react-bootstrap";
import ImageDropzone from "../imageDropzone/ImageDropzone";
import DropdownField from "../../atoms/dropDownField/DropdownField";
import InputField from "../../atoms/inputFIeld/InputField";
import { Formik, Form as FormikForm } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getDownloadURL,
  ref,
  storage,
  uploadBytesResumable,
} from "../../../firebaseconfig";
import { toast } from "react-toastify";

const inStockOptions = [
  { key: "True", value: true },
  { key: "False", value: false },
];

const productStatus = [
  { value: "inStock", key: "In Stock" },
  { value: "outOfStock", key: "Out of Stock" },
  { value: "reStock", key: "Restock" },
];

const productValidationSchema = Yup.object().shape({
  productName: Yup.string().required("Product Name is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  inStock: Yup.boolean().required("Stock status is required"),
  category: Yup.string().required("Category is required"),
  vendor: Yup.string().required("Vendor is required"),
  status: Yup.string().required("Status is required"),
});

const ProductForms = ({
  resourceData,
  modalContext,
  onCancel,
  setModalContext,
  setOpenModal,
}) => {

  const [images, setImages] = useState([]);
  const [isImageUploading, setImageUploading] = useState(false);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [vendorOptions, setVendorOptions] = useState([]);

  const uploadImagesToFirebase = async (images) => {
    setImageUploading(true);
    const uploadPromises = images.map((image) => {
      const storageRef = ref(storage, `products/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    });

    const imageUrls = await Promise.all(uploadPromises);

    setImageUploading(false);
    return imageUrls;
  };

  const createProduct = async (payload) => {
    const response = await axios.post(
      "https://ecommerceapp2-patient-thunder-9872.fly.dev/api/Product",
      payload
    );
    return response.data;
  };

  const editProduct = async (id, payload) => {
    const response = await axios.put(
      `https://ecommerceapp2-patient-thunder-9872.fly.dev/api/Product/${id}`,
      payload
    );
    return response.data;
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (productData) => {
      const { imagess, ...rest } = productData;
      const imageUrls = await uploadImagesToFirebase(images);
      const payload = {
        productId: rest.productId || "",
        name: rest.productName,
        category: rest.category,
        vendorId: rest.vendor,
        isActive: true,
        price: rest.price,
        description: rest.description || "",
        stock: rest.stock,
        imageUrls,
      };

      return createProduct(payload);
    },
    onSuccess: async () => {
      toast.success("Product successfully added");
      await queryClient.invalidateQueries(["products"]);
      setModalContext(null);
      setOpenModal(false);
    },
  });

  const { mutate: editProductMutate } = useMutation({
    mutationFn: async ({ id, productData }) => {
      const { imagess, ...rest } = productData;
      const imageUrls = await uploadImagesToFirebase(images);
      const payload = {
        productId: id,
        name: rest.productName,
        category: rest.category,
        vendorId: rest.vendor,
        isActive: true,
        price: rest.price,
        description: rest.description || "",
        stock: rest.stock,
        imageUrls,
      };

      return editProduct(id, payload);
    },
    onSuccess: async () => {
      toast.success("Product successfully updated");
      await queryClient.invalidateQueries(["products"]);
      setModalContext(null);
      setOpenModal(false);
    },
  });

  const fetchVendors = async () => {
    const { data } = await axios.get(
      "https://ecommerceapp2-still-field-5715.fly.dev/api/User/all"
    );

    console.log(data.filter((vendor) => vendor.role == 1))
    return data.filter((vendor) => vendor.role == 1)?.map((vendor) => ({
      value: vendor.id,
      key: vendor.username,
    }));
  };

  const fetchCategories = async () => {
    const { data } = await axios.get(
      "https://ecommerceapp2-patient-thunder-9872.fly.dev/api/ProductCategory"
    );
    return data.map((category) => ({
      value: category.id,
      key: category.name,
    }));
  };

  const { data: vendorData, isLoading: vendorLoading } = useQuery({
    queryKey: ["vendors"],
    queryFn: fetchVendors,
  });
  const { data: categoryData, isLoading: categoryIsLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (vendorData && !vendorLoading) {
      setVendorOptions(vendorData);
    }
  }, [vendorData, vendorLoading]);

  useEffect(() => {
    if (categoryData && !categoryIsLoading) {
      setCategoryOptions(categoryData);
    }
  }, [categoryData, categoryIsLoading]);

  const onSubmit = (values) => {
    if (modalContext === "EDIT_PRODUCT") {
      editProductMutate({ id: resourceData.productId, productData: values });
    } else {
      mutate(values);
    }
  };
  return (
    <Formik
      initialValues={{
        productName: resourceData?.name || "",
        price: resourceData?.price || "",
        inStock: resourceData?.inStock || 0,
        category: resourceData?.category || "",
        vendor: resourceData?.vendorId || "",
        images: resourceData?.imageUrls || [],
        stock: resourceData?.stock || 0
      }}
      // validationSchema={productValidationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ handleSubmit }) => (
        <FormikForm onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <InputField
                name="productName"
                label="Product Name"
                placeholder="Enter product name"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <InputField
                name="price"
                label="Price"
                type="number"
                placeholder="Enter price"
              />
            </Col>
            <Col md={4}>
            <InputField
                name="stock"
                label="No Of Products"
                type="number"
                placeholder="No Of Products"
              />
            </Col>

            <Col md={4}>
              <DropdownField
                name="status"
                label="Status"
                options={productStatus}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <DropdownField
                name="category"
                label="Category"
                options={categoryOptions}
              />
            </Col>
            <Col md={6}>
              <DropdownField
                name="vendor"
                label="Vendor"
                options={vendorOptions}
              />
            </Col>
          </Row>
          <ImageDropzone
            name="images"
            label="Product Images"
            images={images}
            setImages={setImages}
            defValues={resourceData?.imageUrls}
          />
          <ModalFooter>
            <Button
              type="submit"
              buttonType="primary"
              isLoading={isImageUploading}
              title={
                modalContext === "EDIT_PRODUCT" ? "Save Changes" : "Add Product"
              }
            />
            {modalContext === "EDIT_PRODUCT" && (
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

ProductForms.propTypes = {
  resourceData: PropTypes.object,
  modalContext: PropTypes.oneOf([
    "ADD_NEW_PRODUCT",
    "EDIT_PRODUCT",
    "DELETE_RESOURCE",
  ]).isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default ProductForms;
