AuthEmailLoginField = React.createClass
  displayName: 'AuthEmailLoginField'

  render: ->
    <div className="auth__field">
      <label htmlFor="auth-email-nick"
             className="auth__field-icon">
        <i className="icon icon--profile" />
      </label>
      <input ref="input"
             type="text"
             placeholder={ i18n.t('placeholders.auth_login') }
             id="auth-email-nick"
             className="auth__field-input" />
    </div>

  getValue: ->
    @refs.input.getDOMNode().value.trim()

module.exports = AuthEmailLoginField