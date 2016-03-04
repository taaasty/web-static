/*global i18n, ReactApp, Email, TastyUtils, gon */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import ApiRoutes from '../../../../shared/routes/api';

class Auth extends Component {
  handleEmailClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    ReactApp.shellbox.show(Email);
  }
  renderEntriesCount() {
    const number = parseInt(TastyUtils.formatNumber(gon.app_stats.entries_count, 100, ''));
    const formatedNumber = TastyUtils.formatNumber(gon.app_stats.entries_count, 100);

    return (
      <span>
        <strong>{formatedNumber}+</strong>
        <span>{i18n.t('entries_count', { count: number })}</span>
      </span>
    );
  }
  renderUsersCount() {
    const number = parseInt(TastyUtils.formatNumber(gon.app_stats.users_count, 100, ''));
    const formatedNumber = TastyUtils.formatNumber(gon.app_stats.users_count, 100);

    return (
      <span>
        <strong>{formatedNumber}+</strong>
        <span>{i18n.t('users_count', {count: number})}</span>
      </span>
    );
  }
  renderSecondsCount() {
    const number = 30;

    return (
      <span>
        <strong>
          <span className="tilde">&#126;</span>
          <span>{number}</span>
        </strong>
        <span>{i18n.t('seconds_count', { count: number })}</span>
      </span> 
    );
  }
  render() {
    const { fixed, text } = this.props;
    const inviterClasses = classnames({
      'inviter': true,
      'inviter--fixed': fixed,
    });
    const boxStyle = {
      backgroundImage: 'url("http://thumbor0.tasty0.ru/unsafe/712x416/smart/images/inviter_bg.jpg")',
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
              <div className="inviter__title" dangerouslySetInnerHTML={{__html: i18n.t(text || 'auth')}} />
              <div className="inviter__text">
                {i18n.t('auth_select_signin_method')}
              </div>
              <div className="inviter__actions">
                <a
                  className="vk-auth-button"
                  href={ApiRoutes.omniauth_url('vkontakte')}
                >
                  {i18n.t('vkontakte')}
                </a>
                <a
                  className="fb-auth-button"
                  href={ApiRoutes.omniauth_url('facebook')}
                >
                  {i18n.t('facebook')}
                </a>
                <a
                  className="site-auth-button"
                  href="#"
                  onClick={this.handleEmailClick.bind(this)}
                >
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
  }
}

Auth.propTypes = {
  fixed: PropTypes.bool,
  text: PropTypes.string,
};

export default Auth;
