#TODO: i18n
INPUT_PLACEHOLDER_TEXT = 'Электронная почта'

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
             placeholder={ INPUT_PLACEHOLDER_TEXT }
             id="auth-email"
             className="auth__field-input" />
    </div>

  getValue: ->
    @refs.input.getDOMNode().value.trim()

module.exports = AuthEmailEmailField