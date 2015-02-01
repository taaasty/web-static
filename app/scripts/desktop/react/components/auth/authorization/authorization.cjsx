window.AuthorizationShellbox = React.createClass

  render: ->
    entriesCount = @_getEntriesCount()
    usersCount   = @_getUsersCount()
    boxStyle =
      backgroundImage: "url(http://thumbor0.tasty0.ru/unsafe/712x416/smart//images/inviter_bg.jpg)"

    return <div className="inviter">
             <div className="inviter__box" style={ boxStyle }>
               <div className="inviter__overlay" />
               <div className="grid-full">
                 <div className="grid-full__middle">
                   <div className="inviter__logo">
                     <i className="icon icon--ribbon"></i>
                   </div>
                   <div className="inviter__title"
                        dangerouslySetInnerHTML={{ __html: i18n.t('auth') }} />
                   <div className="inviter__actions">
                     { this.props.children }
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