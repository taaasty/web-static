_ = require 'lodash'
{ PropTypes } = React

SettingsEmailField = React.createClass
  displayName: 'SettingsEmailField'

  propTypes:
    value:    PropTypes.string
    disabled: PropTypes.bool

  getDefaultProps: ->
    value:    ''
    disabled: false

  render: ->
    <div className="form-field form-field--default form-field--light">
      <input ref="input"
             type="email"
             placeholder={ i18n.t('placeholders.settings_email') }
             defaultValue={ @props.value }
             disabled={ @props.disabled }
             className="form-field__input" />
    </div>

  getValue: ->
    _.trim @refs.input.getDOMNode().value

module.exports = SettingsEmailField