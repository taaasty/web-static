SettingsPasswordShow = React.createClass

  propTypes:
    onEditStart: React.PropTypes.func.isRequired

  render: ->
    <div className="settings__item settings__item--full">
      <div className="settings__right">
        <button className="button button--outline"
                onClick={ this.handleButtonClick }>
          <span className="button__text">Изменить</span>
        </button>
      </div>
      <div className="settings__left">
        <h3 className="settings__title">Пароль</h3>
        <p className="settings__desc">
          Используйте сложный пароль для авторизации и обеспечения сохранности данных.
        </p>
      </div>
    </div>

  handleButtonClick: (e) ->
    e.preventDefault()
    @props.onEditStart()

module.exports = SettingsPasswordShow