/*global i18n, ReactApp */
import { defer } from 'lodash';
import Auth from './index';
import Email from './Email';
import ApiRoutes from '../../../../shared/routes/api';
import NoticeService from '../../services/Notice';

const USER_EXISTS_MESSAGE = 'user_creator/user_exists';

const ConfirmRegistrationMixin = {
  register() {
    if (this.state.isProcess) {
      return;
    }

    const { email, password, proposedSlug } = this.props;

    this.setState({ isProcess: true });

    this.createRequest({
      url: ApiRoutes.signup_url(),
      method: 'POST',
      data: {
        email: email,
        password: password,
        slug: proposedSlug,
      },
      success: (data) => {
        const redirect_url = `${data.tlog_url}?first_login`;

        NoticeService.notifySuccess(i18n.t('signup_success', { userSlug: data.name }));
        ReactApp.shellbox.close();
        if (window.ga) {
          window.ga('send', 'event', 'Account', 'Registered', 'Email',
                    { hitCallback: () => window.location.href = redirect_url });
        } else {
          defer(() => window.location.href = redirect_url);
        }
      },
      error: (data) => {
        if (data.responseJSON && data.responseJSON.error_code === USER_EXISTS_MESSAGE) {
          this.returnToEmail();
        } else {
          this.shake();
        }

        NoticeService.errorResponse(data);
      },
      complete: () => {
        this.safeUpdateState({ isProcess: false });
      },
    });
  },

  returnToEmail() {
    const { email, password } = this.props;

    ReactApp.shellbox.show(Email, {
      login: email,
      password: password,
    });
  },

  returnToAuth() {
    ReactApp.shellbox.show(Auth);
  },
};

export default ConfirmRegistrationMixin;
