import React, { PropTypes } from 'react';
import ConversationListItem from './ConversationListItem';
import ConversationListEmpty from './ConversationListEmpty';

function ConversationList({ items, onItemClick }) {
  return items.length === 0
    ? <ConversationListEmpty />
    : (
        <div className="messages__scroll">
          <div className="messages__dialogs">
            {items.map((item) => (
               <ConversationListItem
                 item={item}
                 key={item.id}
                 onClick={onItemClick}
               />))
            }
          </div>
        </div>
    );
}

ConversationList.displayName = 'ConversationList';

ConversationList.propTypes = {
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default ConversationList;
