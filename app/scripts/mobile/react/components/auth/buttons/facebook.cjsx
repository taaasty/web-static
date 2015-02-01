AuthFacebookButton = React.createClass
  displayName: 'AuthFacebookButton'

  render: ->
    <button className="fb-auth-button"
            onClick={ @handleClick }>
      { i18n.t('buttons.auth_facebook_signin') }
    </button>

  handleClick: ->
    window.location = ApiRoutes.omniauth_url 'facebook'

module.exports = AuthFacebookButton