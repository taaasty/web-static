PopupHeader = require './popupHeader'
{ PropTypes } = React

Popup = React.createClass

  propTypes:
    children: PropTypes.element.isRequired
    onClose:  PropTypes.func.isRequired

  render: ->
    <div className="popup popup--design-settings">
      <PopupHeader
          title="Управление дизайном"
          onClose={ @props.onClose } />
      <div className="popup__body">
        { @props.children }
      </div>
    </div>

module.exports = Popup