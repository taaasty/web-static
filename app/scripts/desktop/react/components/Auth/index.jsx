/*global i18n, ReactApp */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import ApiRoutes from '../../../../shared/routes/api';
import Email from './Email';
import StatsFooter from './StatsFooter';
import RefFooter from './RefFooter';

class Auth extends Component {
  handleEmailClick(ev) {
    const { token } = this.props;
    ev.preventDefault();
    ev.stopPropagation();
    ReactApp.shellbox.show(Email, { token });
  }
  render() {
    const { fixed, text, token } = this.props;
    const inviterClasses = classnames({
      'inviter': true,
      'inviter--fixed': fixed,
    });
    const boxStyle = {
      backgroundImage: 'url("//thumbor0.tasty0.ru/unsafe/712x416/smart/images/inviter_bg.jpg")',
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
                  href={ApiRoutes.omniauth_url('vkontakte', token)}
                >
                  {i18n.t('vkontakte')}
                </a>
                <a
                  className="fb-auth-button"
                  href={ApiRoutes.omniauth_url('facebook', token)}
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
              {token ? <RefFooter /> : <StatsFooter />}
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
  token: PropTypes.string,
};

export default Auth;
