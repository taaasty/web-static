/*global i18n */
import React, { Component, PropTypes } from 'react';
import DropdownActions from '../common/DropdownActions';
import DropdownAction from '../common/DropdownAction';
import EntryRepostPopup from '../popups/EntryRepostPopup';
import { TLOG_ENTRY_TYPE_ANONYMOUS } from '../../../../shared/constants/TlogEntry';
import { facebookUrl, vkontakteUrl, twitterUrl, open } from '../common/SocialShare';

const defaultImg = 'http://taaasty.com/favicons/mstile-310x310.png';

class EntryTlogMetabarShare extends Component {
  state = {
    isPopupOpened: false,
  };
  closePopup() {
    this.setState({ isPopupOpened: false });
  }
  togglePopup() {
    this.refs.toggle.setClose();
    this.setState({ isPopupOpened: !this.state.isPopupOpened });
  }
  renderShare() {
    return (
      <span className="meta-item__common">
        <i className="icon icon--share" />
      </span>
    );
  }
  render() {
    const { commentator, entry: { id, preview_image, title_truncated, type, url } } = this.props;

    const vkUrl = vkontakteUrl(url, title_truncated, (preview_image && preview_image.url) || defaultImg);
    const fbUrl = facebookUrl(url);
    const twUrl = twitterUrl(url, title_truncated);

    return (
      <DropdownActions
        className="meta-item meta-item--share"
        item={this.renderShare()}
        ref="toggle"
      >
        {this.state.isPopupOpened &&
         <EntryRepostPopup
           entryID={id}
           isOpened={this.state.isPopupOpened}
           onClose={this.closePopup.bind(this)}
           targetRef={this.refs.toggle}
         />
        }
        {commentator && type !== TLOG_ENTRY_TYPE_ANONYMOUS &&
         <DropdownAction
           onClick={this.togglePopup.bind(this)}
           title={i18n.t('entry_meta_repost_link')}
         />}
        <DropdownAction
          onClick={open.bind(null, 'Vk', vkUrl)}
          title={i18n.t('entry_meta_vk')}
          url={vkUrl}
        />
        <DropdownAction
          onClick={open.bind(null, 'Facebook', fbUrl)}
          title={i18n.t('entry_meta_fb')}
          url={fbUrl}
        />
        <DropdownAction
          onClick={open.bind(null, 'Twitter', twUrl)}
          title={i18n.t('entry_meta_twitter')}
          url={twUrl}
        />
      </DropdownActions>
    );
  }
}

EntryTlogMetabarShare.propTypes = {
  commentator: PropTypes.object,
  entry: PropTypes.object.isRequired,
};

export default EntryTlogMetabarShare;
