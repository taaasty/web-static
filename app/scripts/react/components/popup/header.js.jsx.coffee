###* @jsx React.DOM ###

window.PopupHeader = PopupHeader = React.createClass

  propTypes:
    title:        React.PropTypes.string.isRequired
    onClickClose: React.PropTypes.func.isRequired
    activities:   React.PropTypes.number

  getDefaultProps: ->
    activities: 0

  render: ->
   `<div className="popup__header">
      <div className="popup__headbox">
        <h3 className="popup__title">{ this.props.title }</h3>
      </div>
      <PopupSpinner activities={ this.props.activities } />
      <div className="popup__close" onClick={ this.props.onClickClose }>
        <div className="icon icon--cross"></div>
      </div>
    </div>`

module.exports = PopupHeader
