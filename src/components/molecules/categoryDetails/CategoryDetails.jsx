import React from "react";
import { Card, Image } from "react-bootstrap";

const CategoryDetails = ({ category }) => {
  if (!category) return null;

  const { name, isActive, products } = category;

  return (
    <div className="category-details">
      {/* <h2 className="my-4">{name}</h2> */}
      <div className="status mb-3">
        <strong>Status: </strong>
        <span
          style={{
            color: isActive?.props?.color || "gray",
          }}
        >
          {isActive?.props?.label || "INACTIVE"}
        </span>
      </div>

      <h4>Products</h4>
      {products && products.length > 0 ? (
        products.map((product) => (
          <Card key={product.productId} className="my-3">
            <Card.Body className="d-flex">
              <div className="product-info w-75">
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <p>
                  <strong>Price:</strong> ${product.price}
                </p>
                <p>
                  <strong>Stock:</strong> {product.stock}
                </p>
              </div>
              <div className="product-image w-25">
                {product.imageUrls && product.imageUrls.length > 0 ? (
                  <Image
                    src={product.imageUrls[0]} // Display the first image
                    alt={product.name}
                    fluid
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No products available in this category.</p>
      )}
    </div>
  );
};

export default CategoryDetails;
