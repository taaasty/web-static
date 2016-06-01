/*global i18n */
import React, { Component, PropTypes } from 'react';
import ApiRoutes from '../../../../shared/routes/api';
import StatsFooter from './StatsFooter';
import RefFooter from './RefFooter';

class Auth extends Component {
  handleEmailClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.props.toEmail();
  }
  render() {
    const { text, token } = this.props;
    const boxStyle = {
      backgroundImage: 'url("//thumbor0.tasty0.ru/unsafe/712x416/smart/images/inviter_bg.jpg")',
    };

    return (
      <div className="inviter">
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
  text: PropTypes.string,
  toEmail: PropTypes.func.isRequired,
  token: PropTypes.string,
};

export default Auth;
