i18n    = require 'i18next'
Spinner = require '../../common/spinner/spinner'
{ PropTypes } = React

BUTTON_TEXT = -> i18n.t 'reset_password_button'

AuthEmailResetButton = React.createClass
  displayName: 'AuthEmailResetButton'

  propTypes:
    loading: PropTypes.bool.isRequired

  render: ->
    <button className="outline-auth-button">
      { @renderSpinner() } { BUTTON_TEXT() }
    </button>

  renderSpinner: ->
    if @props.loading
      <Spinner size={ 14 } />

module.exports = AuthEmailResetButton