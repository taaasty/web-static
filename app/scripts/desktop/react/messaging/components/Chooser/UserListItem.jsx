import React, { PropTypes } from 'react';
import classNames from 'classnames';
import UserAvatar from '../../../components/UserAvatar';
import UserSlug from '../../../components/UserSlug';
import { CONVERSATION_PIC_SIZE } from '../Conversations/List/Item';

function UserListItem({ onClick, selected, user }) {
  const jsUser = user.toJS();
  const containerClasses = classNames({
    'message--container': true,
    'message--selected': selected,
  });

  return (
    <div className={containerClasses} onClick={onClick}>
      <span className="message__selector">
        {selected && <i className="icon icon--tick" />}
      </span>
      <div className="messages__dialog">
        <span className="messages__user-avatar">
          <UserAvatar size={CONVERSATION_PIC_SIZE} user={jsUser} />
        </span>
        <div className="messages__dialog-text">
          <div className="messages__user-name">
            <UserSlug user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

UserListItem.displayName = 'UserListItem';

UserListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default UserListItem;
