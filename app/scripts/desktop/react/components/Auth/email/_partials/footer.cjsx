Auth = require '../../../Auth';

EmailFooter = React.createClass

  render: ->
    return <div className="form-popup__footer">
             <a title={ i18n.t('return_to_selecting_signin_method') }
                className="form-popup__footer-item"
                onClick={ this.handleAuthClick }>
               { i18n.t('return_to_selecting_signin_method') }
             </a>
             <span className="form-popup__footer-sep">·</span>
             <a title={ i18n.t('forgot_password_or_email') }
                className="form-popup__footer-item"
                onClick={ this.handleRecoveryClick }>
               { i18n.t('forgot_password_or_email') }
             </a>
           </div>

  handleAuthClick: (e) ->
    e.preventDefault()
    ReactApp.shellbox.show Auth

  handleRecoveryClick: (e) ->
    e.preventDefault()
    ReactApp.shellbox.show RecoveryShellbox

module.exports = EmailFooter