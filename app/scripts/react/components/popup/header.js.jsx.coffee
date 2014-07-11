###* @jsx React.DOM ###

window.PopupHeader = PopupHeader = React.createClass

  propTypes:
    title: React.PropTypes.string.isRequired

  getDefaultProps: ->
    title: '---'

  render: ->
   `<div className="popup__header">
      <div className="popup__headbox js-popup-headbox">
        <h3 className="popup__title">{ this.props.title }</h3>
      </div>
      <div className="popup__loader state--hidden js-popup-loader">
        <span className="spinner spinner--8x8">
          <span className="spinner__icon"></span>
        </span>
      </div>
      <div className="popup__close">
        <div className="icon icon--cross"></div>
      </div>
    </div>`

module.exports = PopupHeader