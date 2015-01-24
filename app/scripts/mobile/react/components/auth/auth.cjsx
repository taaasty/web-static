AuthVkontakteButton   = require './buttons/vkontakte'
AuthFacebookButton    = require './buttons/facebook'
AuthEmailSignInButton = require './buttons/emailSignIn'
AuthEmailSignUpButton = require './buttons/emailSignUp'

#TODO: i18n
TITLE = 'Это&nbsp;<strong>дневник</strong>, в&nbsp;который хочется писать каждый день'

#FIXME: Remove from global when implement react-router
window.Auth = React.createClass
  displayName: 'Auth'

  render: ->
    <div className="auth">
      <div className="auth__grid-table">
        <div className="auth__grid-cell">
          <div style={{ backgroundImage: 'url(../../images/images/Polly-73.jpg)' }}
               className="auth__bg" />
          <div className="auth__section">
            <div className="auth__body">
              <div className="auth__logo">
                <i className="icon icon--ribbon" />
              </div>
              <h1 className="auth__lead"
                  dangerouslySetInnerHTML={{ __html: TITLE }} />
              <div className="auth__buttons">
                <AuthVkontakteButton />
                <AuthFacebookButton />
                <AuthEmailSignInButton />
                <AuthEmailSignUpButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

module.exports = Auth