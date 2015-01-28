Spinner = require '../../common/spinner/spinner'
{ PropTypes } = React

BUTTON_TEXT = -> t 'email_submit_button'

AuthEmailSubmitButton = React.createClass
  displayName: 'AuthEmailSubmitButton'

  propTypes:
    loading: PropTypes.bool.isRequired

  render: ->
    <button className="outline-auth-button">
      { @renderSpinner() } { BUTTON_TEXT() }
    </button>

  renderSpinner: ->
    if @props.loading
      <Spinner size={ 14 } />

module.exports = AuthEmailSubmitButton