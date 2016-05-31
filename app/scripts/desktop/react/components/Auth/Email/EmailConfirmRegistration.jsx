/*global i18n, RequesterMixin, ReactShakeMixin, ComponentManipulationsMixin */
import React, { PropTypes, createClass } from 'react';
import ConfirmRegistrationMixin from  '../ConfirmRegistrationMixin';

const EmailConfirmRegistration = createClass({
  propTypes: {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    proposedSlug: PropTypes.string.isRequired,
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
    this.returnToEmail();
  },

  render() {
    return (
      <div className="form-popup form-popup--confirm">
        <div className="form-popup__body">
          <div className="form-popup__lead">
            {i18n.t('confirm_signup', { userSlug: this.props.proposedSlug })}
          </div>
          <div className="form-popup__submit">
            <button
              className="button button--large button--green-light button--block button--rectangle"
              onClick={this.handleApproveClick}
            >
              {i18n.t('confirm_signup_approve')}
            </button>
          </div>
        </div>
        <div className="form-popup__footer">
          <span className="form-popup__footer-or">
            {i18n.t('or')}
          </span>
          <a className="form-popup__footer-item" onClick={this.handleDisapproveClick}>
            {i18n.t('already_registered_link')}
          </a>
        </div>
      </div>
    );
  },
});

export default EmailConfirmRegistration;
