i18n = require 'i18next'

INPUT_PLACEHOLDER_TEXT = -> i18n.t 'nickname_field_placeholder'

AuthEmailNicknameField = React.createClass
  displayName: 'AuthEmailNicknameField'

  render: ->
    <div className="auth__field">
      <label htmlFor="auth-nick"
             className="auth__field-icon">
        <i className="icon icon--diary" />
      </label>
      <input ref="input"
             type="text"
             placeholder={ INPUT_PLACEHOLDER_TEXT() }
             id="auth-nick"
             className="auth__field-input" />
    </div>

  getValue: ->
    @refs.input.getDOMNode().value.trim()

module.exports = AuthEmailNicknameField