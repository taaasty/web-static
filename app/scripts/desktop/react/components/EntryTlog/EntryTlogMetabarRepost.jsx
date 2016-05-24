/*global i18n */
import React, { Component, PropTypes } from 'react';
import EntryRepostPopup from '../popups/EntryRepostPopup';

class EntryTlogMetabarRepost extends Component {
  state = {
    isPopupOpened: false,
  };
  closePopup() {
    this.setState({ isPopupOpened: false });
  }
  togglePopup() {
    this.setState({ isPopupOpened: !this.state.isPopupOpened });
  }
  render() {
    return this.props.commentator
      ? <span className="meta-item meta-item--repost">
          <span className="meta-item__content" ref="toggle">
            <a onClick={this.togglePopup.bind(this)}>
              <span className="meta-item__common">{i18n.t('entry_meta_repost_link')}</span>
            </a>
          </span>
        </span>
      : null;
  }
}

EntryTlogMetabarRepost.propTypes = {
  commentator: PropTypes.object,
  entryID: PropTypes.number.isRequired,
};

export default EntryTlogMetabarRepost;
