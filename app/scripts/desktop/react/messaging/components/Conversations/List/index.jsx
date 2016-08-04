import React, { PropTypes } from 'react';
import Scroller from '../../../../components/common/Scroller';
import Empty from './Empty';
import Item from './Item';

function ConversationList(props) {
  const {
    conversations,
    showThread,
  } = props;

  return (
    <div className="messages__body">
      <Scroller>
        <div className="messages__dialogs">
          {conversations.isEmpty()
            ? <Empty />
            : conversations.map((conversation) => (
                <Item
                  conversation={conversation}
                  key={conversation.get('id')}
                  showThread={showThread.bind(null, conversation.get('id'))}
                />
            )).valueSeq()
          }
        </div>
      </Scroller>
    </div>
  );
}

ConversationList.propTypes = {
  conversations: PropTypes.object.isRequired,
  showThread: PropTypes.func.isRequired,
};

export default ConversationList;
