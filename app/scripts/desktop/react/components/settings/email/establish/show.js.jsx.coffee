###* @jsx React.DOM ###

SettingsEmailEstablishShow = React.createClass

  propTypes:
    onEditStart: React.PropTypes.func.isRequired

  render: ->
   `<div className="settings__item settings__item--full">
      <div className="settings__right">
        <button onClick={ this.props.onEditStart } className="button button--outline">
          <span className="button__text">Установить</span>
        </button>
      </div>
      <div className="settings__left">
        <h3 className="settings__title">Емейл</h3>
        <p className="settings__desc">Укажите емейл для того, чтобы получать уведомления</p>
      </div>
    </div>`

module.exports = SettingsEmailEstablishShow