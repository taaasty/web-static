let PopupArea = React.createClass({
  propTypes: {
    onClose: React.PropTypes.func,
    children: React.PropTypes.element.isRequired
  },

  render() {
    return (
      <div className="popup-container">
        <div className="popup-container__main">
          <div className="popup-container__cell" onClick={this.handleClick}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  },

  handleClick(e) {
    if ($(e.target).hasClass('popup-container__cell')) {
      e.preventDefault()
      if (typeof this.props.onClose === 'function') {
        this.props.onClose();
      }
    }
  }
});

export default PopupArea;