SettingsPassword = React.createClass
  displayName: 'SettingsPassword'

  render: ->
    <div className="settings__item">
      <div className="settings__left">
        <h3 className="settings__title">
          Пароль
        </h3>
        <p className="settings__desc">
          Используйте сложный пароль для авторизации и обеспечения сохранности данных.
        </p>
        <div className="form-field form-field--default">
          <input type="password"
                 placeholder="Новый пароль"
                 className="form-field__input" />
        </div>
        <div className="form-field form-field--default">
          <input type="password"
                 placeholder="Новый пароль еще раз"
                 className="form-field__input" />
        </div>
      </div>
    </div>

module.exports = SettingsPassword