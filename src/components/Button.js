import PropTypes from "prop-types";
import React from "react";

export default function Button({ label, onClick }) {
  return (
    <button 
      type="button" 
      onClick={() => onClick(label)}
      className="my-button"
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
