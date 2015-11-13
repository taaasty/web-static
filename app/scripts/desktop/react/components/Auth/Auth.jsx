import classnames from 'classnames';

global.Auth = React.createClass({
  propTypes: {
    fixed: React.PropTypes.bool
  },

  render() {
    let inviterClasses = classnames('inviter', {
      'inviter--fixed': this.props.fixed
    });
    let boxStyle = {
      backgroundImage: 'url("http://thumbor0.tasty0.ru/unsafe/712x416/smart/images/inviter_bg.jpg")'
    };

    return (
      <div className={inviterClasses}>
        <div className="inviter__box" style={boxStyle}>
          <div className="inviter__overlay" />
          <div className="grid-full">
            <div className="grid-full__middle">
              <div className="inviter__logo">
                <i className="icon icon--ribbon" />
              </div>
              <div className="inviter__title" dangerouslySetInnerHTML={{__html: i18n.t('auth')}} />
              <div className="inviter__text">
                {i18n.t('auth_select_signin_method')}
              </div>
              <div className="inviter__actions">
                <a href={ApiRoutes.omniauth_url('vkontakte')}
                   className="vk-auth-button"
                   onClick={this.handleVkClick}>
                  {i18n.t('vkontakte')}
                </a>
                <a href={ApiRoutes.omniauth_url('facebook')}
                   className="fb-auth-button"
                   onClick={this.handleFacebookClick}>
                  {i18n.t('facebook')}
                </a>
                <a href="#"
                   className="site-auth-button"
                   onClick={this.handleEmailClick}>
                  {i18n.t('auth_signin_login')}
                </a>
              </div>
              <div className="inviter__spacer" />
              <div className="inviter__stats">
                <div className="inviter__stats-item">
                  {this.renderEntriesCount()}
                </div>
                <div className="inviter__stats-item">
                  {this.renderUsersCount()}
                </div>
                <div className="inviter__stats-item">
                  {this.renderSecondsCount()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  renderEntriesCount() {
    let number = parseInt(TastyUtils.formatNumber(gon.app_stats.entries_count, 100, '')),
        formatedNumber = TastyUtils.formatNumber(gon.app_stats.entries_count, 100);

    return (
      <span>
        <strong>{formatedNumber}+</strong>
        <span>{i18n.t('entries_count', {count: number})}</span>
      </span>
    );
  },

  renderUsersCount() {
    let number = parseInt(TastyUtils.formatNumber(gon.app_stats.users_count, 100, '')),
        formatedNumber = TastyUtils.formatNumber(gon.app_stats.users_count, 100);

    return (
      <span>
        <strong>{formatedNumber}+</strong>
        <span>{i18n.t('users_count', {count: number})}</span>
      </span>
    );
  },

  renderSecondsCount() {
    let number = 30;

    return (
      <span>
        <strong>
          <span className="tilde">&#126;</span>
          <span>{number}</span>
        </strong>
        <span>{i18n.t('seconds_count', {count: number})}</span>
      </span> 
    );
  },

  handleEmailClick(ev) {
    ev.preventDefault();
    ReactApp.shellbox.show(Email);
  }
});
