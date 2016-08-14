import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ThreadForm from './ThreadForm';
import SelectForm from './SelectForm';
import MessageList from './MessageList';
import moment from 'moment';
import {
  PRIVATE_CONVERSATION,
  PUBLIC_CONVERSATION,
  GROUP_CONVERSATION,
} from '../../constants';
import {
  startSelect,
} from '../../actions/ThreadActions';
import {
  loadMessages,
  loadArchivedMessages,
} from '../../actions/ConversationActions';
import { connect } from 'react-redux';
import { Map, Set, fromJS } from 'immutable';

export const defaultUser = fromJS({
  slug: '...',
  tlogUrl: '#',
  userpic: {
    kind: 'user',
    symbol: '',
    defaultColors: {
      background: '#42d792',
      name: '#fff',
    },
  },
});
const emptyUser = Map();
const emptyEntry = Map();

function Thread(props) {
  const {
    bgImage,
    canTalk,
    conversation,
    isSelectState,
    loadArchivedMessages,
    loadMessages,
    messages,
    selectedUuids,
    startSelect,
  } = props;
  const conversationType = conversation.get('type');
  const threadStyles = bgImage ?
    { backgroundImage: `url(${bgImage})` } :
    {};

  function renderForm() {
    if (isSelectState) {
      return (
        <SelectForm
          conversation={conversation}
          messages={messages}
        />
      );
    } else if (canTalk) {
      return <ThreadForm conversation={conversation} />;
    } else {
      return null;
    }
  }

  const containerClasses = classNames({
    'messages__section': true,
    'messages__section--thread': true,
    'messages__section--select': isSelectState,
    '--private': conversationType === PRIVATE_CONVERSATION,
    '--no-form': !canTalk,
  });
  const listClasses = classNames({
    'messages__body': true,
    'message--select-mode': isSelectState,
  });

  return (
    <div className={containerClasses}>
      <div className={listClasses} style={threadStyles}>
        <div className="messages__thread-overlay" />
        <MessageList
          conversation={conversation}
          isSelectState={isSelectState}
          loadArchivedMessages={loadArchivedMessages}
          loadMessages={loadMessages}
          messages={messages}
          selectedUuids={selectedUuids}
          startSelect={startSelect}
        />
      </div>
      <footer className="messages__footer">
        {renderForm()}
      </footer>
    </div>
  );
}

Thread.propTypes = {
  bgImage: PropTypes.string,
  canTalk: PropTypes.bool.isRequired,
  conversation: PropTypes.object.isRequired,
  isSelectState: PropTypes.bool.isRequired,
  loadArchivedMessages: PropTypes.func.isRequired,
  loadMessages: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
  selectedUuids: PropTypes.object.isRequired,
  startSelect: PropTypes.func.isRequired,
};

export default connect(
  (state, { conversation }) => {
    const conversationType = conversation.get('type');
    const conversationId = conversation.get('id');
    const isSelectState = state.msg.thread.get('isSelectState', false);
    const selectedUuids = state.msg.thread.get('selectedUuids', Set());
    const canTalk = conversation.get('canTalk', true); // true if not set
    const messages = state
      .entities
      .get('message', Map())
      .filter((m) => m.get('conversationId') === conversationId)
      .sortBy((m) => {
        const createdAt = m.get('createdAt');
        const submitNr = m.get('submitNr');

        return createdAt ?
          moment(createdAt).valueOf() :
          2e12 + submitNr;
      });

    let bgImage;

    if (conversationType === PRIVATE_CONVERSATION) {
      const recipient = state
        .entities
        .getIn(['tlog', String(conversation.get('recipient'))], emptyUser);

      bgImage = recipient.getIn(['design', 'backgroundId']) &&
        recipient.getIn(['design', 'backgroundImageUrl']);
    } else if (conversationType === PUBLIC_CONVERSATION) {
      const entry = state
        .entities
        .getIn(['conversationEntry', String(conversation.get('entry'))], emptyEntry);
      const entryAuthor = state
        .entities
        .getIn(['tlog', String(entry.get('author'))], emptyUser);

      bgImage = entryAuthor.getIn(['design', 'backgroundId']) &&
        entryAuthor.getIn(['design', 'backgroundImageUrl']);
    } else if (conversationType === GROUP_CONVERSATION) {
      bgImage = conversation.getIn(['backgroundImage', 'url']);
    } else {
      bgImage = null;
    }

    return {
      bgImage,
      canTalk,
      conversation,
      isSelectState,
      messages,
      selectedUuids,
    };
  },
  {
    startSelect,
    loadArchivedMessages,
    loadMessages,
  }
)(Thread);
