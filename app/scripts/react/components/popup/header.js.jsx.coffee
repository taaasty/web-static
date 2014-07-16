###* @jsx React.DOM ###

window.PopupHeader = PopupHeader = React.createClass

  propTypes:
    title:     React.PropTypes.string.isRequired
    isLoading: React.PropTypes.number.isRequired

  getDefaultProps: ->
    title: '---'

  render: ->
   `<div className="popup__header">
      <div className="popup__headbox">
        <h3 className="popup__title">{ this.props.title }</h3>
      </div>
      <PopupSpinner activities={this.props.isLoading} />
      <div className="popup__close">
        <div className="icon icon--cross"></div>
      </div>
    </div>`

module.exports = PopupHeader