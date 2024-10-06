import PropTypes from "prop-types";
import { Card, ListGroup } from "react-bootstrap";

const ProductDetails = ({ product }) => {
  console.log(product);
  return (
    <Card>
      <Card.Header as="h5">{product?.name}</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Category:</strong> {product?.category}
        </Card.Text>
        <Card.Text>
          <strong>Price:</strong> ${product?.price}
        </Card.Text>
        <Card.Text>
          <strong>Description:</strong> {product?.description}
        </Card.Text>
        <Card.Text>
          <strong>Stock Available:</strong> {product?.instock} units
        </Card.Text>

        {product?.imageUrls?.length > 0 ? (
          <div className="d-flex flex-wrap gap-3">
            {product?.imageUrls?.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Product image ${index + 1}`}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted">No images available for this product.</p>
        )}
      </Card.Body>

      <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>Vendor ID:</strong> {product.vendor}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Status:</strong> {product.isActive ? "Active" : "Inactive"}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    vendorId: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProductDetails;
