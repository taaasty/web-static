Spinner = require '../../common/spinner/spinner'
{ PropTypes } = React

AuthEmailSubmitButton = React.createClass
  displayName: 'AuthEmailSubmitButton'

  propTypes:
    loading: PropTypes.bool.isRequired

  render: ->
    <button className="outline-auth-button">
      { @renderSpinner() } { i18n.t('email_submit_button') }
    </button>

  renderSpinner: ->
    if @props.loading
      <Spinner size={ 14 } />

module.exports = AuthEmailSubmitButton