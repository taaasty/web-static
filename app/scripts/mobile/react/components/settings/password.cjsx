SettingsPasswordField        = require './password/fields/password'
SettingsPasswordConfirmField = require './password/fields/passwordConfirm'
{ PropTypes } = React

SettingsPassword = React.createClass
  displayName: 'SettingsPassword'

  propTypes:
    onChange: PropTypes.func.isRequired
    onUndo:   PropTypes.func.isRequired

  getInitialState: ->
    password:        ''
    passwordConfirm: ''

  render: ->
    <div className="settings__item">
      <div className="settings__left">
        <h3 className="settings__title">
          { i18n.t('settings.password_header') }
        </h3>
        <p className="settings__desc">
          { i18n.t('settings.password_description') }
        </p>
        <SettingsPasswordField
            value={ @state.password }
            onChange={ @handlePasswordChange } />
        <SettingsPasswordConfirmField
            value={ @state.passwordConfirm }
            onChange={ @handlePasswordConfirmChange } />
      </div>
    </div>

  resetFields: ->
    @setState @getInitialState()

  handlePasswordChange: (password) ->
    if @state.passwordConfirm is password and password isnt ''
      @props.onChange password

    if @state.password is @state.passwordConfirm and @state.password isnt ''
      @props.onUndo()

    @setState {password}

  handlePasswordConfirmChange: (password) ->
    if @state.password is password and password isnt ''
      @props.onChange password

    if @state.password is @state.passwordConfirm and @state.password isnt ''
      @props.onUndo()

    @setState(passwordConfirm: password)

module.exports = SettingsPassword