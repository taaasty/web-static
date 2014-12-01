###* @jsx React.DOM ###

#TODO: i18n
AUTH_TITLE     = 'Вернуться к выбору способа входа'
RECOVERY_TITLE = 'Я забыл пароль или почту'

EmailFooter = React.createClass

  render: ->
    return `<div className="form-popup__footer">
              <a title={ AUTH_TITLE }
                 className="form-popup__footer-item"
                 onClick={ this.handleAuthClick }>
                { AUTH_TITLE }
              </a>
              <span className="form-popup__footer-sep">·</span>
              <a title={ RECOVERY_TITLE }
                 className="form-popup__footer-item"
                 onClick={ this.handleRecoveryClick }>
                { RECOVERY_TITLE }
              </a>
            </div>`

  handleAuthClick: (e) ->
    e.preventDefault()
    ReactApp.shellbox.show Auth

  handleRecoveryClick: (e) ->
    e.preventDefault()
    ReactApp.shellbox.show RecoveryShellbox

module.exports = EmailFooter