/*global i18n */
import React, { Component, PropTypes } from 'react';
import { facebookUrl, vkontakteUrl, open } from '../common/SocialShare';
import CurrentUserStore from '../../stores/current_user';

class InviteRef extends Component {
  componentDidMount() {
    this.refs.input.select();
  }
  render () {
    const { closeShellbox, inviteUrl } = this.props;
    const userpic = CurrentUserStore.getUserpic();
    const vkUrl = vkontakteUrl(inviteUrl, i18n.t('invite_ref.share_text'), userpic && userpic.original_url);
    const fbUrl = facebookUrl(inviteUrl);

    return (
      <div className="invite-ref__container">
        <div className="invite-ref__body">
          <div className="invite-ref__close" onClick={closeShellbox}>
            <i className="icon icon--cross" />
          </div>
          <div className="invite-ref__title">
            {i18n.t('invite_ref.title')}
          </div>
          <div className="invite-ref__text">
            {i18n.t('invite_ref.text')}
          </div>
          <div className="invite-ref__input-container">
            <input
              className="invite-ref__input"
              defaultValue={inviteUrl}
              ref="input"
            />
          </div>
          <div className="invite-ref__buttons-container">
            <a href={vkUrl} onClick={open.bind(null, 'vkontakte', vkUrl)}>
              <span className="button button--large invite-ref__button --vk-button">
                {i18n.t('invite_ref.vk_button')}
              </span>
            </a>
            <a href={fbUrl} onClick={open.bind(null, 'facebook', fbUrl)}>
              <span className="button button--large invite-ref__button --fb-button">
                {i18n.t('invite_ref.fb_button')}
              </span>
            </a>
          </div>
          <div className="invite-ref__footer">
            {i18n.t('invite_ref.footer_text')}
          </div>
        </div>
      </div>
    );
  }
}

InviteRef.displayName = 'InviteRef';

InviteRef.propTypes = {
  closeShellbox: PropTypes.func.isRequired,
  inviteUrl: PropTypes.string.isRequired,
};

export default InviteRef;
