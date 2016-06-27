/*global i18n, ReactShakeMixin, RequesterMixin, ComponentManipulationsMixin */
import React, { PropTypes, createClass } from 'react';
import EmailFooter from './EmailFooter';
import EmailLoginField from './EmailLoginField';
import EmailPasswordField from './EmailPasswordField';
import EmailSubmitButton from './EmailSubmitButton';
import EmailMixin from './EmailMixin';

const Email = createClass({
  propTypes: {
    changeLogin: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    login: PropTypes.string,
    password: PropTypes.string,
    toAuth: PropTypes.func.isRequired,
    toRecovery: PropTypes.func.isRequired,
  },
  mixins: [ EmailMixin, ReactShakeMixin, RequesterMixin, ComponentManipulationsMixin ],

  getInitialState() {
    return {
      isProcess: false,
      isLoginError: false,
      isPasswordError: false,
    };
  },

  render() {
    const { changeLogin, changePassword, login, password } = this.props;
    const { isProcess, isLoginError, isPasswordError } = this.state;

    return (
      <div className="form-popup form-popup--login">
        <div className="form-popup__header">
          <h3 className="form-popup__title">
            {i18n.t('email_signin_signup_header')}
          </h3>
        </div>
        <div className="form-popup__body">
          <form>
            <EmailLoginField
              isDisabled={isProcess}
              isError={isLoginError}
              onChange={changeLogin}
              ref="login"
              value={login}
            />
            <EmailPasswordField
              isDisabled={isProcess}
              isError={isPasswordError}
              onChange={changePassword}
              ref="password"
              value={password}
            />
            <EmailSubmitButton
              isDisabled={isProcess}
              isProcess={isProcess}
              onSubmit={this.handleSubmit}
            />
          </form>
        </div>
        {!isProcess && <EmailFooter {...this.props} />}
      </div>
    );
  },
});

export default Email;
