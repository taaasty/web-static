/*global i18n, ReactShakeMixin */
import React, { PropTypes, createClass } from 'react';
import ConfirmRegistrationMixin from './ConfirmRegistrationMixin';

const SocialNetworksConfirmRegistration = createClass({
  propTypes: {
    postUrl: PropTypes.string.isRequired,
    proposedSlug: PropTypes.string.isRequired,
  },
  mixins: [ ConfirmRegistrationMixin, ReactShakeMixin ],

  handleDisapproveClick(ev) {
    ev.preventDefault();
    this.returnToAuth();
  },

  render() {
    const { postUrl, proposedSlug } = this.props;

    return (
      <div className="form-popup form-popup--confirm">
        <div className="form-popup__body">
          <form action={postUrl} method="post">
            <div className="form-popup__lead">
              {i18n.t('confirm_signup', { userSlug: proposedSlug })}
            </div>
            <div className="form-popup__submit">
              <button
                className="button button--large button--green-light button--block button--rectangle"
                onClick={this.handleApproveClick}
              >
                {i18n.t('confirm_signup_approve')}
              </button>
            </div>
          </form>
        </div>
        <div className="form-popup__footer">
          <span className="form-popup__footer-or">
            или
          </span>
          <a className="form-popup__footer-item" onClick={this.handleDisapproveClick}>
            {i18n.t('already_registered_link')}
          </a>
        </div>
      </div>
    );
  },
});

export default SocialNetworksConfirmRegistration;
