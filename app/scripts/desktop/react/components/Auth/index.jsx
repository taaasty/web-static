import React, { Component, PropTypes } from 'react';
import Auth from './Auth';
import Email from './Email';
import Recovery from './Recovery';
import EmailConfirm from './Email/EmailConfirm';
import SocialConfirm from './SocialConfirm';

export const SOCIAL_CONFIRM_TAB = 'social-confirm';
export const EMAIL_CONFIRM_TAB = 'email-confirm';
const AUTH_TAB = 'auth';
const EMAIL_TAB = 'email';
const RECOVERY_TAB = 'recovery';
const tabMap = {
  [AUTH_TAB]: Auth,
  [EMAIL_TAB]: Email,
  [RECOVERY_TAB]: Recovery,
  [SOCIAL_CONFIRM_TAB]: SocialConfirm,
  [EMAIL_CONFIRM_TAB]: EmailConfirm,
};

class AuthContainer extends Component {
  state = {
    login: this.props.initLogin,
    password: this.props.initPassword,
    slug: this.props.initSlug,
    tab: this.props.initTab,
  };
  render() {
    const { tab } = this.state;
    const Tab = tabMap[tab];

    return (
      <Tab {...this.props} {...this.state}
        changeLogin={(login) => this.setState({ login })}
        changePassword={(password) => this.setState({ password })}
        toAuth={() => this.setState({ tab: AUTH_TAB })}
        toEmail={() => this.setState({ tab: EMAIL_TAB })}
        toEmailConfirm={(slug) => this.setState({ slug, tab: EMAIL_CONFIRM_TAB })}
        toRecovery={() => this.setState({ tab: RECOVERY_TAB })}
      />
    );
  }
}

AuthContainer.propTypes = {
  initLogin: PropTypes.string,
  initPassword: PropTypes.string,
  initSlug: PropTypes.string,
  initTab: PropTypes.string,
  postUrl: PropTypes.string,
  text: PropTypes.string,
  token: PropTypes.string,
};

AuthContainer.defaultProps = {
  initLogin: '',
  initPassword: '',
  initTab: AUTH_TAB,
};

export default AuthContainer;
