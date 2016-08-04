/*global i18n */
import React, { PropTypes } from 'react';
import moment from 'moment';
import List from './List';
import FooterButton from '../MessagesPopup/FooterButton';
import { connect } from 'react-redux';
import {
  showThread,
  showCreateNew,
} from '../../actions/MessagesPopupActions';

function Conversations(props) {
  const {
    conversations,
    showCreateNew,
    showThread,
  } = props;

  return (
    <div className="messages__section messages__section--dialogs">
      <List
        conversations={conversations}
        showThread={showThread}
      />
      <FooterButton
        onClick={showCreateNew}
        text={i18n.t('new_thread_button')}
      />
    </div>
  );
}

Conversations.propTypes = {
  conversations: PropTypes.object.isRequired,
  showCreateNew: PropTypes.func.isRequired,
  showThread: PropTypes.func.isRequired,
};

function weight(conv) {
  const createdAt = conv.getIn(['lastMessage', 'createdAt']);

  return (conv.get('unreadMessagesCount', 0) > 0 ? 1e6 : 0)
    - (!conv.getIn(['entry', 'isWatching']) ? 1e5 : 0)
    + (createdAt ? moment(createdAt).valueOf() / 1e9 : 0);
}

export default connect(
  (state) => {
    const currentUserId = state.currentUser.data.id;
    const conversations = state.entities
      .get('conversation')
      .filter((c) => c.get('userId' === currentUserId))
      .sortBy(weight);

    return {
      conversations,
    };
  },
  {
    showCreateNew,
    showThread,
  }
)(Conversations);
