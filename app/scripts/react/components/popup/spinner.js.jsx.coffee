###* @jsx React.DOM ###

window.PopupSpinner = React.createClass

  # activities содержит количество итераций, после которых спиннер будет скрыт

  propTypes:
    hasActivities: React.PropTypes.bool.isRequired

  render: ->
    if @props.hasActivities
      `<div className="popup__loader">
        <span className="spinner spinner--8x8"><span className="spinner__icon"></span></span>
        </div>`
    else
      null