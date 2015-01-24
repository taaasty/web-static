Spinner = require '../../common/spinner/spinner'
{ PropTypes } = React

#TODO: i18n
BUTTON_TEXT = 'Войти'

AuthEmailSubmitButton = React.createClass
  displayName: 'AuthEmailSubmitButton'

  propTypes:
    loading: PropTypes.bool.isRequired

  render: ->
    <button className="outline-auth-button">
      { @renderSpinner() } { BUTTON_TEXT }
    </button>

  renderSpinner: ->
    if @props.loading
      <Spinner size={ 14 } />

module.exports = AuthEmailSubmitButton