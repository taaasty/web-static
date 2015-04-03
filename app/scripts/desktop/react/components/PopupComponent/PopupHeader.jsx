import PopupSpinner from './PopupSpinner';

let PopupHeader = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    hasActivities: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="popup__header">
        <div className="popup__headbox">
          <h3 className="popup__title">
            {this.props.title}
          </h3>
        </div>
        {this.renderSpinner()}
        <div className="popup__close" onClick={this.handleClick}>
          <i className="icon icon--cross" />
        </div>
      </div>
    );
  },

  renderSpinner() {
    if (this.props.hasActivities) {
      return <PopupSpinner />;
    }
  },

  handleClick() {
    this.props.onClose()
  }
});

module.exports = PopupHeader