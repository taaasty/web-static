Spinner = require '../../common/spinner/spinner'
{ PropTypes } = React

#TODO: i18n
BUTTON_TEXT = 'Сбросить пароль'

AuthEmailResetButton = React.createClass
  displayName: 'AuthEmailResetButton'

  propTypes:
    loading: PropTypes.bool.isRequired

  render: ->
    <button className="outline-auth-button">
      { @renderSpinner() } { BUTTON_TEXT }
    </button>

  renderSpinner: ->
    if @props.loading
      <Spinner size={ 14 } />

module.exports = AuthEmailResetButton