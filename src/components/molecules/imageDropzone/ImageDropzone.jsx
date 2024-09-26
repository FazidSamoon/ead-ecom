import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

const ImageDropzone = ({ images, setImages }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
    },
    [setImages]
  );

  const removeImage = (image) => {
    setImages((prevImages) =>
      prevImages.filter((img) => img.name !== image.name)
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  return (
    <div>
      <div
        {...getRootProps({
          className: "dropzone",
          style: {
            border: "2px dashed #cccccc",
            borderRadius: "4px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
          },
        })}
      >
        <input {...getInputProps()} />
        <p>Drag and drop some images here, or click to select images</p>
      </div>
      <div
        className="image-preview-grid"
        style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
      >
        {images.map((image) => (
          <div key={image.name} style={{ position: "relative", margin: "5px" }}>
            <img
              src={image.preview}
              alt={image.name}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <button
              onClick={() => removeImage(image)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

ImageDropzone.propTypes = {
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired,
};

export default ImageDropzone;
