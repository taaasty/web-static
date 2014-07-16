###* @jsx React.DOM ###

window.PopupHeader = PopupHeader = React.createClass

  propTypes:
    title:       React.PropTypes.string.isRequired
    activities:  React.PropTypes.number.isRequired
    handleClose: React.PropTypes.func.isRequired

  render: ->
   `<div className="popup__header">
      <div className="popup__headbox">
        <h3 className="popup__title">{ this.props.title }</h3>
      </div>
      <PopupSpinner activities={ this.props.activities } />
      <div className="popup__close" onClick={ this.props.handleClose }>
        <div className="icon icon--cross"></div>
      </div>
    </div>`

module.exports = PopupHeader