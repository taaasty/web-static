import React, { PropTypes } from 'react';

function FlowFormUpload({ onUpload }) {
  function handleChange(e) {
    onUpload(e.target.files[0]);
  }

  return (
    <span className="form-upload form-upload--icon">
      <input
        accept="image/*"
        className="form-upload__input"
        onChange={handleChange}
        type="file"
      />
      <span className="form-upload__text">
        <i className="icon icon--image-circle" />
      </span>
    </span>
  );
}

FlowFormUpload.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default FlowFormUpload;
