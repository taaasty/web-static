Spinner = require '../../common/spinner/spinner'
{ PropTypes } = React

AuthEmailResetButton = React.createClass
  displayName: 'AuthEmailResetButton'

  propTypes:
    loading: PropTypes.bool.isRequired

  render: ->
    <button className="outline-auth-button">
      { @renderSpinner() } { i18n.t('buttons.auth_reset_password') }
    </button>

  renderSpinner: ->
    if @props.loading
      <Spinner size={ 14 } />

module.exports = AuthEmailResetButton