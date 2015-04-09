import classSet from 'react/lib/cx'

let PopupHeader = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    draggable: React.PropTypes.bool,
    onClose: React.PropTypes.func.isRequired
  },

  render() {
    let headerClasses = classSet({
      'popup__header': true,
      'cursor--move': this.props.draggable
    });

    return (
      <div className={headerClasses}>
        <div className="popup__headbox">
          <h3 className="popup__title">
            {this.props.title}
          </h3>
        </div>
        <div className="popup__close" onClick={this.handleClick}>
          <i className="icon icon--cross" />
        </div>
      </div>
    );
  },

  handleClick() {
    this.props.onClose();
  }
});

export default PopupHeader;