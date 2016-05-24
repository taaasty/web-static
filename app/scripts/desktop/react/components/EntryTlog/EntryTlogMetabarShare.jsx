/*global i18n */
import React, { Component, PropTypes } from 'react';
import DropdownActions from '../common/DropdownActions';
import DropdownAction from '../common/DropdownAction';
import EntryRepostPopup from '../popups/EntryRepostPopup';
import { TLOG_ENTRY_TYPE_ANONYMOUS } from '../../../../shared/constants/TlogEntry';

class EntryTlogMetabarShare extends Component {
  state = {
    isPopupOpened: false,
  };
  closePopup() {
    this.setState({ isPopupOpened: false });
  }
  togglePopup() {
    this.setState({ isPopupOpened: !this.state.isPopupOpened });
  }
  renderShare() {
    return (
      <span>
        <i className="icon icon--share" />
        {i18n.t('entry_meta_share')}
      </span>
    );
  }
  render() {
    const { commentator, entry: { id, type, url } } = this.props;

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
           title={i18n.t('buttons.share.fb')}
           url={url}
         />
        <DropdownAction
          title={i18n.t('buttons.share.vk')}
          url={url}
        />
        <DropdownAction
          title={i18n.t('buttons.share.twitter')}
          url={url}
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
