/*global i18n */
import React, { Component, PropTypes } from 'react';
import EntryRepostPopup from '../../popups/EntryRepostPopup';

export default class EntryTlogMetabarRepost extends Component {
  static propTypes = {
    commentator: PropTypes.object,
    entryID: PropTypes.number.isRequired,
  }
  state = {
    isPopupOpened: false
  }
  render() {
    if (this.props.commentator) {
      return (
        <span className="meta-item meta-item--repost">
          <span ref="toggle" className="meta-item__content">
            <a onClick={this.togglePopup.bind(this)}>
              <span className="meta-item__common">{i18n.t('entry_meta_repost_link')}</span>
            </a>
          </span>
          {this.state.isPopupOpened &&
            <EntryRepostPopup
              entryID={this.props.entryID}
              targetRef={this.refs.toggle}
              isOpened={this.state.isPopupOpened}
              onClose={this.closePopup.bind(this)}
            />
          }
        </span>
      );
    } else {
      return null;
    }
  }
  closePopup() {
    this.setState({ isPopupOpened: false });
  }
  togglePopup() {
    this.setState({ isPopupOpened: !this.state.isPopupOpened });
  }
}
