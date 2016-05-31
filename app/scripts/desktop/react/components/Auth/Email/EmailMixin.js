/*global i18n, ReactApp */
import { clone, defer } from 'lodash';
import EmailConfirmRegistration from './EmailConfirmRegistration';
import NoticeService from '../../../services/Notice';
import ApiRoutes from '../../../../../shared/routes/api';

const INVALID_PASSWORD_MESSAGE = 'user_authenticator/invalid_password';
const INVALID_EMAIL_MESSAGE = 'user_authenticator/user_by_email_not_found';
const INVALID_SLUG_MESSAGE = 'user_authenticator/user_by_slug_not_found';

const EmailMixin = {
  isValid() {
    const { login, password } = this.state.formData;

    if (login.length === 0) {
      NoticeService.notifyError(i18n.t('empty_login_error'));
      return false;
    } else if (password.length === 0) {
      NoticeService.notifyError(i18n.t('empty_password_error'));
      return false;
    }

    return true;
  },

  login() {
    const { login, password } = this.state.formData;
    const { token } = this.props;

    this.setState({ isProcess: true });

    this.createRequest({
      url: ApiRoutes.signin_url(),
      method: 'POST',
      data: {
        email: login,
        password: password,
        ref_token: token,
      },
      success: (data) => {
        NoticeService.notifySuccess(i18n.t('signin_success', { userSlug: data.name }));
        ReactApp.shellbox.close();
        if (window.ga) {
          window.ga('send', 'event', 'Account', 'Login',
                    { hitCallback: () => window.location.reload(true) });
        } else {
          defer(() => window.location.reload(true));
        }
      },
      error: (data) => {
        this.shake();

        if (data.responseJSON != null) {
          switch (data.responseJSON.error_code) {
          case INVALID_PASSWORD_MESSAGE:
            this.safeUpdateState({ isPasswordError: true });
            break;
          case INVALID_EMAIL_MESSAGE:
          case INVALID_SLUG_MESSAGE:
            const proposedData = data.responseJSON.proposed_data;
            
            this.safeUpdateState({ isLoginError: true });
            
            if (proposedData != null) {
              return this.handleInvalidLogin({ proposedSlug: proposedData.slug });
            }
            break;
          }
        }

        NoticeService.errorResponse(data);
      },
      complete: () => {
        this.safeUpdateState({ isProcess: false });
      },
    });
  },

  handleSubmit() {
    this.resetPasswordErrors();

    if (this.isValid()) {
      return this.login();
    } else {
      return this.shake();
    }
  },

  handleInvalidLogin({ proposedSlug }) {
    const { login, password } = this.state.formData;

    ReactApp.shellbox.show(EmailConfirmRegistration, {
      password,
      proposedSlug,
      email: login,
    });
  },

  resetPasswordErrors() {
    this.setState({
      isLoginError: false,
      isPasswordError: false,
    });
  },

  handleLoginChange(val) {
    const newFormData = clone(this.state.formData);
    newFormData.login = val;

    this.setState({ formData: newFormData });
  },

  handlePasswordChange(val) {
    const newFormData = clone(this.state.formData);
    newFormData.password = val;

    this.setState({ formData: newFormData });
  },
};

export default EmailMixin;
