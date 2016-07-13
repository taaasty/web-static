/*global i18n, ReactShakeMixin */
import React, { PropTypes, createClass } from 'react';
import ConfirmRegistrationMixin from './ConfirmRegistrationMixin';
import Routes from '../../../../shared/routes/routes';

const SocialNetworksConfirmRegistration = createClass({
  propTypes: {
    postUrl: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    toAuth: PropTypes.func.isRequired,
  },
  mixins: [ ConfirmRegistrationMixin, ReactShakeMixin ],

  handleDisapproveClick(ev) {
    ev.preventDefault();
    this.props.toAuth();
  },

  render() {
    const { postUrl, slug } = this.props;

    return (
      <div className="form-popup form-popup--confirm">
        <div className="form-popup__body">
          <form action={postUrl} method="post">
            <div className="form-popup__lead">
              {i18n.t('auth.confirm_signup', { userSlug: slug })}
            </div>
            <div className="form-popup__submit">
              <button className="button button--large button--green-light button--block button--rectangle">
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
          </form>
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

export default SocialNetworksConfirmRegistration;
