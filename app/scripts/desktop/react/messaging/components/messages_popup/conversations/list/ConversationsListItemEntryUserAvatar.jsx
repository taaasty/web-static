/*global i18n */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import UserAvatar from '../../../../../components/avatars/UserAvatar';
import ConversationActions from '../../../../actions/ConversationActions';

class ConversationsListItemEntryUserAvatar extends Component {
  state = {
    hover: false,
  }
  onMouseEnter() {
    this.setState({ hover: true });
  }
  onMouseLeave() {
    this.setState({ hover: false });
  }
  newConversation(ev) {
    ev.preventDefault();
    ConversationActions.openConversation(this.props.user.id);
  }
  render() {
    const { isExtra, user } = this.props;
    const containerClasses = classNames({
      'messages__dialog-user': true,
      '__extra': isExtra,
    });
    const dropdownClasses = classNames({
      'messages__dropdown': true,
      'state--open': this.state.hover,
    });

    return (
      <div
        className={containerClasses}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
      >
        <UserAvatar user={user} size={30} />
        <div className={dropdownClasses}>
          <a
            className="messages__dropdown-item"
            href={user.tlog_url}
            title={i18n.t('conversation_entry_user_profile')}
          >
            {i18n.t('conversation_entry_user_profile')}
          </a>
          <a
            className="messages__dropdown-item"
            href="#"
            onClick={this.newConversation.bind(this)}
            title={i18n.t('conversation_entry_user_private')}
          >
            {i18n.t('conversation_entry_user_private')}
          </a>
        </div>
      </div>
    );
  }
}

ConversationsListItemEntryUserAvatar.propTypes = {
  isExtra: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default ConversationsListItemEntryUserAvatar;
