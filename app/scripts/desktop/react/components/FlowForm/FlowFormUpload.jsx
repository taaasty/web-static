let FlowFormUpload = React.createClass({
  propTypes: {
    onUpload: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <span className="form-upload form-upload--icon">
        <input type="file"
               accept="image/*"
               className="form-upload__input"
               onChange={this.handleChange} />
        <span className="form-upload__text">
          <i className="icon icon--image-circle" />
        </span>
      </span>
    );
  },

  handleChange(e) {
    this.props.onUpload(e.target.files[0]);
  }
});

export default FlowFormUpload;