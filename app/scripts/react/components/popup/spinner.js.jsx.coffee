###* @jsx React.DOM ###

module.exports = window.PopupSpinner = React.createClass

  # activities содержит количество итераций, после которых спиннер будет скрыт

  propTypes:
    activities: React.PropTypes.number.isRequired

  render: ->
    if @props.activities > 0
      `<div className="popup__loader">
        <span className="spinner spinner--8x8"><span className="spinner__icon"></span></span>
        </div>`
    else
      `<div />`
