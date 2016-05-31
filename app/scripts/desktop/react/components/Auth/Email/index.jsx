/*global i18n, ReactShakeMixin, RequesterMixin, ComponentManipulationsMixin */
import React, { PropTypes, createClass } from 'react';
import EmailFooter from './EmailFooter';
import EmailLoginField from './EmailLoginField';
import EmailPasswordField from './EmailPasswordField';
import EmailSubmitButton from './EmailSubmitButton';
import EmailMixin from './EmailMixin';

const Email = createClass({
  propTypes: {
    login: PropTypes.string,
    password: PropTypes.string,
    token: PropTypes.string,
  },
  mixins: [ EmailMixin, ReactShakeMixin, RequesterMixin, ComponentManipulationsMixin ],

  getDefaultProps() {
    return {
      login: '',
      password: '',
    };
  },

  getInitialState() {
    return {
      formData: {
        login: this.props.login,
        password: this.props.password,
      },
      isProcess: false,
      isLoginError: false,
      isPasswordError: false,
    };
  },

  render() {
    const { formData: { login, password }, isProcess, isLoginError, isPasswordError } = this.state;

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
              onChange={this.handleLoginChange}
              ref="login"
              value={login}
            />
            <EmailPasswordField
              isDisabled={isProcess}
              isError={isPasswordError}
              onChange={this.handlePasswordChange}
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
        {!isProcess && <EmailFooter token={this.props.token} />}
      </div>
    );
  },
});

export default Email;
