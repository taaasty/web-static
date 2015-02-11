{ PropTypes } = React

SettingsPasswordField = React.createClass
  displayName: 'SettingsPasswordField'

  propTypes:
    value:    PropTypes.string.isRequired
    onChange: PropTypes.func.isRequired

  render: ->
    <div className="form-field form-field--default">
      <input type="password"
             value={ @props.value }
             placeholder={ i18n.t('placeholders.settings_password') }
             className="form-field__input"
             onChange={ @handleChange } />
    </div>

  handleChange: (e) ->
    @props.onChange e.target.value

module.exports = SettingsPasswordField