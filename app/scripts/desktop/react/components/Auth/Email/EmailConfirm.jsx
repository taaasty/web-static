/*global i18n, RequesterMixin, ReactShakeMixin, ComponentManipulationsMixin */
import React, { PropTypes, createClass } from 'react';
import ConfirmRegistrationMixin from '../ConfirmRegistrationMixin';
import Routes from '../../../../../shared/routes/routes';

const EmailConfirm = createClass({
  propTypes: {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    toEmail: PropTypes.func.isRequired,
  },
  mixins: [ ConfirmRegistrationMixin, RequesterMixin, ReactShakeMixin, ComponentManipulationsMixin ],

  getInitialState() {
    return {
      isProcess: false,
    };
  },

  handleApproveClick(ev) {
    ev.preventDefault();
    this.register();
  },

  handleDisapproveClick(ev) {
    ev.preventDefault();
    this.props.toEmail();
  },

  render() {
    const { slug } = this.props;

    return (
      <div className="form-popup form-popup--confirm">
        <div className="form-popup__body">
          <div className="form-popup__lead">
            {i18n.t('auth.confirm_signup', { userSlug: slug })}
          </div>
          <div className="form-popup__submit">
            <button
              className="button button--large button--green-light button--block button--rectangle"
              onClick={this.handleApproveClick}
            >
              {i18n.t('auth.confirm_signup_approve')}
            </button>
          </div>
          <div className="form-popup__terms">
            {i18n.t('auth.accept_terms')}
            <a
              className="form-popup__terms-link"
              href={Routes.terms()}
              target="_blank"
            >
              {i18n.t('auth.accept_terms_link')}
            </a>
          </div>
        </div>
        <div className="form-popup__footer">
          <span className="form-popup__footer-or">
            {i18n.t('or')}
          </span>
          <a className="form-popup__footer-item" onClick={this.handleDisapproveClick}>
            {i18n.t('auth.already_registered_link')}
          </a>
        </div>
      </div>
    );
  },
});

export default EmailConfirm;
