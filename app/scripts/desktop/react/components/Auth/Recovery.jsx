/*global i18n, ReactApp, ReactShakeMixin, RequesterMixin, ComponentManipulationsMixin */
import React, { createClass } from 'react';
import Auth from './index';
import NoticeService from '../../services/Notice';
import ApiRoutes from '../../../../shared/routes/api';

const Recovery = createClass({
  mixins: [ ReactShakeMixin, RequesterMixin, ComponentManipulationsMixin ],

  getInitialState() {
    return {
      isProcess: false,
    };
  },

  gotoSelectSignin(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    ReactApp.shellbox.show(Auth);
  },

  submit(ev) {
    ev.preventDefault();

    if (this.state.isProcess) {
      return;
    }

    const slug = this.refs.slug.value;

    if (slug.length < 1) {
      this.shake();
      NoticeService.notifyError(i18n.t('empty_login_error'));
      return;
    }

    this.setState({ isProcess: true });

    this.createRequest({
      url: ApiRoutes.recovery_url(),
      data: {
        slug_or_email: slug,
      },
      method: 'POST',
      success: () => {
        NoticeService.notifySuccess(i18n.t('recovery_mail_sent'), 10000);
        ReactApp.shellbox.close();
      },
      error: (data) => {
        this.shake();
        this.refs.slug.focus();
        NoticeService.errorResponse(data);
      },
      complete: () => {
        this.safeUpdateState({ isProcess: false });
      },
    });
  },

  render() {
    const { isProcess } = this.state;

    return (
      <div className="form-popup shellbox-content">
        <div className="form-popup__header">
          <h3 className="form-popup__title">
            {i18n.t('email_recovery_header')}
          </h3>
        </div>
        <div className="form-popup__body">
          <form onSubmit={this.submit}>
            <div className="form-popup__item">
              <div className="form-field form-field--simple">
                <input
                  autoFocus
                  className="form-field__input"
                  disabled={isProcess}
                  placeholder={i18n.t('login_field_placeholder')}
                  ref="slug"
                  type="text"
                />
                <div className="form-field__bg" />
              </div> 
            </div> 
            <div className="form-popup__submit">
              <button
                className="button button--large button--green-light button--block button--rectangle"
                disabled={isProcess}
              >
                <span className="button__text">
                  {i18n.t(isProcess ? 'reset_password_process_button' : 'reset_password_button')}
                </span>
              </button> 
            </div>
          </form>
        </div>
        <div className="form-popup__footer">
          <a
            className="form-popup__footer-item"
            onClick={this.gotoSelectSignin}
            title={i18n.t('remembered_password_link')}
          >
            {i18n.t('remembered_password_link')}
          </a>
        </div>
      </div>
    );
  },
});

export default Recovery;
