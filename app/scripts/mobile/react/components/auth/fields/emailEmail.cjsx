AuthEmailEmailField = React.createClass
  displayName: 'AuthEmailEmailField'

  render: ->
    <div className="auth__field">
      <label htmlFor="auth-email"
             className="auth__field-icon">
        <i className="icon icon--profile" />
      </label>
      <input ref="input"
             type="email"
             placeholder={ i18n.t('placeholders.auth_email') }
             id="auth-email"
             className="auth__field-input" />
    </div>

  getValue: ->
    @refs.input.getDOMNode().value.trim()

module.exports = AuthEmailEmailField