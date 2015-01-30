cx = require 'react/lib/cx'

window.Auth = React.createClass

  propTypes:
    fixed: React.PropTypes.bool

  render: ->
    inviterClasses = cx
      'inviter': true
      'inviter--fixed': @props.fixed

    boxStyle = backgroundImage: 'url("http://thumbor0.tasty0.ru/unsafe/712x416/smart/images/inviter_bg.jpg")'

    return <div className={ inviterClasses }>
             <div style={ boxStyle }
                  className="inviter__box">
               <div className="inviter__overlay" />
               <div className="grid-full">
                 <div className="grid-full__middle">

                   <div className="inviter__logo">
                     <i className="icon icon--ribbon" />
                   </div>

                   <div className="inviter__title"
                        dangerouslySetInnerHTML={{ __html: i18n.t('auth') }} />

                   <div className="inviter__text">
                     { i18n.t('auth_select_signin_method') }
                   </div>

                   <div className="inviter__actions">
                     <a className="vk-auth-button"
                        href={ ApiRoutes.omniauth_url('vkontakte') }
                        onClick={ this.handleVkClick }>
                       { i18n.t('vkontakte') }
                     </a>
                     <a className="fb-auth-button"
                        href={ ApiRoutes.omniauth_url('facebook') }
                        onClick={ this.handleFacebookClick }>
                       { i18n.t('facebook') }
                     </a>
                     <a href="http://taaasty.ru/auth/site"
                        className="site-auth-button"
                        onClick={ this.handleEmailClick }>
                       { i18n.t('auth_signin_login') }
                     </a>
                   </div>

                   <div className="inviter__spacer" />

                   <div className="inviter__stats">
                     <div className="inviter__stats-item">
                       { @renderEntriesCount() }
                     </div>
                     <div className="inviter__stats-item">
                       { @renderUsersCount() }
                     </div>
                     <div className="inviter__stats-item">
                       { @renderSecondsCount() }
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>

  renderEntriesCount: ->
    number         = parseInt TastyUtils.formatNumber window.gon.app_stats.entries_count, 100, ''
    formatedNumber = TastyUtils.formatNumber window.gon.app_stats.entries_count, 100

    <span>
      <strong>{ formatedNumber }+</strong>
      <span>{ i18n.t('entries_count', {count: number}) }</span>
    </span>

  renderUsersCount: ->
    number         = parseInt TastyUtils.formatNumber window.gon.app_stats.users_count, 100, ''
    formatedNumber = TastyUtils.formatNumber window.gon.app_stats.users_count, 100

    <span>
      <strong>{ formatedNumber }+</strong>
      <span>{ i18n.t('users_count', {count: number}) }</span>
    </span>

  renderSecondsCount: ->
    number = 30

    <span>
      <strong>
        <span className="tilde">&#126;</span>{ number }
      </strong>
      <span>{ i18n.t('seconds_count', {count: number}) }</span>
    </span>

  handleEmailClick: (e) ->
    e.preventDefault()
    ReactApp.shellbox.show Email