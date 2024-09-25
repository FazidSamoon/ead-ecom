import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { createPopper } from "@popperjs/core";
import "bootstrap/dist/css/bootstrap.min.css";

const PopperComponent = ({
  position,
  popperContent,
  referenceElement,
  popperStyles,
}) => {
  const popperRef = useRef(null);

  useEffect(() => {
    if (referenceElement.current && popperRef.current) {
      createPopper(referenceElement.current, popperRef.current, {
        placement: position,
      });
    }
  }, [position, referenceElement]);

  return (
    <div
      ref={popperRef}
      className="popover bs-popover-auto show mt-2 shadow border-0"
      style={{
        ...popperStyles,
      }}
      role="tooltip"
    >
      <div className="popover-body">{popperContent}</div>
    </div>
  );
};

PopperComponent.propTypes = {
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]).isRequired,
  children: PropTypes.node.isRequired,
  popperContent: PropTypes.node.isRequired,
  referenceElement: PropTypes.object.isRequired,
  popperStyles: PropTypes.object,
};

export default PopperComponent;
