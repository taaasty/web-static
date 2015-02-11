{ PropTypes } = React

SettingsPasswordConfirmField = React.createClass
  displayName: 'SettingsPasswordConfirmField'

  propTypes:
    value:    PropTypes.string.isRequired
    onChange: PropTypes.func.isRequired

  render: ->
    <div className="form-field form-field--default">
      <input type="password"
             value={ @props.value }
             placeholder="Новый пароль еще раз"
             className="form-field__input"
             onChange={ @handleChange } />
    </div>

  handleChange: (e) ->
    @props.onChange e.target.value

module.exports = SettingsPasswordConfirmField