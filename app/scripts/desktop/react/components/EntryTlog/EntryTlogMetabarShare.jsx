/*global i18n */
import React, { Component, PropTypes } from 'react';
import DropdownActions from '../common/DropdownActions';
import DropdownAction from '../common/DropdownAction';
import EntryRepostPopup from '../EntryRepostPopup';
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
    const {
      commentator,
      entry,
    } = this.props;

    const id = entry.get('id');
    const url = entry.get('url', entry.get('entryUrl'));
    const titleTruncated = entry.get('titleTruncated');
    const type = entry.get('type');
    const previewImageUrl = entry.getIn(['previewImage', 'url']);

    const vkUrl = vkontakteUrl(url, titleTruncated, previewImageUrl || defaultImg);
    const fbUrl = facebookUrl(url);
    const twUrl = twitterUrl(url, titleTruncated);

    return (
      <span className="meta-item meta-item--share">
        {this.state.isPopupOpened &&
          <EntryRepostPopup
            entryId={id}
            onClose={this.closePopup.bind(this)}
          />
        }
        <DropdownActions
          item={this.renderShare()}
          ref="toggle"
        >
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
      </span>
    );
  }
}

EntryTlogMetabarShare.propTypes = {
  commentator: PropTypes.object,
  entry: PropTypes.object.isRequired,
};

export default EntryTlogMetabarShare;
