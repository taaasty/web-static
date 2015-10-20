SettingsVkontakte = React.createClass

  propTypes:
    user: React.PropTypes.object.isRequired

  click: ->
    window.location = ApiRoutes.omniauth_url('vkontakte') + "?attach_to_user_id=" +@props.user.id

  render: ->
    <div className="settings__item">
      <div className="settings__right">
        <button className="button button--vkontakte" onClick={this.click}>
          <span className="icon icon--vkontakte" />
          <span className="button__text">
            { i18n.t('settings_vkontakte_signin') }
          </span>
        </button>
      </div>
      <div className="settings__left">
        <h3 className="settings__title">
          { i18n.t('settings_vkontakte') }
        </h3>
        <p className="settings__desc">
          { i18n.t('settings_vkontakte_description') }
        </p>
      </div>
    </div>

module.exports = SettingsVkontakte